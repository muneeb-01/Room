"use client";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { error } from "console";
import { ReactNode, useEffect, useState } from "react";
import { tokenProvider } from "@/actions/streamaction";
import Loader from "@/components/Loader";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream Api key missing");

    const newuser = {
      id: user?.id,
      name: user?.username || user.id,
      image: user?.imageUrl,
    };

    const client = new StreamVideoClient({
      apiKey,
      user: newuser,
      tokenProvider,
    });

    setVideoClient(client);

    return () => {};
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamProvider;
