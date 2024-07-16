import React, { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModel from "@/components/MeetingModel";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

const MeetingType = () => {
  const router = useRouter();
  const [meeting, setMeeting] = useState<
    "isScheduledMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const [values, setvalues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({
          title: "Please select dat and time",
        });
        return;
      }

      const callId = crypto.randomUUID();
      const call = client.call("default", callId);
      if (!call) throw new Error("Failed to crete call");

      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${callId}`);
      }

      toast({
        title: "Meeting Created!!!",
      });
    } catch (error) {
      toast({
        title: "Somthing went wrong",
      });
      console.log(error);
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        color="bg-orange-1"
        handleClick={() => setMeeting("isInstantMeeting")}
      />
      <HomeCard
        img="/icons/Schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeeting("isScheduledMeeting")}
        color="bg-blue-1"
      />
      <HomeCard
        img="/icons/add-meeting.svg"
        title="View Recordings"
        description="Checkout Your Recordings"
        handleClick={() => router.push("/recordings")}
        color="bg-purple-1"
      />
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeeting("isJoiningMeeting")}
        color="bg-yellow-1"
      />

      {!callDetails ? (
        <MeetingModel
          isOpen={meeting === "isScheduledMeeting"}
          onClose={() => setMeeting(undefined)}
          title="Create Meeting"
          handleClick={() => createMeeting()}
          image=""
        />
      ) : (
        <MeetingModel
          isOpen={meeting === "isScheduledMeeting"}
          onClose={() => setMeeting(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            // navigator.clipboard.writeText(MeetingLink);
            // toast({ title: "Link Copied" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}
    </section>
  );
};

export default MeetingType;
