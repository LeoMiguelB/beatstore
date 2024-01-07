'use server'

import { audioTb } from "../../drizzle/schema";

import { db } from "@/db/db";

import { desc, gt } from "drizzle-orm";

import { Dropbox } from "dropbox";

import fetch from "node-fetch";

import { getAccessToken } from "./auth";

// TODO
// implement caching, this is critical and without it, refetching dropbox source links is going to be expensive since they would have to download it again 
export const getAudioTracks = async () => {
  const audioTracks = await db
  .select()
  .from(audioTb)
  .limit(4)
  .execute();
  return audioTracks;
}


export const getAudioTracksPaginated = async (lastSeenKey: number) => {
  const audioTracks = await db
  .select()
  .from(audioTb)
  .where(gt(audioTb.id, lastSeenKey))
  .limit(4)
  .execute()
  return audioTracks;
}


//  this is for communicating with the dropbox and upserting track records
// for now it's very janky and used for testing purposes
export const createTrackRecord = async (
  prevState: any,
  formData: FormData
) => {
  
  console.log(formData);

  const res = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.DROPBOX_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      path: '',
    })
  })

  await getAccessToken();

  const data = await res.json();
  console.log(data);

}

