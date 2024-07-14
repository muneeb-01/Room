import React from "react";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="flex justify-center items-center w-full h-screen ">
      <SignIn />
    </main>
  );
};

export default SignInPage;
