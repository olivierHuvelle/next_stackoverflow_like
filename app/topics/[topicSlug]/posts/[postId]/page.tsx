import Link from "next/link";
import PostSingle from "@/app/components/page-related/home/topics/posts/post-single/post-single";
import CommentCreateForm from "@/app/components/page-related/comment/comment-create-form";
import CommentList from "@/app/components/page-related/comment/comment-list";
import {getCommentsByPostId} from "@/actions/comment";
import paths from "@/utils/paths";

interface PostSinglePageProps {
    params: {
        topicSlug: string
        postId: string
    }
}

export default function PostSinglePage({params}: PostSinglePageProps){
    const {topicSlug, postId} = params

    return (
        <div className="space-y-3">
            <Link href={paths.topicSingle(topicSlug)}>{"< "}Back to {topicSlug}</Link>
            <PostSingle postId={postId} />
            <CommentCreateForm postId={postId} startOpen={true} />
            <CommentList fetchData={() => getCommentsByPostId(postId)}  />
        </div>
    )
}