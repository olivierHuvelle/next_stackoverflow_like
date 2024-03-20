'use server'

import type {Comment} from "@prisma/client";
import {z} from "zod"
import {auth} from "@/auth/auth";
import {db} from "@/db";
import paths from "@/utils/paths";
import {revalidatePath} from "next/cache";

interface CreateCommentFormState {
    errors: {
        content?: string[]
        _form?: string[]
    }
}

export async function createComment(
    {postId, parentId}: { postId: string; parentId?: string },
    formState: CreateCommentFormState,
    formData: FormData
): Promise<CreateCommentFormState> {
    const schema = z.object({
        content: z.string().min(3, {message: 'comment should content at least 3 characters'})
    })

    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ["You must sign in to do this."],
            },
        }
    }

    const result = schema.safeParse({
        content: formData.get('content'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    try {
        await db.comment.create({
            data: {
                content: result.data.content,
                postId: postId,
                parentId: parentId,
                userId: session.user.id,
            }
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message],
                },
            }
        } else {
            return {
                errors: {
                    _form: ["Something went wrong..."],
                },
            }
        }
    }

    const topic = await db.topic.findFirst({
        where: {posts: {some: {id: postId}}},
    })

    if(!topic){
        return {
            errors: {
                _form: ['Failed to revalidate the topic']
            }
        }
    }

    revalidatePath(paths.postSingle(topic.slug, postId))

    return {
        errors: {}
    }
}

export type CommentWithAuthor = Comment & {
    user: {
        name: string|null
        image: string | null
    }
}

export async function getCommentsByPostId(postId: string): Promise <CommentWithAuthor[]>{
    return db.comment.findMany({
        where: {postId},
        include: {
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    })
}