'use client'

import {useFormState} from "react-dom";
import {Input, Button, Textarea, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import FormButton from "@/app/components/ui/form-button";
import {createPost} from "@/actions/post";


interface PostCreateFormProps {
    slug: string
}
export default function PostCreateForm({slug}: PostCreateFormProps) {
    const [formState, action] = useFormState(createPost.bind(null, slug), {errors: {}})
    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">
                    Create a post
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a post</h3>
                        <Input
                            name="title"
                            label="Title"
                            labelPlacement="outside"
                            placeholder="Your title"
                            isInvalid={!!formState.errors.title}
                            errorMessage={formState.errors.title?.join(', ')}
                        />
                        <Textarea
                            name="content"
                            label="Content"
                            labelPlacement="outside"
                            placeholder="Your content"
                            isInvalid={!!formState.errors.content}
                            errorMessage={formState.errors.content?.join(', ')}
                        />
                        {formState.errors._form && <div className="p-2 bg-red-200 border border-red-400 rounded">{formState.errors._form.join(', ')}</div> }
                        <FormButton>Create</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}