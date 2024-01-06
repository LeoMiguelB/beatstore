import { createPubSub } from "../pubsub";
import { createAudio } from "./audio";
import { State } from "./types";
import { AudioTrack } from "@/types";


const createPlayer = () => {
  const pubsub = createPubSub();
  const audio = createAudio();

  // spread the fields for the audio state in here and add additional ones too
  let state: State = {
    ...audio.getState(),
    tracks: [],
    currentTrackIndex: null,
    currentTrack: null
  }

  const setState = (value: Partial<State>) => {
    state = { ...state, ...value };

    pubsub.publish('change', state);
  }

  // now add the above function to the list of listeners for the topic 'change'
  // implementation is within audio
  audio.subscribe(setState);

  const changeTrack = () => {
    const track: AudioTrack | null = state.currentTrack;


    if(track && track.srcLink) {
      console.log(track.srcLink);
      audio.setUrl(track.srcLink);
      audio.play();
    }
  };

  const next = () => {
    if (state.currentTrackIndex === null) {
      return;
    }

    const lastIndex = state.tracks.length - 1;
    const newIndex = state.currentTrackIndex + 1;

    // we can only go to next if newIndex is less than the last index
    // otherwise theres nothing to play next
    if(newIndex <= lastIndex) {
      setState(
        {
          currentTrackIndex: newIndex,
          currentTrack: state.tracks[newIndex]
        }
      );

      changeTrack();
    };
  };

  audio.onEnded(next);

  return {
    play: audio.play,
    pause: audio.pause,
    seek: audio.seek,
    volume: audio.volume,
    getCurrentTime: audio.getCurrentTime,
    getElement: audio.getElement,
    onChangeCurrentTime: audio.onChangeCurrentTime,
    setInitialState: audio.setInitialState,

    getState() {
      return state;
    },

    setQueue(tracks: AudioTrack[]) {
      setState({ tracks });
      console.log(tracks.length + " inside of player inside the setQueue function")
    },

    enqueue(addTracks: AudioTrack[]) {
      const tracks = this.getState().tracks;
      setState({ tracks: [...tracks, ...addTracks]});
    },

    //TODO
    // state is undefined here must be something with re-rendering that is not updating ti
    playTrack(trackIndex: number) {
      console.log(state)
      setState({
        currentTrackIndex: trackIndex,
        currentTrack: state.tracks[trackIndex],
      });

      console.log(trackIndex);
      changeTrack();
    },

    next,

    prev() {
      if (state.currentTrackIndex === null) {
        return;
      }

      const newIndex = state.currentTrackIndex - 1;

      if (newIndex >= 0) {
        setState({
          currentTrack: state.tracks[newIndex],
          currentTrackIndex: newIndex,
        });

        changeTrack();
      }
    },

    subscribe(listener: (newState: State) => void) {
      return pubsub.subscribe('change', listener);
    },
  };
};

const player = createPlayer();

export default player;
