import {redirect} from "next/navigation";

export async function searchRedirection(formData: FormData){
    const term = formData.get('term')

    if(typeof term !== 'string' || term.trim().length === 0){
        redirect('/')
    }

    redirect(`/search?term=${term}`)
}