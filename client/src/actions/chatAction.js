export const AddUserToChat = (userId) => ({
  type: "ADD_MEMBER_TO_CHAT",
  payload: userId,
});

export const removeUserFromChat = () => ({
  type: "REMOVE_MEMBER_FROM_CHAT",
});