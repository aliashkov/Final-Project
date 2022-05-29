const defaultStore = {
    isAllPosts: false,
    amountAddedPosts: 0,
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
        case "ADDED_POST":
            return { ...state, amountAddedPosts: state.amountAddedPosts + 1 }
        default:
            return state;
    }
};