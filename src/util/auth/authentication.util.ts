import { ApiErrorInterface } from "../../api/api.error.interface";

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

export const deleteAuthentication = (): void => {
  localStorage.removeItem('authentication');
}

export const logoutUser = (): void => {
  deleteAuthentication();
  window.location.href = '/login';
}

export const onAuthenticationError = (error: ApiErrorInterface) => {
  if (error.statusCode === 403) {
    logoutUser()
  }
}
