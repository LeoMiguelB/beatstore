'use server'

import { audioTb } from "../../drizzle/schema";

import { db } from "@/db/db";

import { desc, gt } from "drizzle-orm";

import { Dropbox } from "dropbox";

import { getAccessToken } from "./auth";

import * as fs from 'fs';
import * as path from 'path';

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

    // the files that will be used and stored inside the cloud storage
    const fileTypes = [
      {
        type: "track",
        field: "src_link"
      },
      {
        type: "img",
        field: "src_link"
      }
    ];

    // upload both track and img from the form
    // then after get sharable link
    // process this link such that it's a direct link
    // then update the db accordingly
    const folderName = path.join(process.env.ROOT_FOLDER_PATH, formData.get('track')?.name);
    
    
    fileTypes.forEach(async (file) => {
      const currFile: any = formData.get(file.type);
      await uploadFile(currFile, folderName, file.field);
    })
    
}

const uploadFile = async (file: File, filePath: string, field: string) => {
  try {
    
    const accessToken = await getAccessToken();

    const dbx = new Dropbox({accessToken, fetch});


    const fileBuffer = await file.arrayBuffer();
    
    const fileUpload = await dbx.filesUpload({path: filePath, contents: file});

  } catch (error) {
    console.log("upload file error: " + error);
  }
}
