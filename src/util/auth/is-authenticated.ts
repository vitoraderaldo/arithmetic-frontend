const localStorage = window.localStorage;

export const isAuthenticated = (): boolean => {
  const authentication = localStorage.getItem('authentication');
  return !!authentication;
}

export const getAccessToken = (): string => {
  const authentication = localStorage.getItem('authentication');
  const parsedAuthentication = JSON.parse(authentication || '{}');
  return parsedAuthentication.accessToken;
}
