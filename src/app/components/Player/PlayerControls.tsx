"use client"
import { usePlayerState, useCurrentTime } from "../../../../libs/player/hooks";
import player from "../../../../libs/player/player";
import Slider from "./Slider";
import PrevIcon from "../Icons/PrevIcon";
import NextIcon from "../Icons/NextIcon";
import PauseIcon from "../Icons/PauseIcon";
import PlayIcon from "../Icons/PlayIcon";
import { formatTime } from "./utils";

const PlayerControls = () => {
  const state = usePlayerState();
  const { playing } = state;
  const currentTime = useCurrentTime();

  const handlePlayer = () => {
    if (playing) {
      player.pause();
    } else {
      player.play();
    }
  }

  const progress = currentTime / state.duration;

  // these are simply the pause, and play and also the progress bar
  return (
    <div className="w-full col-span-2 flex flex-row items-center justify-center gap-8">
      <div className="flex flex-row gap-2 items-center">
        <div onClick={() => player.prev()}>
          <PrevIcon />
        </div>
        <div className="bg-foreground border-primary-foreground border-2 p-3 flex flex-row items-center justify-center gap-2 rounded-full text-sm" onClick={handlePlayer}>
          {playing ? <PauseIcon /> : <PlayIcon height={24} width={24}/>}
        </div>
        <div onClick={() => player.next()}>
          <NextIcon />
        </div>
      </div>
      <div className="w-full flex flex-row gap-4">
        <span className="text-xs">
          {formatTime(currentTime)}
        </span>
        <Slider
          min={0}
          max={1}
          value={progress}
          handleChange={(value) => player.seek(state.duration * (value[0] as number))}
        />
        <span className="text-xs">{formatTime(state.duration)}</span>
      </div>
    </div>
  )
}

export default PlayerControls;