import Link from "next/link";
import {Chip} from "@nextui-org/chip";
import {db} from "@/db";
import paths from "@/utils/paths";
import {getTopics} from "@/actions/topic";

export default async function TopicList(){
    const topics = await getTopics()

    const renderedTopics = topics.map(topic => {
        return (
            <div key={topic.id}>
                <Link href={paths.topicSingle(topic.slug)}>
                    <Chip color="warning" variant="shadow">
                        {topic.slug}
                    </Chip>
                </Link>
            </div>
        )
    })

    return (
        <div className="flex flex-row flex-wrap gap-2">{renderedTopics}</div>
    )
}