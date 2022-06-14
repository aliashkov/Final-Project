const defaultStore = {
    member: null
}


export const chatReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case "ADD_MEMBER_TO_CHAT":
            return {
                member: action.payload,
            };

        case "REMOVE_MEMBER_FROM_CHAT":
            return {
                member: null,
            };

        default:
            return state;
    }
};
