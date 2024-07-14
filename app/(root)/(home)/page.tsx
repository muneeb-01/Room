"use client";
import React, { useEffect, useState } from "react";
import MeetingType from "@/components/MeetingType";

const Home = () => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateDateAndTime = () => {
      const now = new Date();
      const pakTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(pakTime);

      const pakDate = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        dateStyle: "full",
      }).format(now);
      setDate(pakDate);
    };
    updateDateAndTime();

    const timeVal = setInterval(updateDateAndTime, 1000);

    return () => clearInterval(timeVal);
  }, []);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full  flex-col justify-between max-md:px-5 max-md:py-8 md:p-11">
          <h2 className="glasmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at : 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl lg:text-7xl font-extrabold">{time}</h1>
            <p className="text-lg font-medium lg:text-2xl text-sky-1">{date}</p>
          </div>
        </div>
      </div>
      <MeetingType />
    </section>
  );
};

export default Home;
