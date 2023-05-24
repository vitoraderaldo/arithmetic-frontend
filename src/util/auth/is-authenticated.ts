export const isAuthenticated = (): boolean => {
  const localStorage = window.localStorage;
  const authentication = localStorage.getItem('authentication');
  return !!authentication;
}
