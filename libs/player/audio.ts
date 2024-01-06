import { createPubSub } from "../pubsub";
import { AudioState } from "./types";


export const createAudio = () => {
  const pubsub = createPubSub();

  let element: HTMLAudioElement;

  let currentTime = 0;

  let state: AudioState = {
    duration: 0,
    playing: false,
    volume: 0
  }

  const setState = (value: Partial<AudioState>) => {
    // key idea here is that spread the old values that are not changed and only update the fields 'value'
    state = { ...state, ...value };

    // now let all the subscribers of topic 'change' know that there was a change in state
    pubsub.publish('change', state);
  }


  const setup = () => { 
    // update state and so pass in the partial that involves the duration
    element.addEventListener('durationchange', () => setState({ duration: element.duration }));

    element.addEventListener('playing', () => setState({ playing: true }));

    element.addEventListener('pause', () => setState({ playing: false }));

    // let's match the current time user is going to 
    element.addEventListener('timeupdate', () => {
      const newCurrentTime = Math.round(element.currentTime);

      // if they landed at the same spot before the slide we don't have to do anything...
      if(currentTime !== newCurrentTime) {
        // update the state for this instance
        currentTime = newCurrentTime;

        // notify all subscribers to change-current-time that the state has been changed
        pubsub.publish('change-current-time', currentTime);
      }
    })
    
    element.addEventListener('volumechange', () => setState({ volume: element.volume }));
    
    // this is just for the initial setup 
    setState({ volume: element.volume });

  }

  return {
    seek(seconds: number) {
      element.currentTime = seconds
      currentTime = seconds

      pubsub.publish('change-current-time', currentTime)
    },

    getElement() {
      return element
    },

    getState() {
      return state
    },
    setInitialState(e: HTMLAudioElement) {
      element = e
      setup()
    },
    getCurrentTime() {
      return currentTime
    },

    play() {
      element.play()
    },

    pause() {
      element.pause()
    },

    volume(value: number) {
      element.volume = value
    },

    setUrl(url: string) {
      element.setAttribute('src', url)
      setState({ playing: false })
    },

    subscribe(listener: (newState: AudioState) => void) {
      return pubsub.subscribe('change', listener)
    },

    onChangeCurrentTime(listener: (newCurrentTime: number) => void) {
      return pubsub.subscribe('change-current-time', listener)
    },

    onEnded(listener: () => void) {
      if (element) {
        element.addEventListener('ended', listener)
      }

      return () => element.removeEventListener('ended', listener)
    },
  }

}