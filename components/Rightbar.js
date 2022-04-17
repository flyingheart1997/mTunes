import { useSession } from 'next-auth/react';
import React ,{useState,useEffect} from 'react';
import { useMediaQuery } from 'react-responsive';
import RightbarItems from './RightbarItems'

const Rightbar = ({showComments, setShowComments,spotifyApi}) => {

  //conditional rendaring start
  const isDextop = useMediaQuery({ query: `(max-width: 1023px)` });

  useEffect(() => {
    if(!isDextop){
      setShowComments(true)
    }else{
      setShowComments(false)
    }
  }, [isDextop,setShowComments])

  const {data: session} = useSession()
  const accessToken = session?.accessToken
  const [songs, setSongs] = useState([])

  useEffect(()=>{
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  },[accessToken,spotifyApi])

  useEffect(()=>{
    if(!accessToken) return
    spotifyApi.getMyRecentlyPlayedTracks({limit:50}).then((res)=>{
      setSongs(res.body.items.map((track)=>{
        return {
          id: track.track.id,
          name: track.track.name,
          artist: track.track.artists[0].name,
          artistId: track.track.artists[0].id,
          album: track.track.album.name,
          image: track.track.album.images[0].url,
          uri: track.track.uri,
          duration: track.track.duration_ms
        }
      })
      )
    })
  },[accessToken,spotifyApi,songs])
  // filter songs........
  const song = [...new Map(songs.map(item => [JSON.stringify(item), item])).values()];
  
  
  return (
    <div >
      {showComments &&
        <div className='right-0 items-center flex w-0 h-[75vh] '>
          <div className='fixed  right-0 flex text-white bg-black overflow-y-scroll w-[56%] md:w-[35%] lg:w-[20%] rounded-lg opacity-100 h-[74vh]  lg:mr-1' style={{border: '0.5px solid gray' }}>
            <div className='flex flex-col'>
            <div className='fixed shadow-emerald-900 shadow-sm z-10 flex py-2 rounded-md -mt-[5px] md:mt-0 w-[55.7vw] md:w-[44.7vw] lg:w-[19.7vw] bg-stone-900'>
                <p className='py-1 pl-2 text-xl font-bold tracking-wider text-white'>Resently Played </p>
              </div>
              <div className='flex flex-col items-center justify-center mt-16'>
                {
                  song.slice(0,50).map((track) => (
                    <div key={track.id}>
                      <RightbarItems track={track} spotifyApi={spotifyApi}/>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Rightbar


