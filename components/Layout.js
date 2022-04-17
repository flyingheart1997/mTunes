import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React,{useState,useEffect} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Footer from './Footer'
import Header from './Header'
import Leftbar from './Leftbar'
import Loader from './Loader'
import Rightbar from './Rightbar'

const Layout = ({children}) => {

  const router = useRouter();
  const showHeader = router.pathname === '/auth/signin' ? false : true;

  const [showComments, setShowComments] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

// search.....
  const [searchedValue, setSearchedValue] = useState();
// search.....

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
  })

  const {data: session,status} = useSession({
    required: true,
    onUnauthenticated(){
      router.push('/auth/signin')
    }
    
  })


  return (
    <div className='p-0 m-0' style={{height:'100vh', width:'100vw'}}>
    {showHeader && <Header showMenu={showMenu} setShowMenu={setShowMenu} spotifyApi={spotifyApi} setSearchedValue={setSearchedValue}/>}
      <div className='grid justify-between grid-cols-12' style={{height:'75vh', width:'100vw'}}>
       {showHeader && <div className='left-0 z-10 flex justify-between lg:col-span-1'> <Leftbar showComments={showComments} setShowComments={setShowComments} showMenu={showMenu} setShowMenu={setShowMenu} /></div>}
        <div className='lg:col-span-9 ml-[-8.4vw] lg:ml-[-10px] xl:ml-[-28px] justify-between  h-[75vh] lg:w-[71.5vw] xl:w-[72.5vw] w-[100vw]  flex overflow-y-scroll'>
        {React.cloneElement(children, {
        spotifyApi, searchedValue
      })}
        </div>
        {showHeader && <div className='overflow-y-auto lg:col-span-2 -z-0'>
        <Rightbar showComments={showComments} setShowComments={setShowComments} spotifyApi={spotifyApi}/>
        </div>}
      </div>
     { showHeader && <Footer spotifyApi={spotifyApi}/>}
   </div>
  )
}

export default Layout



