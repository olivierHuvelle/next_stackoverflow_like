const paths = {
    home(){
        return '/'
    },
    topicSingle(topicSlug: string){
        return `/topics/${topicSlug}`
    },
    postCreate(topicSlug: string){
        return `/topics/${topicSlug}/posts/new`
    },
    postSingle(topicSlug: string, postId: string){
        return `/topics/${topicSlug}/posts/${postId}`
    }
}

export default paths