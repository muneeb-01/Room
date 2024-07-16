import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCall = () => {
  const [allCalls, setAllCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    const LoadCalls = async () => {
      if (!client || !user?.id) return;
      setIsLoading(true);

      try {
        const { calls } = await client.queryCalls();
        setAllCalls(calls);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    LoadCalls();
  }, [client, user?.id]);

  const now = new Date();

  const endedCalls = allCalls.filter(
    ({ state: { startsAt, endedAt } }: Call) =>
      !!endedAt || (startsAt && new Date(startsAt) < now)
  );

  const upcomingCalls = allCalls.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  return {
    upcomingCalls,
    endedCalls,
    isLoading,
    callRecordings: allCalls,
  };
};
