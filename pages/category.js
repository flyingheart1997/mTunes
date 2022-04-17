import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Playlistdata from '../components/Playlistdata';
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


const Category = ({spotifyApi}) => {

  const router = useRouter();
  const { data: session } = useSession()
  const accessToken = session.accessToken
  const [category, setCategory] = useState([])
  const [categoryPlaylist, setCategoryPlaylist] = useState([])
  const [userPlaylist, setUserPlaylist] = useState([])
  const [color,setColor]=useState(null);

  const categoryId = router.query.id;
  useEffect(()=>{
    setColor(shuffle(colors).pop())
  },[categoryId])


  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken, spotifyApi])

// Category.........
  useEffect(() => {
    if (!accessToken) return
  spotifyApi.getCategory(categoryId,{country: 'IN',locale: 'en_IN',limit: 50}).then((res)=>{
    setCategory({
          id: res.body.id,
          title: res.body.name,
          image: res.body.icons[0].url,
        })
  })
},[accessToken,spotifyApi,categoryId])


// CategoryPlaylists.........
  useEffect(() => {
    const categoryId = router.query.id;
    if (!accessToken) return
  spotifyApi.getPlaylistsForCategory(categoryId,{country: 'IN',limit: 50}).then((res)=>{
    setCategoryPlaylist(
      res.body.playlists.items.map((playlist) =>{
        return{
          id: playlist.id,
          owner: playlist.owner.display_name,
          ownerId: playlist.owner.id,
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
},[accessToken,spotifyApi,router])


// UserPlaylists.........
  useEffect(() => {
    const categoryId = router.query.id;
    if (!accessToken) return
  spotifyApi.getUserPlaylists({country: 'IN',limit: 50}).then((res)=>{
    setUserPlaylist(
      res.body.items.map((playlist) =>{
        return{
          id: playlist.id,
          owner: playlist.owner.display_name,
          ownerId: playlist.owner.id,
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
},[accessToken,spotifyApi,router])


  return (
    <div className='pb-2 pt-1  flex h-[77.5vh] flex-col lg:px-2 lg:w-[71vw] xl:w-[72vw] w-[99.5vw]  gap-10 overflow-y-scroll '>
      <div className={`relative flex items-center w-full gap-1 p-2  rounded-lg sm:p-4 md:gap-3 bg-gradient-to-br opacity-90 hover:opacity-100 ${color} to-black `}>
          <div className='w-[30%]'><Image className='rounded-[10px] ' src={category && category.image ? category.image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={200} height={200} objectFit="cover" /></div>
          <div className='h-auto w-[70%] '><p className='ml-4 text-5xl ms:text-6xl font-extrabold text-white md:text-[69px] line-clamp-2' style={{lineHeight:'3.3rem'}}>{category ? category.title : undefined}</p></div>
      </div>

      <div className='flex flex-col gap-4 px-2'>
        <p className='text-xl tracking-wide ms:text-[27px] md:text-3xl text-slate-100'>Tranding “ {category && category.title ? category.title : undefined} ”</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll cursor-pointer'>
          {
              categoryPlaylist.slice(0).map((playlist) => (
                <div key={playlist.id}>
                  <Playlistdata playlist={playlist}
                  />
                </div>
              ))
          }
        </div>
      </div>
      
      <div className='flex flex-col gap-4 px-2'>
        <p className='text-2xl tracking-wide ms:text-3xl text-slate-100'>Popular Playlists</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll cursor-pointer'>
          {
              userPlaylist.slice(0).map((playlist) => (
                <div key={playlist.id}>
                  <Playlistdata playlist={playlist}
                  />
                </div>
              ))
          }
        </div>
      </div>
      </div>
  );
}

export default Category;
