import Image from 'next/image';
import React,{useEffect} from 'react';
import {MdFavorite} from 'react-icons/md';
import {IoMdDownload,IoMdHeartDislike} from 'react-icons/io';
import {MdPauseCircleFilled,MdPlayCircleFilled} from 'react-icons/md';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState,} from '../atoms/songAtom';
import { isLikeSongState, likeSongIdState } from '../atoms/likeAtom';
import { useSession } from 'next-auth/react';


export default function Songs({track,albumaDetails,index,spotifyApi}) {

  const router = useRouter();
  const albumImage = router.pathname === '/search' ? true : false;
  const {data: session} = useSession()
  const accessToken = session?.accessToken
  const duration = track && track.duration ? moment.utc(track.duration).format('mm:ss') : '00:00';
  
// choose track & get track id.....
  const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState);
  const [likeSongId,setLikeSongId] = useRecoilState(likeSongIdState);
  const [isLikeSong,setIsLikeSong] = useRecoilState(isLikeSongState);


  useEffect(()=>{
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  },[accessToken,spotifyApi])
  

  const handleLike = () => {
    let currentLikedBands = likeSongId;
    if (!isLikeSong) {
      setIsLikeSong(true);
      if (!currentLikedBands.includes(track.id))
        setLikeSongId(
          [...currentLikedBands, track.id]
        );
    } else {
      setIsLikeSong(false);
      if (currentLikedBands.includes(track.id))
      setLikeSongId(
          currentLikedBands
          .filter(track => track !== track.id)
      );
    }
  };


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

  const pauseSong = () => {
      try{
      spotifyApi.getMyDevices().then(res=>{
        const deviceId = res.body.devices[0]?.id;
        setCurrentTrackId(track.id)
        spotifyApi.pause({
          device_id: deviceId,
        },(err,res)=>{
          if(err) return alert(err,'Please try again')
          setIsPlaying(false);
        })
      },err=>{alert(err,'Please try again');})
      }catch(err){console.log(err);alert(err,'Please try again')}
    }


// downloading.......
 

  const downloadSong = async () => {
    const url = `https://api.spotify.com/v1/track/${track?.id}/download`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    const blob = await response.blob();
    const urls = window.URL.createObjectURL(blob,{type:blob.headers});
    const link = document.createElement("a");
    link.href = urls;
    link.setAttribute("download", `${track?.name}.mp3`);
    link.download = `${track?.name}.mp3`;
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }
  
//download.............
  return (
    <div className='flex flex-col lg:w-[71vw] xl:w-[72vw] w-[99.5vw] overflow-y-scroll opacity-75 hover:opacity-100 '>
      <div className={albumImage?`flex flex-row items-center justify-between pr-2 py-1 rounded-md hover:bg-neutral-800 hover:border-r hover:border-l pl-0`:`flex flex-row items-center justify-between py-1 rounded-md hover:bg-neutral-800 hover:border-r hover:border-l px-2`}>
        <div className='flex flex-row items-center'>
          {albumImage && <Image className='rounded-2xl' src={track && track.image ? track.image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={70} height={40} objectFit="contain" />}
          <div className={albumImage?` flex flex-col md:-mt-1 w-[250px] sm:w-[500px] -ml-1`: `flex flex-col md:-mt-1 ml-0 w-[250px] sm:w-[500px] px-2`}>
            <p onClick={() => router.push({pathname:'/albumdetails',query:{id: track.albumId || albumaDetails.id}})} className='text-sm font-medium tracking-wider text-white cursor-pointer line-clamp-1 md:text-xl lg:text-lg xl:text-2xl hover:underline'>{track && track.name ? track.name : undefined}</p>
            <div className='flex flex-row space-x-1.5 '>
                <p onClick={() => router.push({pathname:'/artistdetails',query:{id: track.artistIds[0]}})} className='hover:underline text-[13px] line-clamp-1 lg:-mt-1 xl:-mt-2 font-thin tracking-wide md:text-sm xl:text-lg text-neutral-300 hover:text-white cursor-pointer'>{track && track.artist ? track.artist[0] : undefined }{track && track.artist && track.artist[1]?',':''}</p>
                <p onClick={() => router.push({pathname:'/artistdetails',query:{id: track.artistIds[1]}})} className='hover:underline text-[13px] line-clamp-1 lg:-mt-1 xl:-mt-2 font-thin tracking-wide md:text-sm xl:text-lg text-neutral-300 hover:text-white cursor-pointer'>{track && track.artist ? track.artist[1] : undefined}{track && track.artist && track.artist[2]?',':''}</p>
                <p onClick={() => router.push({pathname:'/artistdetails',query:{id: track.artistIds[2]}})} className='hover:underline text-[13px] line-clamp-1 lg:-mt-1 xl:-mt-2 font-thin tracking-wide md:text-sm xl:text-lg text-neutral-300 hover:text-white cursor-pointer'>{track && track.artist ? track.artist[2] : undefined}{track && track.artist && track.artist[3]?',':''}</p>
                <p onClick={() => router.push({pathname:'/artistdetails',query:{id: track.artistIds[3]}})} className='hover:underline text-[13px] line-clamp-1 lg:-mt-1 xl:-mt-2 font-thin tracking-wide md:text-sm xl:text-lg text-neutral-300 hover:text-white cursor-pointer'>{track && track.artist ? track.artist[3] : undefined}{track && track.artist && track.artist[4]?',':''}</p>
                <p onClick={() => router.push({pathname:'/artistdetails',query:{id: track.artistIds[4]}})} className='hover:underline text-[13px] line-clamp-1 lg:-mt-1 xl:-mt-2 font-thin tracking-wide md:text-sm xl:text-lg text-neutral-300 hover:text-white cursor-pointer'>{track && track.artist ? track.artist[4] : undefined}</p>
            </div>
          </div>
        </div>
          <div className='flex flex-row items-center space-x-2 md:space-x-3 text-slate-400'>
          <span className='text-neutral-400 font-thin tracking-wider text-[12px] md:text-sm pr-4'> {track && duration ? duration : undefined}</span>
          <div className='flex flex-row items-center'>
            <div className='pl-[8px] py-0 pr-[22px] -mr-1 border-[1.5px] border-r-neutral-900 rounded-full cursor-pointer  border-zinc-600 items-center' >
              { likeSongId===track.id && isLikeSong? <i onClick={handleLike}><IoMdHeartDislike size={15} className='mt-0.5 text-red-700'/></i>:<i onClick={handleLike}><MdFavorite size={15} className='mt-0.5 hover:text-white'/></i>}
            </div>
            {isPlaying  && currentTrackId === track.id ? <i className='cursor-pointer p-1 ml-[-20px] hover:text-white' onClick={pauseSong}><MdPauseCircleFilled size={35} className='mt-0.5 text-white'/></i> : <i className='cursor-pointer p-1 ml-[-20px] hover:text-white' onClick={playSong}><MdPlayCircleFilled size={35} className='mt-0.5'/></i>}
            {/* <i onClick={playSong} className='cursor-pointer p-1 ml-[-20px] hover:text-white'><BsPlayCircleFill size={30} /></i> */}
          </div>
          <div className='cursor-pointer hover:text-white'><i onClick={downloadSong}><IoMdDownload size={25} /></i></div> 
        </div>
      </div>
    </div>
  );
}
