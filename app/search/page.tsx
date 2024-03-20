import {redirect} from "next/navigation";
import PostList from "@/app/components/page-related/home/topics/posts/post-list/post-list";
import {getPostsBySearchTerm} from "@/actions/post";

interface SearchPageProps {
    searchParams: {
        term: string
    }
}

export default async function SearchPage({searchParams}: SearchPageProps){
    const {term} = searchParams

    if(!term){
        redirect('/')
    }

    return (
        <div>
            <PostList fetchData={() => getPostsBySearchTerm(term)} />
        </div>
    )
}