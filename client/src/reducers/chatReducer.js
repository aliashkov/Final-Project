const defaultStore = {
    member: null
}


export const chatReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case "ADD_MEMBER_TO_CHAT":
            return {
                member: action.payload,
            };
        default:
            return state;
    }
};
