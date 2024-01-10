'use server'

import { audioTb } from "../../drizzle/schema";

import { db } from "@/db/db";

import { desc, gt } from "drizzle-orm";

import { Dropbox } from "dropbox";

import { getAccessToken } from "./auth";

import * as fs from 'fs';

import fetch from "node-fetch";


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
  
    console.log(formData.get('track'));

    
    const accessToken = await getAccessToken();

    // upload both track and img from the form
    // then after get sharable link
    // process this link such that it's a direct link
    // then update the db accordingly
    const folderName = formData.get('track')?.name;
    
    [{file: formData.get('track'), type: "src_link"}, {file: formData.get('img'), type: "img_link"}].forEach(async (item) => {
      const filePath: string = await uploadFileDropbox(folderName, item.file, accessToken);

      console.log(filePath);

      const dlUrl = filePath.replace(/^(https:\/\/)www\./, '$1dl.');
    })

}

// TODO
// should refactor this section, these are just to abstract the process 
const uploadFileDropbox = async (folder: any, file: any, accessToken: any) => {

  const fileBuffer = await readFileAsync(file);

  const res = await fetch("https://content.dropboxapi.com/2/files/upload", 
  {
    cache: 'no-store',
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Dropbox-API-Arg": {
        "autorename": false,
        "mode": "add",
        "path":`${process.env.ROOT_FOLDER_PATH}/${folder}/${file.name}`
      },
      "Content-Type": "application/octet-stream"
    },
    body: fileBuffer
  });

  //  should get the path display in order to retrieve the sharable link
  const data = await res.json();

  const pathDisplay = data.path_display;

  return pathDisplay;

}

const getSharableLink = async (filePath: any, accessToken: any) => {
  // default to public view 
  const res = await fetch("https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings", 
  {
    cache: 'no-store',
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: {
      "path": filePath
    }
  });

  console.log(res);
}

// Helper function to read file content asynchronously
const readFileAsync = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file content."));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};