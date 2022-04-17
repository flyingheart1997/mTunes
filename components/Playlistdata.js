import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';


function Playlistdata({playlist}) {
  const router = useRouter()
  return (
      
    <div onClick={() => router.push({pathname:'/playlistdetails',query:{id: playlist.id}})} className='xl:w-[220px] w-[250px] h-[360px] lg:w-[230px] md:w-[240px] xs:w-[340px] ms:w-[250px] ms:h-[360px] overflow-y-scroll cursor-pointer rounded-lg hover:bg-neutral-800 bg-neutral-900 md:h-[345px] xs:h-[450px] lg:h-[337px] xl:h-[330px] opacity-80 hover:opacity-100'>
      <div className='flex items-center justify-center px-4 py-4'>
        <Image className='rounded-[10px] ' src={playlist && playlist.image ? playlist.image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={350} height={350} objectFit="fill" />
      </div>
      <div className='flex flex-col gap-2 px-4'>
        <p onClick={() => router.push({pathname:'/playlistdetails',query:{id: playlist.id}})} className='overflow-hidden text-lg tracking-wider hover:underline text-slate-200 text-ellipsi line-clamp-1'>{playlist && playlist.title ? playlist.title : undefined}</p>
        <div className='flex flex-row items-center gap-2 -mt-[10px] text-white'>
            <p className='overflow-hidden text-xs tracking-wider text-ellipsi line-clamp-1 text-slate-300' style={{ lineHeight: '1rem', fontWeight: '200' }}>{playlist && playlist.description ? playlist.description : undefined}</p>
        </div>
        <div className='flex flex-row items-center gap-2 -mt-1 text-white'>
            <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-400' style={{ lineHeight: '1rem', fontWeight: '200' }}>owner : </p>•
            <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-300' style={{ lineHeight: '1rem', fontWeight: '200' }}>{playlist && playlist.owner ? playlist.owner : undefined}</p>•
        </div>
        <div className='flex flex-row items-center lg:gap-2 gap-4 md: -mt-[15px] text-white'>
            <div className='flex gap-2 '>
              <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-400' style={{ lineHeight: '1rem', fontWeight: '200' }}>tracks :</p>
              <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-300' style={{ lineHeight: '1rem', fontWeight: '200' }}>{playlist && playlist.total_tracks ? playlist.total_tracks : undefined}</p>
            </div>•
            <div className='flex gap-2 '>
              <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-400' style={{ lineHeight: '1rem', fontWeight: '200' }}>type :</p>
              <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-200' style={{ lineHeight: '1rem', fontWeight: '200' }}>{playlist && playlist.type ? playlist.type : undefined}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Playlistdata;