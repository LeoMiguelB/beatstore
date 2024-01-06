"use client"

import { useFormState, useFormStatus } from "react-dom"

import { Button } from "../components/ShadCn/Button";
import { createTrackRecord } from "@/_actions/audio";

const initialState = {
  track: null,
  img: null,
  producer: "",
  key: "",
  bpm: 0,
  description: "",
}


const page = () => {


  // TODO
  // go through docs to figure out how to type this correctly in acordance with typescript
  const [state, formAction] = useFormState<any>(createTrackRecord, initialState);

  const { pending } = useFormStatus();

  const testForm = (formData: any) =>  {
    console.log(formData.get('producer'));
  }

  return (
    <>
      <form action={formAction} className="w-full flex flex-col gap-4 justify-center items-center py-40">

        {/* the below dropbox was created by this person
        https://codepen.io/daddasoft/pen/wvdOvaX
        */}
        <div className="bg-white p-3 rounded-xl w-80">
          <div className="border-2 rounded-md p-8 border-dotted w-full h-full flex flex-col items-center">
            <p className="font-medium mb-1">Upload</p>
            <label htmlFor="track">Choose Track:</label>
            <input type="file" id="track" name="track" required accept="audio/mp3, audio/wav" className="bg-primary text-white font-medium text-sm py-2.5  px-6 rounded-3xl flex items-center gap-2 hover:bg-blue-700" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl w-80">
          <div className="border-2 rounded-md p-8 border-dotted w-full h-full flex flex-col items-center">
            <p className="font-medium mb-1">Upload</p>
            <label htmlFor="img">Choose Img:</label>
            <input type="file" id="img" name="img" required accept="image/png, image/jpeg, image/jpg" className="bg-primary text-white font-medium text-sm py-2.5  px-6 rounded-3xl flex items-center gap-2 hover:bg-blue-700" />
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl w-80">
          <div className="border-2 rounded-md p-8 border-dotted w-full h-full flex flex-col items-center">
            <p className="font-medium mb-1">Upload</p>
            <label htmlFor="img">Choose Waveform:</label>
            <input type="file" id="img" name="img" required accept="image/png, image/jpeg, image/jpg" className="bg-primary text-white font-medium text-sm py-2.5  px-6 rounded-3xl flex items-center gap-2 hover:bg-blue-700" />
          </div>
        </div>


        {/* below made by 
        https://codepen.io/abukswienty/pen/GRQbvvP
          */}
        <div className="group relative w-72 md:w-80 lg:w-96">
          <label htmlFor="producer" className="block w-full pb-1 text-sm font-medium text-black transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Producer</label>
          <input id="producer" name="producer" type="text" required className="peer h-10 w-full rounded-md px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white ring-2 ring-blue-400 text-black" />
        </div>

        <div className="group relative w-72 md:w-80 lg:w-96">
          <label htmlFor="key" className="block w-full pb-1 text-sm font-medium text-black transition-all duration-200 ease-in-out group-focus-within:text-blue-400">key</label>
          <input id="key" name="key" type="text" required className="peer h-10 w-full rounded-md px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white ring-2 ring-blue-400 text-black" />
        </div>

        <div className="group relative w-72 md:w-80 lg:w-96">
          <label htmlFor="bpm" className="block w-full pb-1 text-sm font-medium text-black transition-all duration-200 ease-in-out group-focus-within:text-blue-400">bpm</label>
          <input id="bpm" name="bpm" type="text" required className="peer h-10 w-full rounded-md px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white ring-2 ring-blue-400 text-black" />
        </div>


        {/* below made by
          https://codepen.io/koca/pen/RMeZBe
        */}

        <div className="p-8 bg-grey-lightest font-sans">
          <div className="row sm:flex">
            <div className="">
              <div className="box border-2 border-black rounded flex flex-col shadow bg-white">
                <label htmlFor="label" className="box__title bg-grey px-3 py-2 border-b border-black text-sm text-grey-darker font-medium">Description</label>
              
                <textarea id="label" name="label" placeholder="write description..." className="text-grey-darkest bg-transparent border-2" required />
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" className="rounded-full text-xl" aria-disabled={pending}>Submit</Button>

      </form>
    </>
  )
}

export default page;