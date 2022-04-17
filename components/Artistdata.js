
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const Artistdata = ({artist}) => {
    const router = useRouter()
  return (
    <div onClick={() => router.push({pathname:'/artistdetails',query:{id: artist.id}})} className='xl:w-[220px] w-[250px] h-[345px] lg:w-[230px] md:w-[240px] xs:w-[340px] ms:w-[250px] ms:h-[345px] overflow-y-scroll cursor-pointer rounded-lg hover:bg-neutral-800 bg-neutral-900 md:h-[330px] xs:h-[435px] lg:h-[322px] xl:h-[315px] opacity-80 hover:opacity-100'>
    <div className='flex items-center justify-center px-4 py-4'>
      <Image className='rounded-full shadow-inherit ' src={artist && artist.image ? artist.image :'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={300} height={300} objectFit="fill" />
    </div>
    <div className='flex flex-col gap-2 px-4'>
      <p onClick={() => router.push({pathname:'/artistdetails',query:{id: artist.id}})} className='overflow-hidden text-lg tracking-wider hover:underline text-slate-200 text-ellipsi line-clamp-1'>• {artist && artist.title ? artist.title : undefined} •</p>
      
      <div className='flex flex-row items-center gap-2 text-white'>
          <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-400' style={{ lineHeight: '1rem', fontWeight: '200' }}>followers : </p>
          <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-300' style={{ lineHeight: '1rem', fontWeight: '200' }}>{artist && artist.followers ? artist.followers : undefined}</p>
      </div>
      <div className='flex flex-row items-center lg:gap-2 gap-4 -mt-[10px] text-white'>
          <div className='flex gap-2'>
            <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-400' style={{ lineHeight: '1rem', fontWeight: '200' }}>popularity :</p>
            <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-300' style={{ lineHeight: '1rem', fontWeight: '200' }}>{artist && artist.popularity ? artist.popularity : undefined}</p>
          </div>•
          <div className='flex gap-2 '>
            <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-400' style={{ lineHeight: '1rem', fontWeight: '200' }}>type :</p>
            <p className='overflow-hidden text-sm tracking-wider text-ellipsi line-clamp-1 text-slate-200' style={{ lineHeight: '1rem', fontWeight: '200' }}>{artist && artist.type ? artist.type : undefined}</p>
          </div>
      </div>
    </div>
  </div>
  )
}

export default Artistdata
