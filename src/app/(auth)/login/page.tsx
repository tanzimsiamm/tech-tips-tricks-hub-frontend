// frontend/src/app/(auth)/login/page.tsx
"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import loginValidationSchema from "@/src/schemas/login.schema";
import { useUserLogin } from "@/src/hooks/auth.hook"; // Adjusted path
import FXInput from "@/src/components/form/FXInput";
import FXForm from "@/src/components/form/FXForm";
import { useUser } from "@/src/context/user.provider";
import Loading from "@/src/components/ui/Loading";
import { IRegisterPayloadFrontend } from "@/src/types/auth";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoadingContext } = useUser();

  const redirect = searchParams.get("redirect");

  const { mutate: handleUserLogin, isPending, isSuccess, error } = useUserLogin();

  const onSubmit: SubmitHandler<IRegisterPayloadFrontend> = (data) => {
    handleUserLogin(data);
    userLoadingContext(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      toast.success("User login successful.");
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
    if (error) {
      userLoadingContext(false);
    }
  }, [isPending, isSuccess, error, redirect, router, userLoadingContext]);

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold text-gray-800">Login with Tech Hub</h3>
        <p className="mb-4 text-gray-600">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[90%] sm:w-[350px] p-6 bg-white shadow-md rounded-lg">
          <FXForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <FXInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <FXInput label="Password" name="password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-blue-600 font-semibold text-white hover:bg-blue-700"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </FXForm>
          <div className="text-center text-gray-600">
            Don&lsquo;t have account ? <Link href={"/register"} className="text-blue-600 hover:underline">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;