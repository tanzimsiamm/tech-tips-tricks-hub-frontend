// frontend/src/context/user.provider.tsx
'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { getCurrentUser, logout as serverLogout } from "../services/AuthService";
import { queryClient } from "../lib/queryClient";
import { IUserFrontend } from "../types/user";

interface IUserProviderValues {
  user: IUserFrontend | null;
  isLoading: boolean;
  setUser: (user: IUserFrontend | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<IUserFrontend | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser: IUserFrontend = JSON.parse(storedUser);
        setUser(parsedUser);
      } else {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setUser(null);
        }
      }
    } catch (error: any) {
      console.error("Failed to get current user:", error);
      toast.error("Failed to load user session.");
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleUser();
  }, [handleUser]);

  const logout = useCallback(async () => {
    try {
      await serverLogout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      toast.success("Logged out successfully!");
      queryClient.invalidateQueries();
      router.push('/login');
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  }, [router]);


  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;