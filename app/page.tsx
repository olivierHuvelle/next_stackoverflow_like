import TopicCreateForm from "@/app/components/page-related/home/topics/create-form/topic-create-form";

export default async function Home() {
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <main className="col-span-3">
                <h1 className="text-xl m-2">Topics</h1>
            </main>
            <div>
                <TopicCreateForm />
            </div>
        </div>
    )
}
