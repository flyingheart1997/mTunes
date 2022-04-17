import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Songs from '../components/Songs';
import { useRouter } from 'next/router';
import Featureddata from '../components/Featureddata';
import {shuffle} from 'lodash'


const colors = [
  "from-pink-900",
  "from-purple-900",
  "from-orange-900",
  "from-green-900",
  "from-red-900",
  "from-blue-900",
  "from-yellow-900",
  "from-teal-900",
  "from-cyan-900",
  "from-gray-600",
  "from-indigo-900",
  "from-amber-700",
]

const PlaylistDetails = ({ spotifyApi }) => {
  const router = useRouter();
  const { data: session } = useSession()
  const accessToken = session?.accessToken
  const [playlist, setPlaylist] = useState([])
  const [featuredPlaylist, setFeaturedPlaylist] = useState([])
  const [color,setColor]=useState(null);

// Query............

  const playlistId = router.query.id;
  useEffect(()=>{
    setColor(shuffle(colors).pop())
  },[playlistId])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken, spotifyApi])

  // Charts.........
  useEffect(() => {
    if (!accessToken) return
    spotifyApi.getPlaylist(playlistId).then((res) => {
      setPlaylist({
        id: res.body.id,
        owner: res.body.owner.display_name,
        title: res.body.name,
        image: res.body.images[0].url,
        uri: res.body.uri,
        type: res.body.type,
        total_tracks: res.body.tracks.total,
        tracks: res.body.tracks.items.map((track) => {
          return {
            id: track.track.id,
            name: track.track.name,
            artist: track.track.artists.map((artist) => artist.name),
            artistIds: track.track.artists.map((artist) => artist.id),
            duration: track.track.duration_ms,
            uri: track.track.uri,
            albumId: track.track.album.id,
          }
        }),
        description: res.body.description,
        followers: res.body.followers.total,
      })
    })
  }, [accessToken, spotifyApi, playlistId])


// Featureds Playlist.........
  useEffect(()=>{
    if(!accessToken) return 
    spotifyApi.getFeaturedPlaylists({country:['IN'],limit: 50}).then((res)=>{
      setFeaturedPlaylist(
        res.body.playlists.items.map((playlist) =>{
          return{
            id: playlist.id,
            owner: playlist.owner.display_name,
            title: playlist.name,
            image: playlist.images[0].url,
            uri: playlist.uri,
            type: playlist.type,
            total_tracks: playlist.tracks.total,
            description: playlist.description,
          }
        })
      )
    })
  },[accessToken,spotifyApi])

  
  return (
    <div className='pb-2 pt-1 flex h-[77.5vh] flex-col lg:px-2 lg:w-[71vw] xl:w-[72vw] w-[99.5vw]  gap-10 overflow-y-scroll '>
      <div className={`relative flex flex-row items-center w-full h-auto gap-1 p-2  rounded-lg sm:p-4 md:gap-3 bg-gradient-to-br opacity-90 hover:opacity-100 ${color} to-black`}>
        <div className='flex items-center ml-2 w-[30%]  rounded-lg sm:p-4'>
          <Image className='rounded-[10px]' src={playlist && playlist.image ? playlist.image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={250} height={240} objectFit="fill" />
        </div>
        <div className='flex flex-col ml-2 sm:ml-4 w-[280px] sm:w-[600px]'>
          <p className='xl:text-[65px] md:text-[68px] lg:text-[45px] text-[25px] line-clamp-1 font-extrabold text-white'>{playlist && playlist.title ? playlist.title : undefined}</p>
          <div className='md:-mt-[16px] lg:mt-0'>
            <p className='text-[12px] sm:text-[20px] line-clamp-1 font-extralight text-slate-200 sm:w-[450px]'>{playlist && playlist.description ? playlist.description : undefined}</p>
            <div className='flex flex-row items-center gap-x-1.5 sm:gap-x-2 -mt-1.5 text-white '>
              <p className='items-center text-xs text-orange-300 line-clamp-1 sm:text-sm'>Followers : </p>
              <p className='items-center text-xs text-slate-200 sm:text-sm'>{playlist && playlist.followers ? playlist.followers : undefined}</p>•
              <p className='items-center text-xs text-slate-200 sm:text-sm'>{playlist && playlist.total_tracks ? playlist.total_tracks : undefined} Songs</p>
            </div>
            <div className='flex flex-row items-center  text-white gap-x-1.5 sm:gap-x-2 '>
              {/* <Image  className='-mt-1 rounded-full' src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png' alt='image' width={30} height={30} objectFit="contain" /> */}
              <div className='flex flex-row gap-2'>
                <p className='items-center text-xs text-orange-300 line-clamp-1 sm: sm:text-sm'>Owner : </p>
                <p className='text-sm truncate items-centertext-slate-50'>{playlist && playlist.owner ? playlist.owner : undefined} </p>
              </div>    
              <p className='items-center ml-1 text-xs font-extrabold text-orange-300 uppercase sm:text-sm md:ml-4'>[ {playlist && playlist.type ? playlist.type : undefined} ]</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col mb-3 lg:-ml-2'>
        <div className='  flex  lg:w-[71vw] xl:w-[72vw] w-[99.5vw] '>
          <p className='py-3 pl-2 text-3xl font-extrabold tracking-wider text-white md:text-4xl '>Popular Songs</p>
        </div>
        <div className='space-y-1 -md:space-y-1'>
          {
            playlist && playlist.tracks ? playlist.tracks.map((track) => (
              <div key={track.id}>
                <Songs track={track} playlist={playlist} spotifyApi={spotifyApi}/>
              </div>
            )): undefined
          }
        </div>
      </div>

      <div className='flex flex-col gap-4 mx-4 '>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl'>Similar Playlist</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll cursor-pointer'>
          {
              featuredPlaylist.slice(0).map((playlist) => (
                <div key={playlist.id}>
                  <Featureddata playlist={playlist}
                    // choosePlaylist={choosePlaylist}
                  />
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetails;
