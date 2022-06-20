export const LoginStartUser = (userCredentials) => ({
    type: "LOGIN_START_USER",
  });
  
  export const LoginSuccessUser = (user) => ({
    type: "LOGIN_SUCCESS_USER",
    payload: user,
  });
  
  export const LoginFailureUser = () => ({
    type: "LOGIN_FAILURE_USER",
  });

  export const FollowUser = (userId) => ({
    type: "FOLLOW_USER",
    payload: userId,
  });
  
  export const UnfollowUser = (userId) => ({
    type: "UNFOLLOW_USER",
    payload: userId,
  });


  export const RemoveFriend = (userId) => ({
    type: "REMOVE_FRIEND",
    payload: userId,
  });
  
  export const AddFriend = (userId) => ({
    type: "ADD_FRIEND",
    payload: userId,
  });

  export const RefreshFriends = (friends) => ({
    type: "REFRESH_FRIENDS",
    payload: friends,
  });

  export const RefreshFollowings = (followings) => ({
    type: "REFRESH_FOLLOWINGS",
    payload: followings,
  });

  
  export const RefreshFollowers = (followers) => ({
    type: "REFRESH_FOLLOWERS",
    payload: followers,
  });