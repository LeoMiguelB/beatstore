import Image from "next/image";
import { Folder } from "lucide-react";
const MiniAudioCard = () => {
  return (
    <div className="flex justify-between items-center w-full py-2">
      <div className="flex w-2/3">
        <Image 
        width={20}
        height={20}
        src="https://source.unsplash.com/a-table-with-a-lamp-and-a-plate-on-it-iLGoyLa8IeI"
        className="h-12 w-12 object-cover rounded-full"
        alt="sample pack cover"
        />
        <div className="flex flex-col pl-4 pt-2">
          <h3 className="text-xs">
            June 2023
          </h3>
          <div className="flex flex-row py-2">
            <Folder size={18}/>
            <h4 className="text-[12px] pl-2">5</h4>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-secondary-foreground rounded-full w-1/4 py-2">
        <h2 className="text-[12px]">
          view more
        </h2>
      </div>
    </div>
  )
}

export default MiniAudioCard;