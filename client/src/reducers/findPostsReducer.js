const defaultStore = {
    searchString: "",
}



export const findPostsReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case "CHANGE_FILTER_POSTS":
            return {
                searchString: action.payload,
            };
        default:
            return state;
    }
};