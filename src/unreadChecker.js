export const unreadChecker = (user) => {
  if (user.unread) {
    return " unread";
  } else {
    return "";
  }
};
