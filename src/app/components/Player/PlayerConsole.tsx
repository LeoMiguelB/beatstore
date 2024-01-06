"use client"
import React from "react";
import ControlsPlayerFooter from "./PlayerControls";
import * as Progress from "@radix-ui/react-progress";
import { usePlayerState, useCurrentTime } from "../../../../libs/player/hooks";
import PlayerVolumeControls from "./PlayerVolumeControls";
import FooterCover from "./FooterCover";

const PlayerConsole = () => {
  const state = usePlayerState();
  const { currentTrack } = state;
  const currentTime = useCurrentTime();
  const progress = currentTime / state.duration;

  if(!currentTrack) {
    return null;
  }

  return (
    <div className= "bg-foreground fixed left-0 right-0 bottom-0 w-full border-t-2 border-secondary-foreground">
      <div className="md:grid md:items-center md:grid-cols-4">
        <FooterCover />
        
        <div className="hidden col-span-2 md:block">
          <ControlsPlayerFooter />
        </div>

        {/* // put volume controls here */}
        <PlayerVolumeControls />

        {/* This will be the progress bar for mobile screens */}
        <Progress.Root value={progress} max={1} className="overflow-hidden h-0.5 block md:hidden">
          <Progress.Indicator
            className="bg-slate-100 h-full"
            style={{ width: `${progress * 100}%` }}
          />
        </Progress.Root>      
      </div>
    </div>
  )

}

export default PlayerConsole;