import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React,{useEffect,useState} from 'react';
import Albumdata from '../components/Albumdata';
import Songs from '../components/Songs';
import { useRouter } from 'next/router';
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


const AlbmDetails = ({spotifyApi}) => {
  const router = useRouter();
  
  const {data: session} = useSession()
  const accessToken = session?.accessToken
  const [albumaDetails,setAlbumaDetails]=useState([])
  const [artistAlbums,setArtistAlbums]=useState([])
  const [popularAlbums,setPopularAlbums]=useState([])
  const [color,setColor]=useState(null);


  const albumId = router.query.id;

  useEffect(()=>{
    setColor(shuffle(colors).pop())
  },[albumId])

  useEffect(()=>{
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  },[accessToken,spotifyApi])

//AlbumTracks..........
  useEffect(() => {
    if (!accessToken) return
    spotifyApi.getAlbum(albumId).then((res) => {
      setAlbumaDetails(
        {
        id: res.body.id,
        title: res.body.name,
        label: res.body.label,
        image: res.body.images[0].url,
        artist: res.body.artists[0].name,
        artistId: res.body.artists[0].id,
        popularity: res.body.popularity,
        release_date: res.body.release_date,
        total_tracks: res.body.total_tracks,
        tracks: res.body.tracks.items.map((track) => {
          return{
            id: track.id,
            name: track.name,
            duration: track.duration_ms,
            artist: track.artists.map((artist) => artist.name),
            artistIds: track.artists.map((artist) => artist.id),
            uri: track.uri,
            
          }
        }),
        type: res.body.type,
        uri: res.body.uri
      }
      )
    })
  }, [accessToken, spotifyApi, albumId])
  
  
// // artistAlbums..........
  useEffect(() => {
    const id = (albumaDetails.tracks && albumaDetails.tracks ? albumaDetails.tracks.map((track) => track.artistIds[1] ): '4YRxDV8wJFPHPTeXepOstw')
    if (!accessToken) return
    spotifyApi.getArtistAlbums(albumaDetails.artistId && albumaDetails.artistId ? albumaDetails.artistId : id).then((res) => {
      setArtistAlbums(
        res.body.items.map((album) =>{
          return {
              id: album.id,
              title: album.name,
              image: album.images[0].url,
              artists: album.artists[0].name,
              artistId: album.artists[0].id,
              popularity: album.popularity,
              release_date: album.release_date,
              total_tracks: album.total_tracks,
              tracks: album.tracks,
              type: album.type,
              uri: album.uri
          }
        })
      )
    })
  }, [accessToken, spotifyApi, albumaDetails])
  
  // PopularAlbums..........
  useEffect(() => {
    const id = (albumaDetails.tracks && albumaDetails.tracks ? albumaDetails.tracks.map((track) => track.artistIds[0] ): '4YRxDV8wJFPHPTeXepOstw')
    
    if (!accessToken) return
    spotifyApi.getRecommendations({
      min_energy: 0.4,
      seed_artists: [ albumaDetails && albumaDetails.artistId || id],
      min_popularity: 50
    }).then((res) => {
      setPopularAlbums(
        res.body.tracks.map((album) =>{
          return {
              id: album.album.id,
              title: album.album.name,
              image: album.album.images[0].url,
              artists: album.album.artists[0].name,
              artistId: album.album.artists[0].id,
              popularity: album.album.popularity,
              release_date: album.album.release_date,
              total_tracks: album.album.total_tracks,
              tracks: album.album.tracks,
              type: album.album.type,
              uri: album.album.uri
          }
        })
      )
    })
  }, [accessToken, spotifyApi, albumaDetails])



  return (
    <div className='pb-2 pt-1 flex h-[77.5vh] flex-col lg:px-2 lg:w-[71vw] xl:w-[72vw] w-[99.5vw]  gap-10 overflow-y-scroll '>
      <div className={`relative flex flex-row items-center w-full h-auto gap-1 p-2  rounded-lg sm:p-4 md:gap-3 bg-gradient-to-br opacity-90 hover:opacity-100 ${color} to-black `}>
        <div className='flex items-center rounded-lg ml-2 w-[30%] '>
          <Image className='rounded-[10px] shadow-[5px 5px 5px bg-neutral-800]' src={albumaDetails && albumaDetails.image ? albumaDetails.image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={250} height={250} objectFit="cover" />
        </div>
          <div className='flex flex-col ml-2 sm:ml-4 w-[280px] sm:w-[500px]'>
            <p className='text-3xl font-extrabold text-white xl:text-6xl sm:text-5xl lg:text-6xl line-clamp-2 '>{albumaDetails && albumaDetails.title ? albumaDetails.title : undefined}</p>
            <div className='pt-3 lg:mt-0'>
              <p className='text-xs font-normal sm:text-sm line-clamp-1 text-slate-200 '>{albumaDetails && albumaDetails.label ? albumaDetails.label : undefined}</p>
              <div className='flex flex-row items-center gap-2 -mt-1 text-white '>
                <p className='items-center text-xs text-slate-200 sm:text-sm'>{albumaDetails && albumaDetails.release_date ? albumaDetails.release_date : undefined}</p>•
                <p className='items-center text-xs text-slate-200 sm:text-sm'>{albumaDetails && albumaDetails.total_tracks ? albumaDetails.total_tracks : undefined} Songs</p>
              </div>
              <div className='flex flex-row items-center gap-2 text-white '>
                {/* <Image  className='-mt-1 rounded-full' src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png' alt='image' width={30} height={30} objectFit="contain" /> */}
                <p className='items-center text-xs text-orange-300 sm:text-sm'>Artist : </p>
                <p onClick={() => router.push({pathname:'/artistdetails',query:{id: albumaDetails.artistId}})} className='items-center text-sm cursor-pointer text-slate-50 hover:underline hover:text-white sm:text-sm'>{albumaDetails && albumaDetails.artist ? albumaDetails.artist : undefined} </p>
                <p className='items-center ml-4 text-xs font-extrabold text-orange-300 uppercase sm:text-sm'>[ {albumaDetails && albumaDetails.type ? albumaDetails.type : undefined} ]</p>
              </div>
            </div>
          </div>
      </div>

      <div className='flex flex-col mb-3 lg:-ml-2'>
        
        <div className='space-y-2 -md:space-y-0 '>
          {
            albumaDetails && albumaDetails.tracks ? albumaDetails.tracks.map((track,index) => (
              <div key={track.id}>
                <Songs index={index} track={track} albumaDetails={albumaDetails} spotifyApi={spotifyApi}/>
              </div>
            )): undefined
          }
        </div>
      </div>
      {artistAlbums.length >0 ? 
      <div className='flex flex-col gap-4 mx-4 '>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl'>New releases</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
        { 
            artistAlbums.map((album) => (
              <div key={album.id}>
                <Albumdata album={album}/>
              </div>
            ))
        } 
        </div>
      </div> : undefined
    }

    <div className='flex flex-col gap-4 mx-4 '>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl'>Popular releases</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
        { 
            popularAlbums.map((album) => (
              <div key={album.id}>
                <Albumdata album={album}/>
              </div>
            ))
        } 
        </div>
      </div>
    </div>
  );
}

export default AlbmDetails;
