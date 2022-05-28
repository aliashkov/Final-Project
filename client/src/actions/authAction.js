export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = () => ({
  type: "LOGIN_SUCCESS",
});

export const LoginFailure = (err) => ({
  type: "LOGIN_FAILURE",
  payload: err,
});



