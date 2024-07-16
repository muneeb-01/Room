//@ts-nocheck

"use client";
import React, { useEffect, useState } from "react";
import { useGetCall } from "@/Hooks/useGetCall";
import { useRouter } from "next/navigation";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { CloudFog } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { title } from "process";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recorded" }) => {
  const { upcomingCalls, endedCalls, isLoading, callRecordings } = useGetCall();
  const [recordings, setCallRecordings] = useState<CallRecording[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;

      case "upcoming":
        return upcomingCalls;

      case "recorded":
        return recordings;

      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No previous calls";

      case "upcoming":
        return "No upcoming calls";

      case "recorded":
        return "No Recordings";

      default:
        return "";
    }
  };

  useEffect(() => {
    try {
      const fetchRecordings = async () => {
        const callData = await Promise.all(
          callRecordings.map((meeting) => {
            return meeting.queryRecordings();
          })
        );

        const recordingData = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setCallRecordings(recordingData);
      };
      if (type === "recorded") fetchRecordings();
    } catch (error) {
      toast({ title: "Try again later..." });
    }
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCalls = getNoCallsMessage();

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2 xl:md:grid-cols-2 2xl:grid-cols-3 ">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call)?.id || meeting.url}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 25) ||
              meeting?.filename?.substring(0, 20) ||
              "No description"
            }
            date={
              meeting.state?.startsAt.toLocaleString() ||
              (meeting as CallRecording).start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recorded" ? "/icons/play.svg" : undefined}
            buttonText={type === "recorded" ? "Play" : "Start"}
            handleClick={
              type === "recorded"
                ? () => {
                    router.push(`${meeting.url}`);
                  }
                : () => {
                    router.push(`/meeting/${meeting.id}`);
                  }
            }
            link={
              type === "recorded"
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
            }
          />
        ))
      ) : (
        <h1>{noCalls}</h1>
      )}
    </div>
  );
};

export default CallList;
