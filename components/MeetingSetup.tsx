"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupCompleted,
}: {
  setIsSetupCompleted: (value: boolean) => void;
}) => {
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
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggleOn}
            onChange={(e) => {
              setisMicCamToggleOn(e.target.checked);
            }}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        onClick={() => {
          call?.join();
          setIsSetupCompleted(true);
        }}
        className="rounded-md bg-green-500 px-4 py-2.5"
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
