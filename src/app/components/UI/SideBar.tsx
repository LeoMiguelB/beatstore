"use client"
import { Separator } from "@radix-ui/react-separator";
import MiniAudioCard from "./MiniAudioCard";
import MiniEmailCard from "./MiniEmailCard";

const SideBar = () => {

  return (
    <div className="flex flex-col pl-4 w-1/3">
      <div className="flex flex-row w-full">
        <Separator className="opacity-10 shrink-0 bg-border w-[1px] h-full" />
        <div className="pl-4 w-full">
          <div>
            <div className="flex flex-row justify-between w-full">
              <h1 className="py-4 text-xl">Monthly Packs</h1>
              <h1 className="py-4 text-sm">view all</h1>
            </div>
            {
              Array(5).fill(<MiniAudioCard />)
            }
          </div>
          <Separator className="opacity-10 shrink-0 bg-border h-[1px] w-full" />
          <div>
            <div className="flex flex-row justify-between w-full">
              <h1 className="py-4 text-xl">Loop Emails</h1>
              <h1 className="py-4 text-sm">view all</h1>
            </div>
            {
              Array(5).fill(<MiniEmailCard />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}


export default SideBar;