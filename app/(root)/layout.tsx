import React, { ReactNode } from "react";
import StreamProvider from "@/Providers/StreamClientProvider";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <StreamProvider>{children}</StreamProvider>
    </div>
  );
};

export default RootLayout;
