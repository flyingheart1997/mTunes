import Image from 'next/image';
import React,{useEffect,useState} from 'react';
import Artistdata from '../components/Artistdata';
import Songs from '../components/Songs';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Albumdata from '../components/Albumdata';
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

const ArtistDetails = ({spotifyApi}) => {
  const router = useRouter();

  const [color,setColor]=useState(null);
  const {data: session} = useSession()
  const accessToken = session?.accessToken
  const [artist,setArtist]=useState([])
  const [artistAlbums,setArtistAlbums]=useState([])
  const [relatedArtists,setRelatedArtists]=useState([])
  const [artistsTracks,setArtistsTracks]=useState([])

  const artistId = router.query.id

  useEffect(()=>{
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  },[accessToken,spotifyApi])

  useEffect(()=>{
    setColor(shuffle(colors).pop())
  },[artistId])

//Artist Details
  useEffect(()=>{     
    if(!accessToken) return 
    spotifyApi.getArtist(artistId).then((res)=>{
      setArtist({
          id: res.body.id,
          title: res.body.name,
          image: res.body.images[0]?.url,
          uri: res.body.uri,
          followers: res.body.followers.total,
          type: res.body.type,
          popularity: res.body.popularity,
          genres: res.body.genres.map((genre) => genre)
          
      })
            
    })
  },[accessToken,spotifyApi,artistId])


//Artist Albums........
useEffect(()=>{        
  const artistId = router.query.id
      if(!accessToken) return 
      spotifyApi.getArtistAlbums(artistId).then((res)=>{
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
    },[accessToken,spotifyApi,router])
    
    
//Related Artist........
useEffect(()=>{        
  const artistId = router.query.id
      if(!accessToken) return 
      spotifyApi.getArtistRelatedArtists(artistId).then((res)=>{
        setRelatedArtists(
          res.body.artists.map((artist) =>{
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
    },[accessToken,spotifyApi,router])


//Artist Top Tracks........
useEffect(()=>{        
  const artistId = router.query.id
      if(!accessToken) return 
      spotifyApi.getArtistTopTracks(artistId,'IN').then((res)=>{
        setArtistsTracks(
          res.body.tracks.map((track) =>{
            return{
            id: track.id,
            name: track.name,
            duration: track.duration_ms,
            artist: track.artists.map((artist) => artist.name),
            artistIds: track.artists.map((artist) => artist.id),
            uri: track.uri,
            external_urls: track.external_urls.spotify,
            albumId: track.album.id,
            }
          })
        
        )
      })
    },[accessToken,spotifyApi,router])


  return (
    <div className='pb-2 pt-1 flex h-[77.5vh] flex-col lg:px-2 lg:w-[71vw] xl:w-[72vw] w-[99.5vw]  gap-10 overflow-y-scroll '>
      <div className={`relative flex flex-row items-center w-full h-auto gap-1 p-2 shadow-2xl rounded-lg sm:p-4 md:gap-3 bg-gradient-to-br  opacity-90 hover:opacity-100 to-black ${color}`}>
        <div className='flex items-center ml-2 sm:ml-4 w-[30%] rounded-lg'>
          <Image className='rounded-full shadow-[5px 5px 5px bg-neutral-800]' src={artist && artist.image ? artist.image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={200} height={200} objectFit="cover" />
        </div>
          <div className='flex flex-col ml-2'>
            <p className='xl:text-[65px] md:text-[50px] lg:text-[40px] ms:text-[26px] text-[24px] line-clamp-1 font-extrabold text-white'>{artist && artist.title ? artist.title : undefined}</p>
              <div className='flex flex-row items-center space-x-1.5 text-sm md:text-base tracking-wide font-light text-white -mt-1.5'>
                <p className='items-center line-clamp-1 text-slate-50'>{artist && artist.genres ? artist.genres[0] : undefined}{artist.genres && artist.genres[0]?',':''}</p>
                <p className='items-center line-clamp-1 text-slate-50'>{artist && artist.genres ? artist.genres[1] : undefined}{artist.genres && artist.genres[1]?',':''}</p>
                <p className='items-center line-clamp-1 text-slate-50'>{artist && artist.genres ? artist.genres[2] : undefined}</p>
              </div>
              <div className='flex flex-row items-center gap-2 mt-2 text-white'>
                {/* <Image  className='-mt-1 rounded-full' src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png' alt='image' width={30} height={30} objectFit="contain" /> */}
                <p className='items-center text-orange-300'>Followers :</p>
                <p className='items-center text-slate-50 '> {artist && artist.followers ? artist.followers : undefined} </p>
                <p className='items-center ml-4 text-sm font-extrabold text-orange-300 uppercase'>[ {artist && artist.type ? artist.type : undefined} ] </p>
              </div>
          </div>
      </div>

      <div className='flex flex-col mx-2 mb-3'>
        <div className=' flex lg:w-[71vw] xl:w-[72vw] w-[99.5vw] '>
          <p className='py-3 pl-2 text-3xl font-extrabold tracking-wider text-white md:text-4xl '>Top Tracks</p>
        </div>
        <div className='flex flex-col items-center justify-center space-y-1 -md:space-y-1'>
          {
            artistsTracks.map((track) => (
              <div key={track.id}>
                <Songs track={track} spotifyApi={spotifyApi}/>
              </div>
            ))
          }
        </div>
      </div>

      <div className='flex flex-col gap-4 mx-4 '>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>Similar Artist</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll cursor-pointer'>
        {
            relatedArtists.map((artist) => (
                <div key={artist.id}>
                    <Artistdata artist={artist}/>
                </div>
            ))
        }
        </div>
      </div>

      <div className='flex flex-col gap-4 mx-4 '>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl'>Popular releases</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
          {
            artistAlbums.map((album) => (
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

export default ArtistDetails;
