import { useSession } from 'next-auth/react';
import React,{useEffect,useState} from 'react';
import Albumdata from '../components/Albumdata';
import Artistdata from '../components/Artistdata';
import NewReleaseData from '../components/Newreleasedata';
import Playlistdata from '../components/Playlistdata';
import Featureddata from '../components/Featureddata';
import { useRouter } from 'next/router';

const Home = ({spotifyApi}) => {

  const router = useRouter()
  const {data: session} = useSession()
  const accessToken = session?.accessToken
  const [newRelease,setNewRelease]=useState([])
  const [featureds,setFeatureds]=useState([])
  const [popularAlbums,setPopularAlbums]=useState([])
  const [trandingAlbums,setTrandingAlbums]=useState([])
  const [charts,setCharts]=useState([])
  const [popularArtists,setPopularArtists]=useState([])
  
  useEffect(()=>{
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  },[accessToken,spotifyApi,router])
console.log(accessToken);
// Charts.........
useEffect(()=>{
  if(!accessToken) return 
  spotifyApi.getUserPlaylists({limit:50}).then((res)=>{
    setCharts(
      res.body.items.map((playlist) =>{
        return{
          id: playlist.id,
          owner: playlist.owner.display_name,
          title: playlist.name,
          image: playlist.images[0].url,
          // image: playlist.images.length>0?playlist.images[0].url:null,
          uri: playlist.uri,
          type: playlist.type,
          total_tracks: playlist.tracks.total,
          description: playlist.description,
        }
      })
    )
  })
},[accessToken,spotifyApi])


// Featureds.........
  useEffect(()=>{
    if(!accessToken) return 
    spotifyApi.getFeaturedPlaylists({country:['IN'],limit: 50}).then((res)=>{
      setFeatureds(
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
  
// PopularAlbum..........
useEffect(()=>{
  if(!accessToken) return 
  spotifyApi.getAlbums(['2ifXB65SLpF97vWZjKGpQ9','2Lxoc72vRTGdQfMvj7Ovi1','5IIgGd5lU6QSg4Z2zwB8jS','6es8wELOWESpxXxfsOmd0l','4STyPN6DqIbBkkDlczowCn','1I3s1v090iECnF0ZhCL1ui','0Rkv5iqjF2uenfL0OVB8hg','7uftfPn8f7lwtRLUrEVRYM','13cfnYgKTA3vx9ZN6h1rqD','5Mtub8rH5hHRhKAhijK2Ks','4EGVr9mSwFPoqvDMkiahJp','06nzx991q1EdN8DOabMhyT','7lF34sP6HtRAL7VEMvYHff','77jAfTh3KH9K2reMOmTgOh','2JFhgDiyzo3bM2EEWedu6X','2DKSZvMj7Da6rzNVPMgREj','3uuu6u13U0KeVQsZ3CZKK4','0zV96rKdfWliVHNBpAsd2b','5dGWwsZ9iB2Xc3UKR0gif2','3tG0IGB24sRhGFLs5F1Km8',],).then((res)=>{
    setPopularAlbums(
      res.body.albums.map((album) =>{
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
},[accessToken,spotifyApi])

// TrandingAlbum..........
useEffect(()=>{
  if(!accessToken) return 
  spotifyApi.getAlbums(['4ejdjD4ByhxyBEFtlYWBcI','78zqKU9guNUoZFs7mn7TUG','3OUj9ygj2KRcnKY1a1daGt','0Z1zYMwJRpvq0d9rdqTOYo','6EaHaUoczRLrDl5uqxSFW3','7wgrW5XyZdtk0K8PkW5A7h','3Msv5MSxcayA4sbQpQhXzu','45ZIondgVoMB84MQQaUo9T','2vQ5KEbizfU3cc3vNBNb46','5ASFrellizlx98SmsItOEm','0o80h7hMTz2wjzJSvckOcr','48VomBCSqAsYmxI3C3TNSC','3T4tUhGYeRNVUGevb0wThu','1nAQbHeOWTfQzbOoFrvndW','7j8qYGuRyLFYmjv6hIEiXu'   ],).then((res)=>{
    setTrandingAlbums(
      res.body.albums.map((album) =>{
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
},[accessToken,spotifyApi])

// NewRelease.........
useEffect(()=>{
  if(!accessToken) return 
  spotifyApi.getNewReleases({country:['IN'],limit: 50}).then((res)=>{
    setNewRelease(
      res.body.albums.items.map((album) =>{
        return{
          id:album.id,
          artista:album.artists[0].name,
          title: album.name,
          image: album.images[0].url,
          uri:album.uri,
          type: album.type,
          release_date: album.release_date,
          album_type: album.album_type,
          total_tracks: album.total_tracks,

        }
      })
    )
  })
},[accessToken,spotifyApi])

// Artists.........
useEffect(()=>{
  if(!accessToken) return 
  spotifyApi.getArtists(['4YRxDV8wJFPHPTeXepOstw','0oOet2f43PA68X5RxKobEy','1uNFoZAHBGtllmzznpCI3s','1mYsTxnqsietFxj1OgoGbG','0y59o4v8uw5crbN9M3JiL1','1tqysapcCh1lWEAc9dIFpa','4vvW590Gq8dNWsP5BM9FkS','5f4QpKfy7ptCHwTqspnSJI','2oSONSC9zQ4UonDKnLqksx','70B80Lwx2sxti0M1Ng9e8K','61JrslREXq98hurYL2hYoc','1dVygo6tRFXC8CSWURQJq2','0GF4shudTAFv8ak9eWdd4Y','4K6blSRoklNdpw4mzLxwfn','6eUKZXaKkcviH0Ku9w2n3V']).then((res)=>{
    setPopularArtists(
      res.body.artists.map((artist) =>{
        return{
          id: artist.id,
          title: artist.name,
          image: artist.images[0].url,
          uri: artist.uri,
          followers: artist.followers.total,
          type: artist.type,
          popularity: artist.popularity,
        }
      })
      
    )
  })
},[accessToken,spotifyApi])


  return (
    <div className='relative flex-col py-3 space-y-6 overflow-y-scroll opacity-100 lg:-ml-3'>
{/* //Featured (playlist) */}
      <div className='flex flex-col gap-3 py-2 mx-4'>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>Featured Playlist</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll'>
          {
            featureds.slice(0,50).map((playlist) => (
              <div key={playlist.id}>
                <Featureddata playlist={playlist}
                />
              </div>
            ))
          }
        </div>
      </div>
      
{/* //Charts (playlist) */}
      <div className='flex flex-col gap-3 py-2 mx-4'>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>Charts</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
          {
            charts.length > 0 ? charts.slice(0,41).map((playlist) => (
              <div key={playlist.id}>
                <Playlistdata playlist={playlist}/>
              </div>
            )) :
            featureds.slice(0,50).map((playlist) => (
              <div key={playlist.id}>
                <Featureddata playlist={playlist}/>
              </div>
            ))
          }
        </div>
      </div>

{/* //Popular Album (album) */}
      <div className='flex flex-col gap-3 py-2 mx-4'>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>Popular Album</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
          {
            popularAlbums.slice(0, 20).map((album) => (
              <div key={album.id}>
                <Albumdata album={album} />
              </div>
            ))
          }
        </div>
      </div>

{/* //Tranding Now (album) */}
      <div className='flex flex-col gap-3 py-2 mx-4'>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>Tranding Now</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
          {
            trandingAlbums.slice(0, 20).map((album) => (
              <div key={album.id}>
                <Albumdata album={album} />
              </div>
            ))
          }
        </div>
      </div>

{/* New Release (album) */}
      <div className='flex flex-col gap-3 mx-4 '>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>New Release</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll scroll-smooth'>
          {
            newRelease.slice(0,50).map((album) => (
              <div key={album.id}>
                <NewReleaseData album={album} key={album.id} />
              </div>
            ))
          }
        </div>
      </div>

{/* //Artist */}
      <div className='flex flex-col gap-3 py-2 mx-4'>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>Popular Artists</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
          {
            popularArtists.map((artist) => (
              <div key={artist.id}>
                <Artistdata artist={artist}/>
              </div>
            ))
          }
        </div>
      </div>

{/* //sound of India */}
      <div className='flex flex-col gap-3 py-2 mx-4'>
        <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>Sounds of India</p>
        <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
          {
            charts.length > 0 ? charts.slice(42,50).map((playlist) => (
              <div key={playlist.id}>
                <Playlistdata playlist={playlist}/>
              </div>
            )) :
            featureds.slice(0,50).map((playlist) => (
              <div key={playlist.id}>
                <Featureddata playlist={playlist}/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Home;

