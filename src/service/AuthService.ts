// frontend/src/services/AuthService.ts
'use server';

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { IBackendResponse } from "@/src/types/api";
import axiosInstance from "../lib/AxiosInstance";
import { IAuthResponseData } from "../types/auth";
import { IUserFrontend } from "../types/user";

interface CustomJwtPayload extends JwtPayload {
  _id: string;
  email?: string;
  role?: 'user' | 'admin';
  name?: string;
  image?: string;
}

export const registerUser = async (userData: FieldValues): Promise<IBackendResponse<IAuthResponseData>> => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data.success && data.data?.token) {
      (await cookies()).set("token", data.data.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
    }

    return data;
  } catch (error: any) {
    console.error("Server Action: Registration failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Registration failed!");
  }
};

export const loginUser = async (userData: FieldValues): Promise<IBackendResponse<IAuthResponseData>> => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success && data.data?.token) {
      (await cookies()).set("token", data.data.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
    }

    return data;
  } catch (error: any) {
    console.error("Server Action: Login failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed! Check credentials.");
  }
};

export const logout = async () => {
  (await cookies()).delete("token");
};

export const getCurrentUser = async (): Promise<IUserFrontend | null> => {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);

    if (!decodedToken._id) {
      console.warn("JWT payload missing user ID.");
      return null;
    }

    const userIdentifier = decodedToken.email || decodedToken._id; 
    if (!userIdentifier) {
        console.warn("Cannot identify user from JWT to fetch profile.");
        return null;
    }

    // Fetch user profile from backend using client-side API instance (as it includes token in headers)
    // This is a common pattern to get full user details when JWT only has ID.
    // It's client-side `api` not `axiosInstance` that carries the token in header via interceptor on client.
    // Server actions must explicitly pass the token.
    const { data } = await axiosInstance.get(`/users/${userIdentifier}`, {
      headers: {
        Authorization: `Bearer ${token}` // Manually pass token for this server-side Axios call
      }
    });

    if (data.success && data.data) {
        const backendUser = data.data as IUserFrontend;
        return {
            _id: backendUser._id,
            name: backendUser.name,
            email: backendUser.email,
            role: backendUser.role,
            image: backendUser.image,
            coverImg: backendUser.coverImg,
            memberShip: backendUser.memberShip ? {
                ...backendUser.memberShip,
                takenDate: backendUser.memberShip.takenDate,
                exp: backendUser.memberShip.exp,
            } : null,
            followers: backendUser.followers,
            following: backendUser.following,
            isBlocked: backendUser.isBlocked,
            createdAt: backendUser.createdAt,
            updatedAt: backendUser.updatedAt,
        };
    }

    return null;
  } catch (error: any) {
    console.error("Server Action: Failed to get current user:", error.message);
    (await cookies()).delete("token");
    return null;
  }
};

export const getNewAccessToken = async (): Promise<IBackendResponse<IAuthResponseData>> => {
  throw new Error("Refresh token functionality not yet implemented on backend.");
};