import Image from 'next/image';
import React,{useEffect,useState} from 'react';

import { useRouter } from 'next/router';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';

const RightbarItems = ({spotifyApi,track}) => {

  const router = useRouter();
  
  const duration = track && track.duration ? moment.utc(track.duration).format('mm:ss') : '00:00';

// choose track & get track id.....
  const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState);
 

  const playSong = () => {
    try{
    spotifyApi.getMyDevices().then(res=>{
      const deviceId = res.body.devices[0]?.id;
      setCurrentTrackId(track.id);
      spotifyApi.play({
        device_id: deviceId,
        uris: [track.uri],
      },(err,res)=>{
        if(err) return alert(err,'Please try again')
        setIsPlaying(true);
      })
    },err=>{alert(err,'Please try again');})
    }catch(err){console.log(err);alert(err,'Please try again')}
    
  }
 

  return (
    
    <div className='w-[56vw] md:w-[35vw] lg:w-[20vw] md:px-2 lg:px-1 px-1 py-0 opacity-75 hover:opacity-100'>
      <div className='flex flex-row items-center justify-start py-0.5 rounded-md -z-10 hover:bg-neutral-800 hover:border-r hover:border-l'>
          <div className='w-[20%] flex items-center'><Image className='rounded-xl' src={track && track.image ? track.image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={60} height={40} objectFit="contain" /></div>
          <div className='flex flex-col ml-0 w-[80%]'>
            {<p onClick={playSong} className='hover:underline hover:text-white cursor-pointer  text-[16px] font-medium tracking-wider line-clamp-1 md:text-[15px] lg:text-[14px] text-slate-200'>{track && track.name ? track.name : undefined}</p>}
            <div className='flex flex-row '>
              <p onClick={() => router.push({pathname:'/artistdetails',query:{id: track.artistId}})} className='text-[10px] cursor-pointer font-thin w-[75%] md:text-[12px] lg:text-[9px] text-neutral-400 hover:underline hover:text-white'>{track && track.artist ? track.artist : undefined }</p>
              <span className='text-[11px] tracking-wider md:text-[12px] lg:text-[10px] text-neutral-400'> {track && duration ? duration : undefined}</span>
            </div>
          </div>
      </div>
    </div>

  )
}

export default RightbarItems