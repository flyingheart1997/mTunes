import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const Categorydata = ({category}) => {
  const router = useRouter()
  return (
    <div className='w-auto h-auto overflow-y-scroll rounded-lg opacity-80 hover:opacity-100'>
      <div onClick={() => router.push({pathname:'/category',query:{id: category.id}})} className='flex items-center justify-center cursor-pointer '>
        <Image className='rounded-[10px]' src={category && category.image ? category.image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={215} height={200} objectFit="cover" />
        <p className='absolute pt-20 truncate text-xl font-extrabold text-white sm:pt-[120px] sm:text-[22px] xl:text-2xl'>{category && category.title ? category.title : undefined}</p>
      </div>
    </div>
  )
}

export default Categorydata
