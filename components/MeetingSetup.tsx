"use client";
import { useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const MeetingSetup = () => {
  const [isMicCamToggleOn, setisMicCamToggleOn] = useState(false);

  const call = useCall();

  useEffect(() => {
    return () => {
      if (isMicCamToggleOn) {
        call?.microphone.disable();
        call?.camera.disable();
      } else {
        call?.microphone.enable();
        call?.camera.enable();
      }
    };
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);

  return (
    <div className="flex justify-center items-center h-screen w-full flex-col gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
    </div>
  );
};

export default MeetingSetup;
