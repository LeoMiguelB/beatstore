"use client"
import { AudioTrack } from "@/types";
import React, { useEffect, useState } from "react";
import player from "@libs/player/player";
import AudioCard from "./AudioCard";
import { Separator } from "@radix-ui/react-separator";
import { usePlayerState } from "@libs/player/hooks";
import LoadMore from "./LoadMore";

interface FeedProps {
  audioTracks: AudioTrack[]
}

const Feed: React.FC<FeedProps> = (props) => {
  const { audioTracks, ...rest } = props;

  const playerState = usePlayerState();
  
  const { tracks } = playerState;

  const [audioTrackList, setAudioTrackList] = useState(audioTracks);


  // we need to re-render this component on initial render because we are adding to the queue,
  // we want this to reflect on the playerState which will trigger again on the re-render
  // we are passing the audioTrackList setter inside the loadmore Button
  // this will effectively re-render this page and relfect the addition of new data
  useEffect(() => {
    player.setQueue(audioTrackList);
    console.log(audioTrackList);
  }, [audioTrackList]);

  return (
    <div className="w-2/3 flex flex-col">
      <h1 className="text-4xl py-4">Feed</h1>
      <Separator className="opacity-10 shrink-0 bg-border h-[1px] w-full"/>

        {/* must move this page into standalone page in the future */}
        <div className="w-full flex flex-col">
          {
            tracks ?
              tracks.map((track: any, index: number) =>
                <AudioCard
                  key={index}
                  index={index}
                  id={track.id}
                  songKey={track.songKey}
                  producer={track.producer}
                  bpm={track.bpm}
                  srcLink={track.srcLink}
                  createdAt={track.createdAt}
                  title={track.title}
                  imgLink={track.imgLink}
                />
              ) : null
          }

      </div>

      <LoadMore audioTrackList={audioTrackList} setAudioTrackList={setAudioTrackList}/>
    </div>
  )
}

export default Feed;