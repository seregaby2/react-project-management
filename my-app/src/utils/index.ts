export const getTokenFromLS = () => {
  const token = localStorage.getItem('token') || '';
  return token;
};
