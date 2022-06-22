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
    case "ADD_FRIEND":
      return {
        ...state,
        user: {
          ...state.user,
          followers: state.user.followers.filter(
            (following) => following !== action.payload
          ),
          friends: [...state.user.friends, action.payload],
        },
      };
    case "REMOVE_FRIEND":
      return {
        ...state,
        user: {
          ...state.user,
          followers: [...state.user.followers, action.payload],
          friends: state.user.friends.filter(
            (friend) => friend !== action.payload
          ),
        },
      };
    case "REFRESH_FRIENDS":
      return {
        ...state,
        user: {
          ...state.user,
          friends: action.payload,
        },
      };
    case "REFRESH_FOLLOWERS":
      return {
        ...state,
        user: {
          ...state.user,
          followers: action.payload,
        },
      };
    case "REFRESH_FOLLOWINGS":
      return {
        ...state,
        user: {
          ...state.user,
          followings: action.payload,
        },
      };


    default:
      return state;
  }
};
