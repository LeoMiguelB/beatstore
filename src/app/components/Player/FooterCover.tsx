import { usePlayerState } from "@libs/player/hooks";
import Image from "next/image";

const FooterCover = () => {
  const state = usePlayerState();
  return (
    <div className="flex w-full items-center justify-start pl-10 py-4">
      <div className="flex">
        <Image
          // default to the public img
          src={state.currentTrack?.imgLink}
          alt="track cover"
          className="w-20 h-20 rounded-xl object-cover"
          width={200}
          height={200}
        />

        <div className="flex flex-col items-start justify-center pl-4">
          <span className="text-lg">
            {state.currentTrack?.title}
          </span>
          <span className="text-xs">
          {state.currentTrack?.producer}
          </span>
        </div>
      </div>
    </div>
  )
}


export default FooterCover;