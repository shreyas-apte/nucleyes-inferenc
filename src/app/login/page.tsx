"use client";

import React, { Fragment, useCallback } from "react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import Input from "@components/Input";
import { Button } from "@nextui-org/react";
import FormControl from "@/app/components/form-control";

const loginSchema = z.object({
  email: z.string().email("The email you entered appears invalid."),
  password: z.string().min(5, "Password must be at least 5 characters."),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  return (
    <div className="grid grid-cols-10 min-h-screen gap-8 p-8">
      <div className="flex flex-col col-span-10 md:col-span-4 lg:col-span-3 bg-gradient-to-br from-text/[0.03] to-text/[0.01] rounded-2xl backdrop-blur-xl justify-center items-center gap-6">
        <FormHeader />
        <div className="px-4 -mt-4 mb-4 h-px w-full">
          <span className="w-full bg-text inline-block bg-opacity-10 h-px" />
        </div>
        <LoginForm />
        <Disclaimers />
      </div>
      <div className="relative hidden md:flex md:col-span-6 lg:col-span-7 flex-col justify-center items-center">
        <span className="absolute w-px bg-text bg-opacity-10 left-0 -top-8 h-screen" />
        <Info />
      </div>
    </div>
  );
};

const LoginForm = () => {
  const fields = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit } = fields;

  const {
    formState: { isValid, isDirty },
  } = fields;

  const handleLogin: SubmitHandler<LoginForm> = useCallback(
    async ({ email, password }) => {
      try {
        console.log("email: ", email);
        console.log("password: ", password);
        const response = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (response?.ok === false) {
          console.log("error: ", response.error);
          console.log("status: ", response.status);
        }
      } catch (error) {
        console.error("Failed to sign in", error);
      }
    },
    []
  );

  return (
    <FormProvider {...fields}>
      <div className="w-full flex flex-col gap-4 px-16">
        <FormControl<LoginForm> name="email">
          <Input<LoginForm>
            autoFocus
            label="Email"
            name="email"
            type="text"
            placeholder="dumbledore@hogwarts.club"
            className="w-full"
            variant="bordered"
          />
        </FormControl>
        <FormControl<LoginForm> name="password">
          <Input<LoginForm>
            name="password"
            type="text"
            label="Password"
            placeholder="Password"
            className="w-full"
            variant="bordered"
          />
        </FormControl>
        <Button
          onClick={handleSubmit(handleLogin)}
          disabled={!isValid || !isDirty}
          className="w-full disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          Sign
        </Button>
        <small className="text-center mt-2">
          Not a member?{" "}
          <a
            href=""
            className="underline"
            onClick={() => {
              signIn("cognito", { intent: "signup" });
            }}
          >
            Sign up
          </a>
        </small>
        <div className="flex justify-center items-center my-4">
          <hr className="h-px flex-1 bg-text/20 border-text/20" />
          <span className="mx-4 text-text/70">or</span>
          <hr className="h-px flex-1 bg-text/20 border-text/20" />
        </div>
        <button
          className="w-full flex items-center justify-center text-sm font-medium px-2 py-3 gap-2 border border-slate-200 rounded-lg text-slate-700 hover:border-slate-300 hover:shadow transition duration-150"
          onClick={() => signIn("cognito")}
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          Sign in with Google
        </button>
      </div>
    </FormProvider>
  );
};

const FormHeader = () => {
  return (
    <Fragment>
      <img src="/logo.jpeg" alt="logo" className="w-16 rounded-md" />
      <h2 className="text-center text-2xl leading-snug">
        Sign in to <br /> <span className="text-4xl font-bold">Inferenc</span>
      </h2>
    </Fragment>
  );
};

const Disclaimers = () => {
  return (
    <div className="w-full flex text-sm justify-center items-center gap-2 text-text/50 px-16">
      <a className="hover:underline" href="#">
        Terms
      </a>
      <span>•</span>
      <a className="hover:underline" href="#">
        Privacy
      </a>
    </div>
  );
};

const Info = () => {
  return (
    <div className="flex flex-col gap-2 items-center text-center max-w-xs justify-center">
      {/* <img
        src="/assets/chat-bot-alt.png"
        alt="intro"
        className="w-80 h-auto animate-fadeIn"
      /> */}
      <h6 className="font-medium">Welcome</h6>
      <p className="text-text/50 text-sm">
        Inferenc is a platform that allows you to build and deploy AI based chat
        bots and support sdks.
      </p>
    </div>
  );
};

export default Login;
