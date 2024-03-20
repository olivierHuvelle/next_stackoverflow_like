import {Divider} from "@nextui-org/react";
import TopicCreateForm from "@/app/components/page-related/home/topics/create-form/topic-create-form";
import TopicList from "@/app/components/page-related/home/topics/topic-list/topic-list";
import PostList from "@/app/components/page-related/home/topics/posts/post-list/post-list";
import {getTopPosts} from "@/actions/post";

export default async function Home() {


    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <main className="col-span-3">
                <h1 className="text-xl m-2">Topics</h1>
                <PostList fetchData={getTopPosts} />
            </main>
            <div className="border shadow py-3 px-2">
                <TopicCreateForm />
                <Divider className="my-2" />
                <section>
                    <h3 className="text-lg"></h3>
                    <TopicList />
                </section>

            </div>
        </div>
    )
}
