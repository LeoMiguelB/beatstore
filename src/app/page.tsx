import { AudioTrack } from '@/types';
import Layout from '@/app/components/Layout';
import { getAudioTracks } from '@/_actions/audio';
import Feed from './components/UI/Feed';
import SideBar from './components/UI/SideBar';
import player from '@libs/player/player';

export default async function Home() {
  const audioTracks: AudioTrack[] | null = await getAudioTracks();
  console.log(audioTracks);
  
  return (
    <div>
      <Layout>
        <div className="flex justify-center w-full py-20">
          <div className="flex flex-row w-2/3">
            <Feed audioTracks={audioTracks}/>
            <SideBar />
          </div>
        </div>
      </Layout>
    </div>
  )
}
