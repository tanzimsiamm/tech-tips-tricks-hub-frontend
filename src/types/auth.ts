// frontend/src/types/auth.ts
import { IUserFrontend } from './user'; // Import the frontend user type

// Frontend payload for login
export interface ILoginPayloadFrontend {
  email: string;
  password: string;
}

// Frontend payload for registration
export interface IRegisterPayloadFrontend {
  name: string;
  email: string;
  password: string;
  image?: string;
  role?: 'user' | 'admin';
}

// Backend's IAuthResponse data structure
export interface IAuthResponseData {
  token: string;
  user: IUserFrontend;
}