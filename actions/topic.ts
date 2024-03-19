'use server'

import type {Topic} from "@prisma/client";
import {z} from "zod";
import {auth} from "@/auth/auth";
import {redirect} from "next/navigation";
import {db} from "@/db";
import paths from "@/utils/paths";
import {revalidatePath} from "next/cache";

interface CreateTopicFormState {
    errors: {
        name?: string[]
        description?: string[]
        _form?: string[]
    }
}

export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
    // revalidate homepage
    const schema = z.object({
        name: z
            .string()
            .min(3, {message: 'Must contain at least 3 characters'})
            .regex(/^[a-z-]+$/, {message: 'Must be lowercase letter or dashes without spaces'}),
        description: z
            .string()
            .min(10, {message: 'Must contain at least 10 characters'})
    })

    const session = await auth()
    if(!session || !session.user){
        return {
            errors: {
                _form: ['You must be signed in to post a topic']
            }
        }
    }

    const result = schema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let topic: Topic
    try{
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
            }
        })
    }catch (err: unknown){
        if (err instanceof Error){
            return {
               errors: {
                   _form: [err.message]
               }
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong']
                }
            }
        }
    }

    revalidatePath(paths.home())
    redirect(paths.topicSingle(topic.slug))
}