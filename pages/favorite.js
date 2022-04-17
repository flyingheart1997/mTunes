import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React,{useEffect, useState} from 'react'
import { useRecoilState } from 'recoil';
import { isLikeSongState, likeSongIdState } from '../atoms/likeAtom';

import Songs from '../components/Songs';


const Favorite = ({spotifyApi}) => {
    const router = useRouter();
    const {data: session} = useSession()
    const accessToken = session?.accessToken
    const [likeSongId,setLikeSongId] = useRecoilState(likeSongIdState);
    const [isLikeSong,setIsLikeSong] = useRecoilState(isLikeSongState);
    const [trackDetail,setTrackDetail] = useState([])
  
  useEffect(()=>{
    if(!accessToken && likeSongId && isLikeSong ) return
    spotifyApi.getTracks( likeSongId ).then((res)=>{
      setTrackDetail(
        res.body.tracks.map((track)=>{
          return{
            id:track.id,
            name:track.name,
            duration:track.duration_ms,
            album:track.album.name,
            artist:track.artists.map((artist)=>artist.name),
            artistId:track.artists.map((artist)=>artist.id),
            image:track.album.images[0].url,
            uri:track.uri,
            isLike:isLikeSong,
            albumId:track.album.id,
            process_ms: track.progress_ms,
          }
        })
      
      ) 
    },(error=>{console.log(error);}));
  },[accessToken,spotifyApi,likeSongId,isLikeSong])
  
  return (
    <div className='py-2 flex h-[77.5vh] flex-col lg:px-2 lg:w-[71vw] xl:w-[72vw] w-[99.5vw]  gap-10 overflow-y-scroll '>
      <div className='flex flex-col px-2 mb-3'>
        <p className='text-2xl font-extrabold tracking-wider text-white md:text-3xl'>Liked Songs</p>
        <br/>
        {trackDetail ?<div className='flex flex-col items-center justify-center space-y-1 -md:space-y-1'>
          {
            trackDetail.map((track) => (
              <div key={track.id}>
                <Songs track={track} spotifyApi={spotifyApi}/>
              </div>
            ))
          }
        </div>: undefined}
      
      </div>
    </div>
  )
}

export default Favorite
