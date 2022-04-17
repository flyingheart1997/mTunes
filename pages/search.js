import React,{useEffect,useState} from 'react';
import { useSession } from 'next-auth/react';
import Categorydata from '../components/Categorydata';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Artistdata from '../components/Artistdata';
import Albumdata from '../components/Albumdata';
import Playlistdata from '../components/Playlistdata';
import Songs from '../components/Songs';
const SearchScreen = ({spotifyApi,searchedValue }) => {

  const router = useRouter()
  const {data: session} = useSession()
  const accessToken = session?.accessToken
  const [categories,setCategories]=useState([])

  // search value.......//
 
  const [searchTracks,setSearchTracks] = useState([])
  const [searchArtist,setSearchArtist] = useState([])
  const [searchAlbum,setSearchAlbum] = useState([])
  const [searchPlaylist,setSearchPlaylist] = useState([])


  useEffect(()=>{
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  },[accessToken,spotifyApi])

//SearchTracks.....
  useEffect(()=>{
    if(!searchedValue) return setSearchTracks([]) 
    if(!accessToken) return 
    spotifyApi.searchTracks(searchedValue).then((res)=>{
      setSearchTracks(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            image: track.album.images[0].url,
            artist: track.artists.map((artist) => artist.name),
            artistIds: track.artists.map((artist) => artist.id),
            duration: track.duration_ms,
            uri: track.uri,
            albumId: track.album.id,
          }
        })
      )
    })
  },[accessToken,spotifyApi,searchedValue])

//SearchArtist.....
  useEffect(()=>{
    if(!searchedValue) return setSearchArtist([]) 
    if(!accessToken) return 
    spotifyApi.searchArtists(searchedValue).then((res)=>{
      setSearchArtist(
        res.body.artists.items.map((artist) =>{
          return{
            id: artist.id,
            title: artist.name,
            image: artist.images[0]?.url,
            uri: artist.uri,
            followers: artist.followers.total,
            type: artist.type,
            popularity: artist.popularity,
          }
        })
      )
    })
  },[accessToken,spotifyApi,searchedValue])

//SearchAlbum.....
  useEffect(()=>{
    if(!searchedValue) return setSearchAlbum([]) 
    if(!accessToken) return 
    spotifyApi.searchTracks(searchedValue).then((res)=>{
      setSearchAlbum(
        res.body.tracks.items.map((album) =>{
          return {
              id: album.album.id,
              title: album.album.name,
              image: album.album.images[0].url,
              artists: album.album.artists[0].name,
              artistId: album.album.artists[0].id,
              release_date: album.album.release_date,
              total_tracks: album.album.total_tracks,
              type: album.album.type,
              uri: album.album.uri
          }
        })
      )
    })
  },[accessToken,spotifyApi,searchedValue])

