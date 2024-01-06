import React from "react";
import { Button } from "../ShadCn/Button";
import { useEffect, useState } from "react";
import player from "@libs/player/player";
import { usePlayerState } from "@libs/player/hooks";
import { getAudioTracksPaginated } from "@/_actions/audio";
import { AudioTrack } from "@/types";


interface LoadMoreProps {
  audioTrackList: AudioTrack[]
  setAudioTrackList: React.Dispatch<React.SetStateAction<AudioTrack[]>>
}


const LoadMore: React.FC<LoadMoreProps> = (props) => {

  const { setAudioTrackList, audioTrackList, ...rest } = props;

  const handlePagination = async () => {
    // in order not mutate and avoid unexpected behaviour let's clone the state and take the last element
    const lastAudioTrack = audioTrackList.slice(-1).pop().id;
    const audioTracksFetch: AudioTrack[] = await getAudioTracksPaginated(lastAudioTrack);
    
    console.log(audioTracksFetch);

    // check if fetched list is empty, if so no more records
    if(audioTracksFetch.length == 0) {
      console.log("last item reached")
    }
    
    // update the player state with the new array of tracks
    setAudioTrackList((prevList: AudioTrack[]) => {
      console.log(prevList, audioTracksFetch + " inside setAudioTrack");
      return [...prevList, ...audioTracksFetch]
    });
  }


  return (
    <>
      <div className="flex justify-center items-center py-8">
        <Button className="rounded-full text-sm" onClick={handlePagination}>Load More</Button>
      </div>
    </>
  )

}

export default LoadMore;