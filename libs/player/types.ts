import { AudioTrack } from "@/types"

export type AudioState = {
  duration: number
  playing: boolean
  volume: number
}


// TODO
// might have to change this for now source of truth is going come from drizzle introspection on my db

// export type Track = {
//   id: number
//   url: string
//   title: string
//   artist: Artist | null
// }

export type State = AudioState & {
  tracks: AudioTrack[]
  currentTrack: AudioTrack | null
  currentTrackIndex: number | null
}

export type Artist = {
  id: string
  name: string
  imageUrl: string
  tracks: AudioTrack[]
}
