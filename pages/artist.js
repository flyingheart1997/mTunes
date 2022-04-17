import { useSession } from 'next-auth/react';
import React,{useEffect,useState} from 'react';
import Artistdata from '../components/Artistdata'

const Artist = ({spotifyApi}) => {

  const {data: session} = useSession()
  const accessToken = session?.accessToken
  const [indianNewArtists,setIndianNewArtists]=useState([])
  const [indianOldArtists,setIndianOldArtists]=useState([])
  const [smtpArtists,setSmtpArtists]=useState([])
  const [globalArtists,setGlobalArtists]=useState([])

  useEffect(()=>{
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  },[accessToken,spotifyApi])

//New Indian Artist
  useEffect(()=>{
        const artistId = ['1tqysapcCh1lWEAc9dIFpa','6LEG9Ld1aLImEFEVHdWNSB','2FKWNmZWDBZR4dE5KX4plR','4YRxDV8wJFPHPTeXepOstw','0oOet2f43PA68X5RxKobEy','3Nrfpe0tUJi4K4DXYWgMUX','0y59o4v8uw5crbN9M3JiL1','6FtZhorjCMfkaVJ7kKdmq7','1wRPtKGflJrBx9BmLsSwlU','1mYsTxnqsietFxj1OgoGbG','5DHi2MeoRgAwPE0A0qwRMl','2oSONSC9zQ4UonDKnLqksx','4W91bbPB2CTSsHwt7eqNl7','3eDT9fwXKuHWFvgZaaYC5v','5cB4d4jPYjMT326sjihQ4m','5f4QpKfy7ptCHwTqspnSJI','0LSPREIgGMZXCuKVel7LVD','4IKVDbCSBTxBeAsMKjAuTs','4fEkbug6kZzzJ8eYX6Kbbp','1sVmXkzX2ukc6QvasrDBES','0T1CMVkqffHlqEk4BcAph1','3yMmYEklQ7gLOZXEFNd3xr','5T2I75UlGBcWd5nVyfmL13','6wa1AsxB9oJP7lwNSmbcYx','4mBxoO0pAcMbAwuTcrcLMc','56SjZARoEvag3RoKWIb16j','6AiX12wXdXFoGJ2vk8zBjy','6aQfrWHwAcuY8IYItbChZh','0OS0NZnK7TGIAWx8MkWNFN','7qjJw7ZM2ekDSahLXPjIlN','5qERXbPWPdUePjrAW00vuU','2kkQthS9OLpK4UqNWYqoVl','5tJx4B5oBr1LJkkHI8GFYX','3ZxZ03fj3tXBZHZWzvaLSM','2LgKrgRJcbJlt14i1LTzDU','4zCH9qm4R2DADamUHMCa6O','3OLGltG8UPIea8sA4w0yg0','3xU8YsNNkmWSPewlB18NUz','6CXEwIaXYfVJ84biCxqc9k','6Mp7fezR1NJNc7tnybKo18','5kvGYraWFlXs2Jbt1Kphn8','4vvW590Gq8dNWsP5BM9FkS','4eB5clMaoi0cCRnCwLkkiS','1mUl05hT77FrwVFW51wOlr','78sIlhMniFgXlOrNWnPtIl','0sSxphmGskGCKlwB9xa6WU','4f7KfxeHq9BiylGmyXepGt','0kJO65h553i1iGsZutBuqz','0XL6ie7a0NY5FM05b9Rn5L','4oVMLzAqW6qhRpZWt8fNw4']
        
        if(!accessToken) return 
        spotifyApi.getArtists(artistId).then((res)=>{
            setIndianNewArtists(
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

//Old Indian Artist
  useEffect(()=>{
        const artistId = ['4qWXi8Qj92dQOEJihdVqjI','3gBKY0y3dFFVRqicLnVZYz','70B80Lwx2sxti0M1Ng9e8K','3bKcHYt6tcRvRMsrNqiJBm','1HGMG8RHvcu1mfdM9MeTek','4K6blSRoklNdpw4mzLxwfn','5as8A4G47Ohu9NSWs3Je8U','77MQhYJ01hRivFGS5hXjTY','2cBRlqOkrQ235s2S0emjj0','1dVygo6tRFXC8CSWURQJq2','2JSYASbWU5Y0fVpts3Eq7g','4hkB2bR5ek6lJChj6aunCn','5ObQXIcqKtQENK14lQyqiy','2ZRrPOjBIWoKK5rHedLijj','71hjb5G92mGoKRSAW3Cj00','3vXBH4XwXSLM1YIrRBt98k','4Qpbhxe0sO2zhvUVfODdZw','03SZmfKAgYRQKUwy0EoJUa','7yHyOAxXo6KpKzuN6M2A8Y','4kcoiVXIxvUoLUoHY1vJYU','0gXDpqwYNDODn7fB0RDN8J','0GF4shudTAFv8ak9eWdd4Y','6ng9wPM6EcywZyTLrZIcYB','7FgeUHGmFcoduuYGlwPhkW','7FNgTuxh3LCWiozdKmUwRk','2jqTyPt0UZGrthPF4KMpeN','6nAVJkZZ55jorZmO5bpezv','02Um2HIOrUdsy3wqPBZwsj','0QsbYX8XslSSUcztc6u4pO','4IAzaE7sRxds3euJerbqri','1omGHCXLJ1lC4xAH1BHVnn','43HtIGYO7tBOdUD7Fh77Y5','6DJIc5e4tmfVMoZh7IT35N','4RrifbFhaYyQ2qlYFeWzOL','5b2AZyRAZ1hGCSJnx9xWV3','4etv0ut4ws0GbXBtolzf5e','2ijWbN5KykTYiBoVmhzCTU','0Ury0QIiBOlJmsdYUiCTfQ','7BRrGPZpag7ytO4HhPN03L','1JE6HNFhYkqW9OG9dpH1R9','0lzhlb4hBZjcjQDYdbASUz','7guD32ltIhsA1tHdf7IVe0',]
        
        if(!accessToken) return 
        spotifyApi.getArtists(artistId).then((res)=>{
            setIndianOldArtists(
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


//smtp Artist
useEffect(()=>{
    const artistId = ['2GoeZ0qOTt6kjsWW4eA6LS','1BYjhAClGpBTLZfics0VRZ','19LIHDDSHBD5NyYHI3gpzB','43iOhUGMAnS6QbPEUYqkpg','7uIbLdzzSEqnX0Pkrb56cR','2RlWC7XKizSOsZ8F3uGi59','5rQoBDKFnd1n6BkdbgVaRL','7qHsapL39aTQsPhixtzVvy','1rdQOMFFtoskDXXUVjiGo9','3xZnxcyeC0vVaJvEA9VqrA','7gOZcXPfLtLbFgUyHGV7cZ','3cqeO3muWIW5uSmUDNCmyT','1T7MiVJ2MJlR5GKi11w4VT','5hT3CHUnrkUFsgGAvEPSQC','5zWKMBKw7KqulFxyz2ULvp','2ijWbN5KykTYiBoVmhzCTU','1dqPqXbxxYtCtLbKeAN2Ss','5yoqPvofOHrBc3Z6VZyTsj','7AKO4PWJ6ToZVUfA5xmsIY','6TRcwPQiddMiQ6H22iwnoG','55kkrbuMkdzPGD7YGA6xrJ','0TxBLummgAxRkxn21HrLDp','1wVbdx5kuHQgBfjiq4bwh3','0DyXyd0D6fMUsuD6yONANx','2P9JaCtpbQSuZOgvtPrUJ8','6wmETiZFS8CviwUTaeoVgf','3nQ125TJobosBH446Dsvvv','4FMGD43a8aLM0LRKXDSXne','0yRC5n90spXG0d3aiDQ0vB','0w1zspBrCXnMx8CcB1WR31','4ITkqBlf5eoVCOFwsJCnqo','2JEjaa7hWhE1BbL3OcoeFR','1SJOL9HJ08YOn92lFcYf8a','2IUtwMti1OiT3lkW6RubgH','0PykiHCcDsMPRV7s67qZ1B','2wPsNCwhEGb0KvChZ5DD52','5eq2uN2yinN4ZJezM2N9Gm','2SrMwYFxsZjEQSl8sVMu3P','6MoG33ssSzwwE3YJS4e6hu','2K4pcxTMiwnKoVvdAr5pwD',]
    
    if(!accessToken) return 
    spotifyApi.getArtists(artistId).then((res)=>{
        setSmtpArtists(
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


//GlobalArtists Artist
    useEffect(()=>{
        const artistId = ['06HL4z0CvFAxyc27GXpf02','1uNFoZAHBGtllmzznpCI3s','0LnHdW6HMPoOlNdhG3DHjE','3fMbdgg4jU18AjLCKBhRSm','0EmeFodog0BfCgMzAIvKQp','6eUKZXaKkcviH0Ku9w2n3V','5L1lO4eRHmJ7a0Q6csE5cT','1YnW3KicGQq3zD9LcdGJSh','1Xyo4u8uXC1ZmMpatF05PJ','3TVXtAsR1Inumwj472S9r4','4dpARuHxo51G3z768sgnrY','7dGJo4pcD2V6oG8kP0tJRR','6jJ0s89eD6GaHleKKya26X','246dkjvS1zLTtiykXe5h60','5pKCCKE2ajJHZ9KAiaK11H','6qqNVTkY8uBg9cP3Jd7DAH','6tbjWDEIzxoDsBA1FuhfPW','6l3HvQ5sa6mXTsMTB19rO5','4q3ewBCX7sLwd24euuV69X','7tYKF4w9nC0nq9CsPZTHyP','26dSoYclwsYLMAKD3tpOr4','26dSoYclwsYLMAKD3tpOr4','31TPClRtHm23RisEBtV3X7','5YGY8feqx7naU7z4HrwZM6','74ASZWbe4lXaubB36ztrGX','66CXWjxzNUsdJxJ2JdwvnR','7uEUsj7V7s9u1Dx8mLZdLl','0UEP2XBR9aC5NBKcAKnBIq','3zDRCqOhJXJfS2YWOEwGMC','0fA0VVWsXO9YnASrzqfmYu','0k17h0D3J5VfsdmQ1iZtE9','00FQb4jTyendYWaN8pK0wa','7n2wHs1TKAczGzO7Dd2rGr','1l7ZsJRRS8wlW3WfJfPfNS','4MJZBb8KABfKw0gzfgacpO','4z6yrDz5GfKXkeQZjOaZdq','1xHQO9GJIW9OXHxGBISYc5','2IWAyq4Hd0rT9lbDDI3u1y','6UbmqUEgjLA6jAcXwbM1Z9','4AGwPDdh1y8hochNzHy5HC','4bpY9pKx3mCQXZFO4RqsDb','5JMLG56F1X5mFmWNmS0iAp']
        
        if(!accessToken) return 
        spotifyApi.getArtists(artistId).then((res)=>{
            setGlobalArtists(
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
        <div className='relative flex-col py-3 space-y-6 overflow-y-scroll lg:-ml-3'>

            <div className='flex flex-col gap-3 py-2 mx-4'>
                <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>Artists</p>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll cursor-pointer'>
                    {
                        indianNewArtists.slice(0,50).map((artist) => (
                            <div key={artist.id}>
                                <Artistdata artist={artist}/>
                            </div>
                        ))
                    }
                </div>
                <br/>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll cursor-pointer'>
                    {
                        indianOldArtists.slice(0,50).map((artist) => (
                            <div key={artist.id}>
                                <Artistdata artist={artist}/>
                            </div>
                        ))
                    }
                </div>
                <br/>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll cursor-pointer'>
                    {
                        smtpArtists.slice(0,50).map((artist) => (
                            <div key={artist.id}>
                                <Artistdata artist={artist}/>
                            </div>
                        ))
                    }
                </div>
                <br/>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll cursor-pointer'>
                    {
                        globalArtists.slice(0,50).map((artist) => (
                            <div key={artist.id}>
                                <Artistdata artist={artist}/>
                            </div>
                        ))
                    }
                </div>
            </div>
         
      </div>
    )
}

export default Artist
