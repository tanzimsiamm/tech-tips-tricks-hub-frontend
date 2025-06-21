// frontend/src/types/api.ts
export interface IBackendResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T; // The actual data payload
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
  errorMessages: { path: string; message: string }[];
  stack?: string;
}