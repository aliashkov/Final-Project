const defaultStore = {
   user: JSON.parse(localStorage.getItem("user")) || null,
}


export const userReducer = (state = defaultStore, action) => {
    switch (action.type) {
      case "LOGIN_START_USER":
        return {
          user: null,
        };
      case "LOGIN_SUCCESS_USER":
        return {
          user: action.payload,
        };
      case "LOGIN_FAILURE_USER":
        return {
          user: null,
        };
      case "FOLLOW_USER":
        return {
          
          ...state,
          user: {
            ...state.user,
            followings: [...state.user.followings, action.payload],
          },
          
        };
      case "UNFOLLOW_USER":
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
  