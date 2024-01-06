"use client"
import React from 'react';
import { useEffect } from 'react';
import player from '@libs/player/player';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import PlayerFooter from './Player/PlayerConsole';
import { NavBar } from './UI/NavBar';
import Footer from './UI/Footer';
export interface Layoutprops {
  className?: string
}

// const AudioSetup = dynamic(() => import('./Audio'), { ssr: false });

// function AudioSetup() {
//   useEffect(() => {
//     const element: HTMLAudioElement = document.createElement('audio');
//     element.src = "beat.wav";
//     player.setInitialState(element);
//     console.log("loaded " + element.src);
//     player.playTrack(element.src);
//   }, [])
//   return <></>
// }

const Layout: React.FC<Layoutprops> = (props) => {
  const { className, children, ...rest } = props;

  useEffect(() => {
    const element: HTMLAudioElement = document.createElement('audio');
    element.src = "beat.wav";
    player.setInitialState(element);
    // console.log("loaded " + element.src);
    // player.playTrack(element.src);
  }, []);

  return (
    <>
      <ThemeProvider>
        {/* // put the navbar here */}
        <NavBar />
        {/* need to figure out to use the dynamic function... for the below */}
        {/* <AudioSetup /> */}
        <div className="w-full mx-auto px-0">
          {children}
          <PlayerFooter />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}

export default Layout;
