// frontend/src/app/(auth)/register/page.tsx
"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import registerValidationSchema from "@/src/schemas/register.schema";
import { useUserRegistration } from "@/src/hooks/auth.hook"; // Adjusted path
import FXInput from "@/src/components/form/FXInput";
import FXForm from "@/src/components/form/FXForm";
import { useUser } from "@/src/context/user.provider";
import Loading from "@/src/components/ui/Loading";
import { IRegisterPayloadFrontend } from "@/src/types/auth";

const RegisterPage = () => {
  const router = useRouter();
  const { setIsLoading: userLoadingContext } = useUser();

  const { mutate: handleUserRegistration, isPending, isSuccess, error } = useUserRegistration();

  const onSubmit: SubmitHandler<IRegisterPayloadFrontend> = (data) => {
    handleUserRegistration(data);
    userLoadingContext(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      toast.success("User registration successful.");
      router.push("/"); // Or /dashboard, as per your flow after successful registration
    }
    if (error) {
      userLoadingContext(false);
    }
  }, [isPending, isSuccess, error, router, userLoadingContext]);

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold text-gray-800">Register with Tech Hub</h3>
        <p className="mb-4 text-gray-600">Join us! Let&lsquo;s Get Started</p>
        <div className="w-[90%] sm:w-[350px] p-6 bg-white shadow-md rounded-lg">
          <FXForm
            resolver={zodResolver(registerValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <FXInput label="Name" name="name" type="text" />
            </div>
            <div className="py-3">
              <FXInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <FXInput label="Password" name="password" type="password" />
            </div>
            <div className="py-3">
              <FXInput label="Profile Image URL (Optional)" name="image" type="url" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-blue-600 font-semibold text-white hover:bg-blue-700"
              size="lg"
              type="submit"
            >
              Register
            </Button>
          </FXForm>
          <div className="text-center text-gray-600">
            Already have an account ? <Link href={"/login"} className="text-blue-600 hover:underline">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;