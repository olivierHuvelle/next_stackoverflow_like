'use server'

import type {Post} from "@prisma/client";

import {z} from "zod"
import {auth} from "@/auth/auth";
import {redirect} from "next/navigation";
import {db} from "@/db";
import paths from "@/utils/paths";
import {revalidatePath} from "next/cache";

interface CreatePostFormState {
    errors: {
        title?: string[]
        content?: string[]
        _form?: string[]
    }
}

export async function createPost(
    slug: string,
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> {

    const schema = z.object({
        title: z
            .string()
            .min(3, {message: 'title should contain at least 3 characters'}),
        content: z
            .string()
            .min(1, {message: 'content should contain at least 10 characters'})
    })

    const session = await auth()
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to post a post']
            }
        }
    }

    const result = schema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const topic = await db.topic.findFirst({
        where: {slug}
    })

    if (!topic) {
        return {
            errors: {
                _form: [`Cannot find topic with slug ${slug}`]
            }
        }
    }

    let post: Post
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id
            }
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Failed to create the post']
                }
            }
        }
    }

    revalidatePath(paths.topicSingle(slug))
    redirect(paths.postSingle(slug, post.id))
}

// manual definition 
// export type PostWithData = (
//     Post & {
//         topic: { slug: string }
//         user: { name: string | null }
//         _count: { comments: number }
//     })

export type PostWithData = Awaited<ReturnType<typeof getPostsByTopicSlug>>[number] // automatic typing generation

export async function getPostsByTopicSlug(slug: string){
    return db.post.findMany({
        where: {
            topic: {
                slug
            }
        },
        include: {
            topic: {select: {slug: true}},
            user: {select: {name: true}},
            _count: {select : {comments: true}}
        }
    })
}

export async function getPost(postId: string){
    return db.post.findFirst({
        where: {id: postId}
    })
}

export async function getTopPosts(): Promise<PostWithData[]>{
    return db.post.findMany({
        orderBy: [
            {
                comments: {
                    _count: 'desc'
                }
            }
        ],
        include: {
            topic: {select: {slug: true}},
            user: {select: {name: true, image: true}},
            _count: {select : {comments: true}}
        },
        take: 5
    })
}

export async function getPostsBySearchTerm(term: string): Promise<PostWithData[]>{
    return db.post.findMany({
        include: {
            topic: {select: {slug: true}},
            user: {select: {name: true, image: true}},
            _count: {select : {comments: true}}
        },
        where: {
            OR: [
                {title: {contains: term}},
                {content: {contains: term}}
            ]
        }
    })
}