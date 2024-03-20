import type {CommentWithAuthor} from "@/actions/comment";
import CommentSingle from "@/app/components/page-related/comment/comment-single";

interface CommonListProps {
    fetchData: () => Promise<CommentWithAuthor[]>
}

export default async function CommentList({fetchData}: CommonListProps){
    const comments = await fetchData()

    const topLevelComments = comments.filter(
        (comment) => comment.parentId === null
    );
    const renderedComments = topLevelComments.map((comment) => {
        return (
            <CommentSingle
                key={comment.id}
                commentId={comment.id}
                comments={comments}
            />
        );
    });

    return (
        <div className="space-y-3">
            <h1 className="text-lg font-bold">All {comments.length} comments</h1>
            {renderedComments}
        </div>
    );
}