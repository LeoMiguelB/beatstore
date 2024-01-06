import Image from "next/image";
import { Mail } from "lucide-react";

const MiniEmailCard = () => {
  return (
    <div className="flex justify-between items-center w-full py-2">
      <div className="flex w-2/3">
        <Image 
          width={20}
          height={20}
          src="/cover.jpg"
          className="h-12 w-12 object-cover rounded-full"
          alt="profile img"
        />
        <div className="flex flex-col pl-4 pt-2">
          <h3 className="text-xs">
            someProducer@gmail.com
          </h3>
          <div className="flex flex-row py-1">
            <h4 className="text-[10px]">Miguel2Neat</h4>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center bg-secondary-foreground rounded-full w-1/4 py-2">
        <Mail size={18}/>
        <h2 className="text-[12px]">
          Send
        </h2>
      </div>
    </div>
  )
}

export default MiniEmailCard;