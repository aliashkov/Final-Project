const defaultStore = {
    user: null
}



export const friendsReducer = (state = defaultStore, action) => {
    console.log(state)
    switch (action.type) {
        case "iNITIAL_USER":
            return {
                user: action.payload,
            };
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],
                },
            };
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(
                        (following) => following !== action.payload
                    ),
                },
            };
        default:
            return state;
    }
};
