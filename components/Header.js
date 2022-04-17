import Image from 'next/image';
import React,{useState} from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';


export default function Header({setShowMenu,showMenu,setSearchedValue }) {

  const {data: session} = useSession()
  const router = useRouter()
  const [inputValue, setInputValue] = useState("");
  const inputRef = React.createRef();
  const search = () => {
    setSearchedValue(inputValue);
  }

  const handleMenu = ( )=>{
    setShowMenu(!showMenu)
  }
 

  return (
    <div className='h-[10vh] w-full py-0 justify-between items-center md:px-4 px-3 border-b border-[#333333] bg-neutral-900 flex'>
      <Image onClick={handleMenu} className='h-32 rounded-full cursor-pointer ' src='https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg' alt='image' width={45} height={45} objectFit="cover" />
      <form onClick={() => router.push('/search')} className='w-[70%]'><input onClick={search} className=' space-x-2 shadow-sm shadow-lime-800 px-4 rounded-md w-[100%] py-2 outline-none border-none bg-black text-slate-300' type='text' placeholder='Search...' value={inputValue} ref={inputRef} onChange={() =>setInputValue(inputRef.current.value)}></input></form>
      <div className='flex flex-col items-center gap-1 mt-1 cursor-pointer logout hover:scale-105 '>
        <div onClick={()=>signOut()} className='shadow-sm shadow-amber-800 flex flex-row items-center sm:pr-[20px] p-1 sm:py-0.5 space-x-3 bg-black text-white rounded-3xl '>
          <Image className='h-32 rounded-full' src={session && session.user.image? session.user.image :'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'}  alt='image' width={35} height={35} objectFit="cover" />
          <p className='hidden rounded-2xl sm:block'>{session?.user.name } </p> 
        </div>
      </div>
    </div>
  );
}


// :'https://img.icons8.com/fluency/200/international-music.png'

