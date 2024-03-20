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
): Promise <CreatePostFormState> {

    const schema = z.object({
        title: z
            .string()
            .min(3, {message: 'title should contain at least 3 characters'}),
        content: z
            .string()
            .min(1, {message: 'content should contain at least 10 characters'})
    })

    const session = await auth()
    if(!session || !session.user){
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

    if(!topic){
        return {
            errors: {
                _form: [`Cannot find topic with slug ${slug}`]
            }
        }
    }

    let post: Post
    try{
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id
            }
        })
    }catch (err: unknown){
        if(err instanceof Error){
            return {
                errors: {
                    _form: [err.message]
                }
            }
        }
        else {
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