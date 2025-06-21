// frontend/src/types/api.ts
export interface IBackendResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface IBackendErrorResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages: { path: string | number; message: string }[];
  stack?: string;
}