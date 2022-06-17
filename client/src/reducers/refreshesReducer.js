const defaultStore = {
    amountRefreshes: 0,
}


export const refreshesReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case "ADD_REFRESH":
            return { ...state, amountRefreshes: state.amountRefreshes + 1 }
        default:
            return state;
    }
};