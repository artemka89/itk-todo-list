export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  userId: number;
  username: string;
}

export interface LoginRequest {
  accessToken: string;
  refreshToken: string;
}
