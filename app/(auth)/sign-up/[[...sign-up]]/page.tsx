import React from "react";
import { SignUp } from "@clerk/nextjs";

const signUpPage = () => {
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <SignUp />
    </main>
  );
};

export default signUpPage;
