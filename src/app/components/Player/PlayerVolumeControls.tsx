import player from '@libs/player/player'
import { usePlayerState } from '@libs/player/hooks'
import Slider from './Slider'
import VolumeIcon from '../Icons/VolumeIcon'


const PlayerVolumeControls = () => {
  const state = usePlayerState()
  // rightmost element in the footer console is the volume slider 
  return (
    <div className="flex-row hidden gap-4 justify-end items-center p-4 h-4 ml-12 mr-7 md:flex">
      <VolumeIcon />
      <div className="w-24 flex items-center justify-center">
        <Slider
          min={0}
          max={1}
          value={state.volume}
          handleChange={(value: any) => player.volume(value[0])}
        />
      </div>
    </div>
  )
}

export default PlayerVolumeControls
