import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useSpring, animated } from 'react-spring'
import { BsMusicNoteList, } from 'react-icons/bs'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, } from 'react-icons/ai'
import { MdOutlineFavorite, } from 'react-icons/md'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { BsFillCollectionPlayFill } from 'react-icons/bs'
import { useSession } from 'next-auth/react';

//----------------------------------------navbar component start--------------------------------------//
const NavItem = ({ activeItem, name, route, setActiveItem }) => {
  return (
    activeItem !== name ? (
      <Link href={route}>
        <a><span onClick={() => setActiveItem(name)}>{name}</span></a>
      </Link>
    ) : null
  )
}
//----------------------------------------navbar component end----------------------------------------//

//----------------------------------------sidebar component start-------------------------------------//
const Leftbar = ({ showComments, setShowComments, setShowMenu, showMenu }) => {

  const {data: session} = useSession()
  
  const animation = useSpring({
    config: {
      duration: 15,
      ease: 'ease-in-out',
      
    },
    opacity: showMenu ? 1 : 0,
    transform: showMenu ? `translateY(0%)` : `translateY(-100%)`
  })

  const isMobile = useMediaQuery({ query: `(max-width: 1023px)` });

  useEffect(() => {
    if (!isMobile) {
      setShowMenu(true)
    } else {
      setShowMenu(false)
    }

  }, [isMobile, setShowMenu])
  //conditional rendaring end

  const handlePlaylist = () => {
    setShowComments(!showComments)
  }


  const [activeItem, setActiveItem] = useState('')
  const { pathname } = useRouter()
  const router = useRouter()
  useEffect(() => {
    if (pathname === '/') setActiveItem(<AiFillHome/>)
    if (pathname === '/album') setActiveItem(<BsFillCollectionPlayFill/>)
  if (pathname === '/artist') setActiveItem(<FaMicrophoneAlt/>)
    if (pathname === '/favorite') setActiveItem(<MdOutlineFavorite/>)
  }, [pathname])

  return (
    <div>
      {
        showMenu &&
        <animated.div style={animation}>
          <div className='left-0 flex rounded-lg justify-between w-0 h-[75vh] leftbar'>
            <div className='left-0 flex flex-col justify-around text-white rounded-sm shadow-sm opacity-100 shadow-emerald-900 bg-neutral-900' style={{ width: '70px', height: 'auto' }}>
              <ul className='flex-col justify-around ' style={{ textDecoration: 'none' }}>
                <li id={pathname == '/' ? "active" : ""} onClick={()=>router.push('/')}
                  className='flex flex-row py-2 my-10 rounded-sm cursor-pointer px-7 hover:py-0 hover:bg-neutral-800 hover:border-r'>
                  <a className='flex items-center gap-4 outline-none'>
                    <div>
                      <i><NavItem activeItem={activeItem} setActiveItem={setActiveItem} name={<AiFillHome />} route='/' /></i>
                    </div>
                    <span className='px-4 py-2 text-xs rounded-sm title ml-7 bg-neutral-800'>Home</span>
                  </a>
                </li>
                <li id={pathname == '/album' ? "active" : ""} onClick={()=>router.push('/album')}
                  className='flex flex-row py-2 my-10 rounded-sm cursor-pointer px-7 hover:py-0 hover:bg-neutral-800 hover:border-r'>
                  <a className='flex items-center gap-4 outline-none'>
                    <div>
                      <i><NavItem activeItem={activeItem} setActiveItem={setActiveItem} name={<BsFillCollectionPlayFill />} route='/album' /></i>
                    </div>
                    <span className='px-4 py-2 text-xs rounded-sm title ml-7 bg-neutral-800'>Albums</span>
                  </a>
                </li>
                <li id={pathname == '/artist' ? "active" : ""} onClick={()=>router.push('/artist')}
                  className='flex flex-row py-2 my-10 rounded-sm cursor-pointer px-7 hover:py-0 hover:bg-neutral-800 hover:border-r'>
                  <a className='flex items-center gap-4 outline-none'>
                    <div>
                      <i><NavItem activeItem={activeItem} setActiveItem={setActiveItem} name={<FaMicrophoneAlt />} route='/artist' /></i>
                    </div>
                    <span className='px-4 py-2 text-xs rounded-sm title ml-7 bg-neutral-800'>Artist</span>
                  </a>
                </li>
                <li id={pathname == '/favorite' ? "active" : ""} onClick={()=>router.push('/favorite')}
                  className='flex flex-row py-2 my-10 rounded-sm cursor-pointer px-7 hover:py-0 hover:bg-neutral-800 hover:border-r'>
                  <a className='flex items-center gap-4 outline-none'>
                    <div>
                      <i><NavItem activeItem={activeItem} setActiveItem={setActiveItem} name={<MdOutlineFavorite />} route='/favorite' /></i>
                    </div>
                    <span className='px-4 py-2 text-xs rounded-sm title ml-7 bg-neutral-800'>Favorites</span>
                  </a>
                </li>
                <li onClick={handlePlaylist}
                  className='flex flex-row py-2 my-10 rounded-sm cursor-pointer px-7 hover:py-0 hover:bg-neutral-800 hover:border-r'>
                  <a className='flex items-center gap-4 outline-none'>
                    <div>
                      <i><BsMusicNoteList /></i>
                    </div>
                    <span className='px-4 py-2 text-xs rounded-sm title ml-7 bg-neutral-800'>History</span>
                  </a>
                </li>
                <li className='px-4 my-10 cursor-pointer'>
                  <a className='flex items-center gap-4'>
                    <div><Image className='rounded-full cursor-pointer hover:scale-105' src={session && session.user.image? session.user.image :'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'} alt='image' width={50} height={50} objectFit="cover" /></div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </animated.div>
      }
    </div>
  )
}

export default Leftbar