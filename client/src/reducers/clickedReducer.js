const defaultStore = {
    amountClicks: 0,
    friendsClick: false,
}


export const clickedReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case "ADDED_CLICK":
            return { ...state, amountClicks: state.amountClicks + 1 }
        case "NULIFY_CLICKS":
            return { ...state, amountClicks: 0 }
        case "FRIENDS_CLICK":
            return { ...state, friendsClick: !state.friendsClick }
        default:
            return state;
    }
};