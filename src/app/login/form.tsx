"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface LoginTypes {
  email: string;
  password: string;
  terms_condition: boolean;
}

const formSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
  terms_condition: Yup.bool().required(),
});

export const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginTypes>({
    defaultValues: {
      email: "girish@gmail.com",
      password: "girish",
      terms_condition: true,
    },
    criteriaMode: "all",
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  console.log(isSubmitting)

  console.log(errors);

  const onSubmit = async (data: any, e: Event) => {
    e.preventDefault();
    console.log(data, "..>>");
    const { email, password } = data;
    signIn("credentials", {
      email,
      password,
      callbackUrl: `/`,
      redirect: false,
    })
      .then(async (res) => {
        const session = await getSession();
        console.log(session);
        if (session) {
          toast.success("User successfully loged in!");
          router.push("/");
        } else {
          toast.error("credentials are not valid!");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Nest
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <Input
                    type="text"
                    id="email"
                    placeholder="yourmail@gmail.com"
                    {...register("email")}
                  />
                  {errors.email?.type && (
                    <p role="alert" className="text-red-500 text-sm">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    {...register("password")}
                  />
                  {errors.password?.type && (
                    <p role="alert" className="text-red-500 text-sm">
                      {errors.password?.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      {...register("terms_condition")}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? "Please wait..." : "Login"}
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
