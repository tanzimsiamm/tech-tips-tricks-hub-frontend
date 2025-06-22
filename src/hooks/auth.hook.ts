// frontend/src/hook/auth.hook.ts
'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { loginUser as loginUserServer, registerUser as registerUserServer } from "../services/AuthService";
import { ILoginPayloadFrontend, IRegisterPayloadFrontend, IAuthResponseData } from "../types/auth";
import { useUser } from "../context/user.provider";

export const useUserRegistration = () => {
  const queryClient = useQueryClient();
  const { setUser, setIsLoading } = useUser();
  const router = useRouter();

  return useMutation<IAuthResponseData, Error, IRegisterPayloadFrontend>({
    mutationKey: ["userRegistration"],
    mutationFn: async (userData) => {
        const response = await registerUserServer(userData);
        if (!response.success) {
          throw new Error(response.message || "Registration failed!");
        }
        return response.data;
    },
    onSuccess: (data) => {
      toast.success("User registration successful.");
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push('/dashboard');
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Registration error:", error.message);
      toast.error(error.message || "Registration failed. Please try again.");
      setIsLoading(false);
    },
  });
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  const { setUser, setIsLoading } = useUser();
  const router = useRouter();

  return useMutation<IAuthResponseData, Error, ILoginPayloadFrontend>({
    mutationKey: ["userLogin"],
    mutationFn: async (userData) => {
        const response = await loginUserServer(userData);
        if (!response.success) {
          throw new Error(response.message || "Login failed!");
        }
        return response.data;
    },
    onSuccess: (data) => {
      toast.success("User login successful.");
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push('/dashboard');
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Login error:", error.message);
      toast.error(error.message || "Login failed. Please check your credentials.");
      setIsLoading(false);
    },
  });
};