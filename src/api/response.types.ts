export interface LoginResponse {
  accessToken: string,
  idToken: string,
  refreshToken: string,
  expirensInSeconds: number,
}
