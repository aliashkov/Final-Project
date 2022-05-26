export const LoginStartUser = (userCredentials) => ({
    type: "LOGIN_START",
  });
  
  export const LoginSuccessUser = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  
  export const LoginFailureUser = () => ({
    type: "LOGIN_FAILURE",
  });

  export const FollowUser = (userId) => ({
    type: "FOLLOW_USER",
    payload: userId,
  });
  
  export const UnfollowUser = (userId) => ({
    type: "UNFOLLOW_USER",
    payload: userId,
  });