export type Error = {
  data: {
    error: string;
  };
  status: number;
};

export interface RefreshTokensRequest {
  accessToken: string;
  refreshToken: string;
}

export function isErrorWithMessage(error: unknown): error is Error {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    'status' in error &&
    typeof (error as Error).data === 'object' &&
    'status' in (error as Error) &&
    typeof (error as Error).status === 'number'
  );
}
