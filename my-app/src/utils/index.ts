export const getTokenFromLS = () => {
  const token = localStorage.getItem('token') || '';
  return token;
};

export const getUserIdFromLS = () => {
  const dataUser = localStorage.getItem('dataUser') || '';
  if (dataUser) {
    const userId = JSON.parse(dataUser).id;
    return userId;
  }
};
