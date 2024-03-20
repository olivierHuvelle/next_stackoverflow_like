import type {CommentWithAuthor} from "@/actions/comment";
import Image from "next/image";
import CommentCreateForm from "@/app/components/page-related/comment/comment-create-form";

interface CommentSingleProps {
    commentId: string,
    comments: CommentWithAuthor[]
}

export default function CommentSingle({commentId, comments}: CommentSingleProps){
    const comment = comments.find(comment => comment.id === commentId) // TODO fix me

    if(!comment){
        return null
    }

    const commentChildren = comments.filter(comment => comment.parentId === commentId)
    const renderedCommentChildren = commentChildren.map(commentChild => {
        return (
            <CommentSingle commentId={commentChild.id} comments={comments} key={commentChild.id} />
        )
    })

    return (
        <div className="p-4 border mt-2 mb-1">
            <div className="flex gap-3">
                <Image
                    src={comment.user.image || ""}
                    alt="user image"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 space-y-3">
                    <p className="text-sm font-medium text-gray-500">
                        {comment.user.name}
                    </p>
                    <p className="text-gray-900">{comment.content}</p>

                    <CommentCreateForm postId={comment.postId} parentId={comment.id}/>
                </div>
            </div>
            <div className="pl-4">{renderedCommentChildren}</div>
        </div>
    )
}