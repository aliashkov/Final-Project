export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
  });
  
  export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
  });

  export const InitialUser = (userId) => ({
    type: "iNITIAL_USER",
    payload: userId,
  });