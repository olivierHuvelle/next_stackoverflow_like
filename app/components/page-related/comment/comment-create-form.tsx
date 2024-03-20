'use client'

import {useRef, useState, useEffect} from "react";
import {useFormState} from "react-dom";
import {Textarea, Button} from "@nextui-org/react";
import FormButton from "@/app/components/ui/form-button";
import {createComment} from "@/actions/comment";


interface CommentCreateFormProps {
    postId: string
    parentId?: string
    startOpen?: boolean
}

export default function CommentCreateForm({postId, parentId, startOpen}: CommentCreateFormProps){
    const [isOpened, setIsOpened] = useState(startOpen)
    const ref = useRef<HTMLFormElement | null>(null)
    const [formState, action] = useFormState(createComment.bind(null, { postId, parentId }), { errors: {} })

    const clickHandler = () => {
        setIsOpened(prevState => !prevState)
    }

    useEffect(() => {
        if(Object.keys(formState.errors).length === 0){
            ref.current?.reset()
            if(!startOpen){
                setIsOpened(false)
            }
        }
    }, [formState, startOpen])

    const form = (
        <form action={action} ref={ref}>
            <div className="space-y-2 px-1">
                <Textarea
                    name="content"
                    label="Reply"
                    placeholder="Enter your comment"
                    isInvalid={!!formState.errors.content}
                    errorMessage={formState.errors.content?.join(", ")}
                />

                {formState.errors._form ? (
                    <div className="p-2 bg-red-200 border rounded border-red-400">
                        {formState.errors._form?.join(", ")}
                    </div>
                ) : null}

                <FormButton>Create Comment</FormButton>
            </div>
        </form>
    )

    return (
        <div>
            <Button size="sm" variant="light" onClick={clickHandler}>Reply</Button>
            {isOpened && form}
        </div>
    )
}