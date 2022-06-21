const defaultStore = {
    isReloaded: false,
}


export const reloadReducer = (state = defaultStore, action) => {
    switch (action.type) {
        case "RELOAD_PAGE":
            return {
                isReloaded: true,
            };
        case "REMOVE_RELOAD":
            return {
                isReloaded: false,
            };

        default:
            return state;
    }
};