import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import { CgPlayBackwards, CgPlayForwards } from 'react-icons/cg'
import { FiPlayCircle, FiPauseCircle } from 'react-icons/fi'
import { debounce } from 'lodash'
import { ImVolumeDecrease, ImVolumeIncrease } from 'react-icons/im';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import { useRouter } from 'next/router';
import SpotifyPlayer from 'react-spotify-web-playback';
import moment from 'moment';

export default function Footer({ spotifyApi }) {

  const router = useRouter();
  const { data: session } = useSession()
  const accessToken = session?.accessToken
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const [seek, setSeek] = useState(10000);
  const [next, setNext] = useState(null);
  const [trackInfo, setTrackInfo] = useState([]);


  const duration = trackInfo && trackInfo.duration ? moment.utc(trackInfo.duration).format('mm:ss') : '00:00';
  const progress = trackInfo && trackInfo.progress_ms ? moment.utc(trackInfo.progress_ms).format('mm:ss') : '00:00';

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken, spotifyApi])



  useEffect(() => {
    if (!accessToken && !currentTrackId) return
    spotifyApi.getTrack(currentTrackId).then((res) => {
      setTrackInfo(
        {
          id: res.body?.id,
          title: res.body?.name,
          artist: res.body?.artists?.map(artist => artist.name),
          artistId: res.body?.artists?.map(artist => artist.id),
          image: res.body?.album?.images[0]?.url,
          uri: res.body?.uri,
          url: res.body?.external_urls?.spotify,
          duration: res.body?.duration_ms,
          albumId: res.body?.album?.id,
          progress_ms: res.body?.progress_ms
        })
    }, (error => { console.log(error); }));
  }, [accessToken, spotifyApi, currentTrackId, setCurrentTrackId])

  // playSongs.........
  const playSong = () => {
    try {
      spotifyApi.getMyDevices().then(res => {
        const deviceId = res.body.devices[0]?.id;
        spotifyApi.play({
          device_id: deviceId,
        }, (err, res) => {
          if (err) return alert(err, 'Please try again')
          setIsPlaying(true);
        })
      }, err => { alert(err, 'Please try again'); })
    } catch (err) { console.log(err); alert(err, 'Please try again') }
  }
  // pauseSongs.........
  const pauseSong = () => {
    try {
      spotifyApi.getMyDevices().then(res => {
        const deviceId = res.body.devices[0]?.id;
        spotifyApi.pause({
          device_id: deviceId,
        }, (err, res) => {
          if (err) return alert(err, 'Please try again')
          setIsPlaying(false)
        })
      }, err => { alert(err, 'Please try again'); })
    } catch (err) { console.log(err); alert(err, 'Please try again') }
  }


  const adjustVolume = useCallback(()=>
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch(error => { console.log(error) })
    }, 300), [spotifyApi]
  )

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      adjustVolume(volume);
    }
  }, [volume, adjustVolume])

  return (
    <div className=' h-[15vh] w-screen px-2 bg-neutral-900 col-span-2 space-y-1 items-center bottom-0 mx-0'>
      {currentTrackId ? <>
        <div className='flex flex-row items-center justify-center gap-2 py-1 text-slate-400'>
          <p onClick={() => router.push({ pathname: '/albumdetails', query: { id: trackInfo.albumId } })} className='flex font-normal tracking-wider truncate cursor-pointer hover:underline md:-ml-7 text-slate-200'>{trackInfo?.title}</p>:
          <div className='flex flex-row gap-1.5'>
            <p onClick={() => router.push({ pathname: '/artistdetails', query: { id: trackInfo.artistId[0] } })} className='flex text-xs tracking-wider truncate cursor-pointer sm:text-sm font-extralight text-slate-400 hover:text-white hover:underline'>{trackInfo && trackInfo.artist ? trackInfo?.artist[0] : undefined}{trackInfo.artist && trackInfo.artist[1] ? ',' : ''}</p>
            <p onClick={() => router.push({ pathname: '/artistdetails', query: { id: trackInfo.artistId[1] } })} className='flex text-xs tracking-wider truncate cursor-pointer sm:text-sm font-extralight text-slate-400 hover:text-white hover:underline'>{trackInfo && trackInfo.artist ? trackInfo?.artist[1] : undefined}{trackInfo.artist && trackInfo.artist[2] ? ',' : ''}</p>
            <p onClick={() => router.push({ pathname: '/artistdetails', query: { id: trackInfo.artistId[2] } })} className='flex text-xs tracking-wider truncate cursor-pointer sm:text-sm font-extralight text-slate-400 hover:text-white hover:underline'>{trackInfo && trackInfo.artist ? trackInfo?.artist[2] : undefined}</p>
          </div>
        </div>
        <div className='bottom-0 flex items-center justify-between grid-cols-3 '>
          <div className='flex items-center justify-center space-x-1 w-[20%] -mt-1.5'>
            <Image className=' rounded-[2px]' src={trackInfo?.image ? trackInfo?.image : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'} alt='image' width={60} height={55} objectFit="fill" />
          </div>
          {/* <span className='text-neutral-400 text-[10px] md:text-sm pr-4'> { duration ? duration : undefined}</span> */}
          <div className='flex flex-col items-center justify-center space-y-3'>
            <div className='flex items-center gap-2 md:gap-3'>
              <i onClick={() => spotifyApi.seek(seek) && setSeek(seek - 10000)}><CgPlayBackwards size={25} className='cursor-pointer text-slate-500 hover:text-white' /></i>
              {/* <i onClick={()=> spotifyApi.skipToPrevious(next) && setNext(currentTrackId-1)}><TiMediaPlayReverse size={25} className='cursor-pointer text-slate-500 hover:text-white'/></i> */}
              {isPlaying ? <i onClick={pauseSong}><FiPauseCircle size={35} className='text-white cursor-pointer' /></i> : <i onClick={playSong}><FiPlayCircle size={32} className='cursor-pointer text-slate-500 hover:text-white' /></i>}
              {/* <i onClick={()=> spotifyApi.skipToNext(next) && setNext(currentTrackId+1)}><TiMediaPlay size={25} className='cursor-pointer text-slate-500 hover:text-white'/></i> */}
              <i onClick={() => spotifyApi.seek(seek) && setSeek(seek + 10000)}><CgPlayForwards size={25} className='cursor-pointer text-slate-500 hover:text-white' /></i>
            </div>
          </div>
          <div className='flex xs:w-[25%] w-[30%] flex-row items-center justify-center space-x-2 '>
            <i onClick={() => volume > 0 && setVolume(volume - 10)}><ImVolumeDecrease size={18} className='cursor-pointer hover:text-white text-slate-500' /></i>
            <input type='range' onChange={(e) => setVolume(Number(e.target.value))} value={volume} max={100} min={0} className='h-1 w-[50px] sm:[70px] md:w-[100px] cursor-pointer ' />
            <i onClick={() => volume < 100 && setVolume(volume + 10)}><ImVolumeIncrease size={18} className='cursor-pointer hover:text-white text-slate-500' /></i>
          </div>
          <div className='hidden h-10 cursor-pointer w-14 bg-slate-500'>
            <SpotifyPlayer
              styles={{ bgColor: 'rgb(23 23 23)', color: 'rgb(100 116 139)', sliderHeight: '0px', sliderHandleBorderRadius: '0px' }}
              token={accessToken}
              syncExternalDevice={true}
              offset={0}
              syncExternalDeviceInterval={5}
            />
          </div>
        </div>
      </> : <div className='flex flex-col items-center pt-8 text-2xl md:text-4xl text-slate-400 animate-pulse'>Please Play a Song</div>}
    </div>
  );
}


//'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'