//SearchPlaylist.....
  useEffect(()=>{
    if(!searchedValue) return setSearchPlaylist([]) 
    if(!accessToken) return 
    spotifyApi.searchPlaylists(searchedValue).then((res)=>{
      setSearchPlaylist(
        res.body.playlists.items.map((playlist) =>{
          return{
            id: playlist.id,
            owner: playlist.owner.display_name,
            title: playlist.name,
            image: playlist.images[0]?.url,
            uri: playlist.uri,
            type: playlist.type,
            total_tracks: playlist.tracks.total,
            description: playlist.description,
          }
        })
      )
    })
  },[accessToken,spotifyApi,searchedValue])

  // search value end.......//

  
  // Categories.........
  useEffect(()=>{
    if(!accessToken) return 
    spotifyApi.getCategories({country: 'IN',locale: 'en_IN',limit: 50}).then((res)=>{
      setCategories(
        res.body.categories.items.map((category) =>{
          return{
            id: category.id,
            title: category.name,
            image: category.icons[0].url,
          }
        })
      )
    })
  },[accessToken,spotifyApi,router])

  
  return (
    <div className='relative flex-col items-center justify-center px-0 space-y-6 overflow-y-scroll h-[75vh] lg:w-[75vw] xl:w-[73vw] w-[100vw] '>
      {searchArtist.length === 0 ? 
      <>
      <p className='pl-2 mt-4 text-3xl font-extrabold text-white'>Top Categories</p>
      <div className='flex flex-row items-center justify-center gap-2 px-3 sm:gap-10 lg:gap-6 '>
        <div onClick={() => router.push({pathname:'/category',query:{id: categories[8] ? categories[8].id : undefined}})} className='flex items-center justify-center cursor-pointer '>
            <p className='absolute z-50 pt-16 text-3xl font-extrabold text-white sm:pt-28 sm:text-4xl'>{categories[8] ? categories[8].title : undefined}</p>
            <Image className='opacity-100 rounded-[10px] ' src={categories[8] ? categories[8].image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={250} height={200} objectFit="cover" />
        </div>
        <div onClick={() => router.push({pathname:'/category',query:{id: categories[18] ? categories[18].id : undefined}})} className='flex items-center justify-center cursor-pointer'>
            <p className='absolute z-50 pt-16 text-3xl font-extrabold text-white sm:pt-28 sm:text-4xl'>{categories[18] ? categories[18].title : undefined}</p>
            <Image className='opacity-100 rounded-[10px] ' src={categories[18] ? categories[18].image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={250} height={200} objectFit="cover" />
        </div>
        <div onClick={() => router.push({pathname:'/category',query:{id: categories[14] ? categories[14].id : undefined}})} className='flex items-center justify-center cursor-pointer'>
            <p className='absolute z-50 pt-16 text-3xl font-extrabold text-white sm:pt-28 sm:text-4xl'>{categories[14] ? categories[14].title : undefined}</p>
            <Image className='opacity-100 rounded-[10px] ' src={categories[14] ? categories[14].image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={250} height={200} objectFit="cover" />
        </div>
        
      </div>
      <p className='pl-2 mt-4 text-3xl font-extrabold text-white'>Browse all</p>
      <div className='h-[75vh] overflow-y-scroll p-2 md:p-4'>
        <div className='relative grid grid-cols-12 gap-4 '>
        {
          categories.slice(0,51).map((category) => (
            <div className='col-span-12 rounded-lg cursor-pointer xs:col-span-6 ms:col-span-4 md:col-span-3' key={category.id}>
              <Categorydata category={category}/>
            </div>
          ))
        }
        </div>
      </div>
      </>  :
      <>
      <div className='relative flex flex-row items-center w-full h-auto gap-1 p-2 rounded-lg sm:p-4 md:gap-3 bg-gradient-to-bl opacity-90 hover:opacity-100 from-cyan-700 to-emerald-600'>
        <div className='flex items-center ml-2 w-[30%]  rounded-lg sm:p-4 '>
          <Image className='rounded-[10px]' src={searchPlaylist && searchPlaylist[0] ? searchPlaylist[0].image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg' }  alt='image' width={250} height={240} objectFit="fill" />
        </div>
        <div className='flex flex-col ml-2 sm:ml-4 w-[300px] md:w-[600px]'>
          <p onClick={() => router.push({pathname:'/playlistdetails',query:{id: searchPlaylist && searchPlaylist[0] ? searchPlaylist[0].id : undefined}})} className='xl:text-[65px] md:text-[68px] lg:text-[45px] text-[28px] line-clamp-1 font-extrabold text-white cursor-pointer hover:underline'>{searchPlaylist && searchPlaylist[0] ? searchPlaylist[0].title : undefined}</p>
          <div className='md:-mt-[16px] lg:mt-0 '>
            <p className='text-[14px] sm:text-[20px] line-clamp-1 font-extralight text-slate-200 '>{searchPlaylist && searchPlaylist[0] ? searchPlaylist[0].description : undefined}</p>
            <div className='flex flex-row items-center gap-x-1.5 sm:gap-x-2 text-white mt-2'>
              <p className='items-center text-xs text-orange-200 line-clamp-1 sm:text-sm'>Followers : </p>
              <p className='items-center text-xs text-slate-200 sm:text-sm'>{searchPlaylist && searchPlaylist[0] ? searchPlaylist[0].followers : undefined}</p>•
              <p className='items-center text-xs text-slate-100 sm:text-sm'>{searchPlaylist && searchPlaylist[0] ? searchPlaylist[0].total_tracks : undefined} Songs</p>
            </div>
            <div className='flex flex-row items-center gap-x-1.5 sm:gap-x-2 text-white sm:line-clamp-none -mt-1.5'>
              {/* <Image  className='-mt-1 rounded-full' src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png' alt='image' width={30} height={30} objectFit="contain" /> */}
              <div className='flex flex-row items-center gap-2'>
                <p className='items-center text-xs text-orange-200 line-clamp-1 sm:text-sm'>Owner : </p>
                <p className='items-centertext-slate-50 '>{searchPlaylist && searchPlaylist[0] ? searchPlaylist[0].owner : undefined} </p>
              </div>
              <p className='items-center ml-2 text-xs font-extrabold text-orange-300 uppercase sm:text-sm md:ml-4'>[ {searchPlaylist && searchPlaylist[0] ? searchPlaylist[0].type : undefined} ]</p>
            </div>
          </div>
        </div>
      </div>
    
      <div className='flex flex-col mb-3'>
        <div className='  flex  lg:w-[71vw] xl:w-[72vw] w-[99.5vw] '>
          <p className='py-3 pl-2 text-3xl font-extrabold tracking-wider text-white md:text-4xl '>Tracks</p>
        </div>
        <div className='flex flex-col items-center justify-center space-y-1 -md:space-y-1'>
          {
            searchTracks.map((track) => (
              <div key={track.id}>
                <Songs track={track} spotifyApi={spotifyApi}/>
              </div>
            ))
          }
        </div>
      </div>

      <div className='flex flex-col gap-3 py-2 mx-4'>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>Artists</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll cursor-pointer'>
            {
                searchArtist.slice(0,30).map((artist) => (
                    <div key={artist.id}>
                        <Artistdata artist={artist}/>
                    </div>
                ))
            }
        </div>
      </div>

      <div className='flex flex-col gap-3 py-2 mx-4'>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>Albums</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll cursor-pointer'>
            {
                searchAlbum.slice(0,30).map((album) => (
                    <div key={album.id}>
                        <Albumdata album={album}/>
                    </div>
                ))
            }
        </div>
      </div>
      <div className='flex flex-col gap-3 py-2 mx-4'>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>Playlists</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll cursor-pointer'>
          {
            searchPlaylist.slice(0,30).map((playlist) => (
              <div key={playlist.id}>
                <Playlistdata playlist={playlist}
                  // choosePlaylist={choosePlaylist}
                />
              </div>
            ))
          }
        </div>
      </div>
      </>
      }
    </div>
  )
}

export default SearchScreen

