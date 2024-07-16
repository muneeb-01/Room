import React, { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModel from "@/components/MeetingModel";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";

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
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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
        title="Join Meeting "
        description="via invitation link"
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
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base leading-[22px]  text-sky-500 ">
              Add a Description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible:ring-0  focus-visible:ring-offset-0"
              onChange={(e) =>
                setvalues({ ...values, description: e.target.value })
              }
            ></Textarea>
          </div>
          <div className="flex flex-col w-full gap-2.5">
            <label className="text-base leading-[22px]  text-sky-500 ">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setvalues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
              className="w-full rounded bg-dark-2 p-2 focus:outline-none"
            ></ReactDatePicker>
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
          isOpen={meeting === "isScheduledMeeting"}
          onClose={() => setMeeting(undefined)}
          title="Meeting Created"
          className="text-center items-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}
      <MeetingModel
        isOpen={meeting === "isInstantMeeting"}
        onClose={() => setMeeting(undefined)}
        title="Start an Instant Meeting"
        className="text-center "
        buttonText="Start Meeting"
        handleClick={() => createMeeting()}
      />

      <MeetingModel
        isOpen={meeting === "isJoiningMeeting"}
        onClose={() => setMeeting(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="meeting link"
          className="border-none ring-0 bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            setvalues({ ...values, link: e.target.value });
          }}
        />
      </MeetingModel>
    </section>
  );
};

export default MeetingType;
