const defaultStore = {
    isAllPosts: false,
}


export const isAllPostsReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case "ALL_POSTS":
            return {
                isAllPosts: true,
            };
        case "FRIENDS_POSTS":
            return {
                isAllPosts: false,
            };
        default:
            return state;
    }
};