"use client"
import React from "react";
import { Play, Squircle } from "lucide-react";
import { AudioTrack } from "@/types";
import player from "@libs/player/player";
import { usePlayerState } from "@libs/player/hooks";
import Image from "next/image";
import { Button } from "../ShadCn/Button";
import { Separator } from "@radix-ui/react-separator";
import ArtistCard from "./ArtistCard";

/*
title: string | null;
    id: number;
    songKey: string | null;
    producer: string | null;
    bpm: number | null;
    srcLink: string | null;
    createdAt: string;
*/


interface AudioTrackProps extends AudioTrack {
  index: number
}


const AudioCard: React.FC<AudioTrackProps> = (props) => {
  const { id, songKey = "", producer = "", bpm = 0, srcLink = "", createdAt, index, title, imgLink, ...rest } = props;
  
  const handleLengthLimit = (word: string, limit: number) => {
    return  word.substring(0, limit) + (word.length > limit ? "..." : "" );
  }


  const state = usePlayerState();


  return (
    <>
      <div>
        
      </div>
      <div key={id} className="flex flex-row justify-start items-center w-full rounded-xl my-4">
        <Image
          // default to the public img
          src={imgLink ? imgLink : "/cover.jpg"}
          alt="track cover"
          className="w-48 h-48 rounded-xl object-cover"
          width={200}
          height={200}
        />
        <div className="pl-6 flex flex-col w-[27%]">
          <div className="flex flex-row justify-start items-center py-4">
            <div className="bg-secondary-foreground rounded-xl flex justify-center items-center p-2">
              {
                (state.currentTrackIndex == index && state.playing)
                  ?
                  <span className="cursor-pointer" onClick={() => player.pause()}>
                    <Squircle fill="white" strokeWidth={1} size={36} />
                  </span>
                  :
                  <span className="cursor-pointer" onClick={() => player.playTrack(index)}>
                    <Play fill="white" strokeWidth={1} size={36} />
                  </span>
              }
            </div>
            <div className="justify-start items-center pl-4">
              {/* 74 character limit */}
              <h1 className="text-2xl">{handleLengthLimit(title, 70)}</h1>
              <h3 className="text-xs">{handleLengthLimit(producer, 70)}</h3>
            </div>
          </div>
          

          <div className="flex flex-row gap-4 justify-start py-2">
            <div className="flex bg-secondary-foreground rounded-xl justify-center items-center">
              <span className="text-md py-2 px-4">
                {handleLengthLimit(songKey, 10)}
              </span>
            </div >
            <div className="flex bg-secondary-foreground rounded-xl justify-center items-center">
              <span className="text-md py-2 px-4">
                {bpm} BPM
              </span>
            </div>
          </div>

          <div className="py-4">
            <a target="_blank" href={srcLink ? srcLink : ""}>
              <Button variant="secondary" size="sm">Download</Button>
            </a>
          </div>
        </div>
        

        <div className="flex flex-row h-[80%] w-1/3">
          <Separator className="opacity-10 shrink-0 bg-border w-[1px] h-full"/>
          <div className="pl-4 flex gap-4 flex-col">
            {
              Array(3).fill(<ArtistCard />)
            }
          </div>
        </div>


      </div>
    </>



  )
}

export default AudioCard;

