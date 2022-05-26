const defaultStore = {
    isFetching: false,
    error: false
}


export const authReducer = (state = defaultStore, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        return {
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        return {
          isFetching: false,
          error: true,
        };
      default:
        return state;
    }
  };
  