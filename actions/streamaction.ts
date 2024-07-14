"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const SECRET_KEY = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not logged In");
  if (!API_KEY) throw new Error("No API_KEY");
  if (!SECRET_KEY) throw new Error("No API_SECRET");

  const client = new StreamClient(API_KEY, SECRET_KEY);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const token = client.createToken(user.id, exp);
  return token;
};
