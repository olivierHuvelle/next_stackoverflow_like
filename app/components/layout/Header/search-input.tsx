'use client'

import {Input} from "@nextui-org/react";
import {useSearchParams} from "next/navigation";
import {searchRedirection} from "@/actions/search";

export default function SearchInput(){
    const searchParams = useSearchParams()

    return (
        <form action={searchRedirection}>
            <Input
                name="term"
                defaultValue={searchParams.get('term') || ''}/>
        </form>
    )
}