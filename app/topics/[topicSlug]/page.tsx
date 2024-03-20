import PostCreateForm from "@/app/components/page-related/home/topics/posts/create-form/post-create-form";
import PostList from "@/app/components/page-related/home/topics/posts/post-list/post-list";
import {getPostsByTopicSlug} from "@/actions/post";

interface TopicSinglePageProps {
    params: {
        topicSlug: string
    }
}
export default function TopicSinglePage({params}: TopicSinglePageProps){
    const slug = params.topicSlug
    return (
        <main className="grid grid-cols-4 gap-4 p-4">
            <article className="col-span-3">
                <h1 className="text-2xl font-bold mb-2">{slug}</h1>
                <PostList fetchData={() => getPostsByTopicSlug(slug)} />
            </article>
            <div>
                <PostCreateForm slug={slug} />
            </div>
        </main>
    )
}