import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';


function NewReleaseData({album}) {
  const router = useRouter()
  return (
    <div onClick={() => router.push({pathname:'/albumdetails',query:{id: album.id}})} className='xl:w-[220px] w-[250px] h-[365px] lg:w-[230px] md:w-[240px] xs:w-[340px] ms:w-[250px] ms:h-[365px] overflow-y-scroll cursor-pointer rounded-lg hover:bg-neutral-800 bg-neutral-900 md:h-[350px] xs:h-[455px] lg:h-[342px] xl:h-[335px] opacity-80 hover:opacity-100'>
      <div className='flex items-center justify-center px-4 py-4'>
        <Image className='rounded-[10px] ' src={album && album.image ? album.image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={350} height={350} objectFit="fill" />
      </div>
      <div className='flex flex-col gap-2 px-4'>
        <p onClick={() => router.push({pathname:'/albumdetails',query:{id: album.id}})} className='overflow-hidden text-lg tracking-wider hover:underline text-slate-200 text-ellipsi line-clamp-1'>{album && album.title ? album.title : undefined}</p>
        <div className='flex flex-row items-center gap-2 -mt-0 text-white'>
            <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-400' style={{ lineHeight: '1rem', fontWeight: '200' }}>artist : </p>
            <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-300' style={{ lineHeight: '1rem', fontWeight: '200' }}>{album && album.artista ? album.artista : undefined}</p>
        </div>
        <div className='flex flex-row items-center gap-2 -mt-[5px] text-white'>
            <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-400' style={{ lineHeight: '1rem', fontWeight: '200' }}>release date : </p>
            <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-300' style={{ lineHeight: '1rem', fontWeight: '200' }}>{album && album.release_date ? album.release_date : undefined}</p>
        </div>
        <div className='flex flex-row items-center gap-4 lg:gap-2 -mt-[12px] text-white'>
           <div className='flex gap-2'>
              <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-400' style={{ lineHeight: '1rem', fontWeight: '200' }}>tracks :</p>
              <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-300' style={{ lineHeight: '1rem', fontWeight: '200' }}>{album && album.total_tracks ? album.total_tracks : undefined}</p>
           </div>•
           <div className='flex gap-2'>
              <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-400' style={{ lineHeight: '1rem', fontWeight: '200' }}>type :</p>
              <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-200' style={{ lineHeight: '1rem', fontWeight: '200' }}>{album && album.type ? album.type : undefined}</p>
           </div>
        </div>
      </div>
    </div>
  );
}

export default NewReleaseData;