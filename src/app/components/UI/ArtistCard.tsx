import Image from "next/image";
import { Hash } from "lucide-react";

const ArtistCard = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      {/* <Image
        src="/cover.jpg"
        alt="artist image"
        width={200}
        height={200}
        className="object-cover h-[40px] w-[40px] rounded-full"
      /> */}

      <Hash size={25} />
      <h1 className="text-sm pl-2 opacity-20">some tag</h1>
    </div>
  )

}

export default ArtistCard;