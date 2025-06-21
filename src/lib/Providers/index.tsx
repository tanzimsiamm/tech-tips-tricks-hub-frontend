// frontend/src/lib/Provider.tsx
'use client';

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";
import { Toaster } from "sonner";
import UserProvider from "@/src/context/user.provider";
import {HeroUIProvider} from "@heroui/react";


export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <UserProvider>
      <HeroUIProvider navigate={router.push}>
        <Toaster position="bottom-right" richColors />
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </HeroUIProvider>
    </UserProvider>
  );
}