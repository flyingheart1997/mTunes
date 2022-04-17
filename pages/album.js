import { useSession } from 'next-auth/react';
import React,{useEffect,useState} from 'react';
import Albumdata from '../components/Albumdata'


const Album = ({spotifyApi}) => {

  const {data: session} = useSession()
  const accessToken = session?.accessToken
  const [indianNewAlbuma,setIndianNewAlbuma]=useState([])
  const [indianNewAlbumb,setIndianNewAlbumb]=useState([])
  const [indianNewAlbumc,setIndianNewAlbumc]=useState([])
  const [indianNewAlbumd,setIndianNewAlbumd]=useState([])
  const [indianNewAlbume,setIndianNewAlbume]=useState([])
  const [indianNewAlbumf,setIndianNewAlbumf]=useState([])
  const [indianNewAlbumg,setIndianNewAlbumg]=useState([])
  const [indianNewAlbumh,setIndianNewAlbumh]=useState([])
  const [indianNewAlbumi,setIndianNewAlbumi]=useState([])
  const [indianNewAlbumj,setIndianNewAlbumj]=useState([])
  const [indianArtistAlbum,setIndianArtistAlbum]=useState([])
  const [indianNewArtistAlbum,setIndianNewArtistAlbum]=useState([])
  const [worldAlbuma,setWorldAlbuma]=useState([])
  const [worldAlbumb,setWorldAlbumb]=useState([])
  const [worldAlbumc,setWorldAlbumc]=useState([])

  useEffect(()=>{
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  },[accessToken,spotifyApi])

//New Indian Albuma
  useEffect(()=>{
        const albumId = ['1r0ppsNcX73W5WNPT0yCrM','5fSvW3ie7cwECAt9h9pgQl','4WSLvIQ3Q6vhYQIxXi7mn8','4iFurFyAPhOlzwQTc5aXN2','7pv1g7oSCc9aT7nx1xDUJ3','7vuWNVdv7zSwgHJ7qx26O4','5oZttbNRyrYfBLhej6HAY7','3xibPOaQf8YZySMfUzgyxz','6XNvsL1V3b1jB5qQnmLOeI','4EcPtS9idSB8zy98Cl5yEf','4lydrnVdmsWCMMfk0S8Khj','4IfrN0wja84AWvgT68KCtX','67FATbnVWtXgD9TF6OGb3P','5vmoA7Oe9V6E9XTScDmH7A','7aVTue3zqr3WvHs2ex65jl','6FSQrcxjBOKk6e3ysjlf7d','0A6lrg0WAWB4yVNWlh4cvm','2OPvJhDyy9YvHJT3xt7Zwh','6o9ysd0MFQXd6g4eWtcvNq','3BdVJ7kB8AdPN4HD35dE7X']
        
        if(!accessToken) return 
        spotifyApi.getAlbums(albumId).then((res)=>{
            setIndianNewAlbuma(
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


//New Indian Albumb
    useEffect(()=>{
      const albumId = ['71WErS8E8fXb3dvFuVCaKy','281SmfhMWT4OPQvlUthafC','0CkMSLqE73UxkDdF2zGMeO','63lBv9s04GUyLauBiGCPI0','6ffYI02SEVQbb3qRgdpJGk','634XiL0HdManH26qduu9Xw','0hUmPPMsBJpU4qWB8HYae9','57PZ81n80Hwh4fNLdsx7vp','46wxX6YUz9XCqf8pslSYsq','01o6a3aUODtx67UiWJnABf','6xRw7gpSUzP3Elh22G13Bv','1f7Co3C4ToGq6Oi0ehWuuR','0czPRsN8uZZ5o3J8usUHbR','0Rz5sEK5x1qzlKsGxwlxGK','3dDiyG5itQKGiA8uXBGpo9','0BsAtQgtYtnVPPs0v9UO0n','7ypfdQ9KvJb9NizV0dqh8y','7wpHACu3kbSDAjZ5IlKAZf','6NiIEKpKQaWY16PwCfbS5V','0f2xPK8OfePeVTatpUETqc']
    
      if(!accessToken) return 
      spotifyApi.getAlbums(albumId).then((res)=>{
          setIndianNewAlbumb(
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

//New Indian Albumc
useEffect(()=>{
    const albumId = ['7D1e4SHtUU145PYbUiZ4F7','6VHOqyXT5UHvJJQAPjSWH9','79fwbrb205ZUf5E0pnoAsA','1CYv9CMnI9SaXKBAFpLT5e','3FbSTiZTqp13YPBLlzAJlQ','6hIef0WDHP7AuYPVnOslXG','4ZKcDygV1WUTj7bzMPAvQq','4oadpQWwmbmWbitMB0c45p','6vi0HnekV5nuzXB96NOAEL','64QW3ska25JkTfqRarWJtj','5N4fOPxEFCzXy9GXnTJh09','1G9n0qTUFeg2gETElrnKRa','1GfJGg83IGM5TQz400PF3P','5lmcmry7Mynwt2GSCJHQcV','4Ix5gLPk0YsfyVibvhjS7G','3JdE4IkqObXwTWzYKieCUv','1oCLVtTPK1uzVFdCwIsFtS','67KkBoft7iHVV4hKbKCZ24','0iz9LObrz6ptTzhDgj0Tnm','2qBCmDv2UTmyzFc10SrAIf']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setIndianNewAlbumc(
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

//New Indian Albumd
useEffect(()=>{
    const albumId = ['2LVlWeFFNjnJ0cmZxjHqLY','3ZoJ0hWDnyQFXT2eMrQkvK','2FeTXpBk0e2YGAyne1BU2u','6HMkfO7jSa2379v4rvoRBc','699FFq1pzgslYQsO614ujk','0X2vFu6wz5sh3dVP1YQ2nB','0LGR5dE3CPMpx1qiTVIH5B','0mIRPMuJTXqtrMhGmQPp5P','5FDNWVb0fAkf1WaheLbJ0T','2oQfRQemjH9MdcztNY9KxT','4gay2e6Pt8tEE9EkGrtJAT','2sOY8gdS20mYqgNvLgE4xz','6p0K5M1Lv0yI2C9rwm6HKG','0bFaY7cZX7DZrIttT0fz9E','4NE9zDS6aR0fwgydCPHbbb','4zmXJoIp3zLgrSt0clM2V3','0g7bUUkkgKU8KwGdomptLQ','2lwV6WC1g6mr2BpJxEKb2M','4JdXNNA7r8dlnyHA8GpCfB','7xGKyVal3b5vjgdg2CUCrs']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setIndianNewAlbumd(
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

//New Indian Albume
useEffect(()=>{
    const albumId = ['2XX8DrZ2YbrSBk3T4QMnMH','2vWeXssJfPI3wZUfiMN2ZX','6T8oJ9DnuJZAT3gDe507cO','4j30iRc6XXxADk1n71duMS','0PwyeMk8VI3lU5GFWddYHO','5NqrmK0vDRxeOec6GWJHn2','0VL0XINwpFeZZZthg65ASA','03JzCU3h6duPJg4EcMfmCe','0USwnMPSrUzgaBV6DyMGlX','1IPikyClnzLQaccB1COGJc','2jXMtkLalkHDHAcO1uw3qt','2GCv8yEivMVlNtGk5Ry2gL','3oBgmkaKhFwt7ZGihmBJ0C','2fdpnlDrDYgSEUgB6wKtYT','6c5055Xwr88YfPDCEZiOIA','2qKfETE3WOtEghhX07DR4L','0sem7N8w59c2I0bVlp9zNI','28HBnGZa19Ybqe6R1uCsZH','2akFUrbaytFqCfdVrF51HZ','5ekt1T35HRBYD7pzTqWXXq']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setIndianNewAlbume(
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

  //New Indian Albumf
useEffect(()=>{
    const albumId = ['5xjaz957o6YGSXmlfd2tex','1Ekdlu676aj6F9lDUcl7ht','0CfAXmULqKq6KVJMsLGGAX','3AOsECXl6Yb71JYBBxvQsD','4Tm5PfvhoU8ZAkmHYvEzIN','3m5FIubiCHr9mH3BU7ngY4','4OYdTHNgjhXzgVjbqsb0tO','1Q9pYTcpVfz0eJTZZczELy','1Q5RHgCR1iKzaZzJurDKEK','2Lxoc72vRTGdQfMvj7Ovi1','1ohkvucTkkYWvMolCLugHs','0A8wkowCQsA9pP66ZfKINg','1WH3qVIik020rTGTAgUdRY','0C4j07kqyaF5WR5MXiRpz8','3Ip9JCpT1IF9GvhAxzufTH','3sM5sQG6P6CUkUyfS3Fu0G','5Wu8jtO6OGVU6ILj4jIIkl','6OPaPfgLzRn30767pjwfY3','0VNWhBLqBKn9ZDNzeKCRS3','5R0EsoxxqsmxdJEuM1JPFd']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setIndianNewAlbumf(
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
  

  //New Indian Albumg
useEffect(()=>{
    const albumId = ['60Omt7taTKwehAq1gETKCW','5N6S7oSEBqylCOQfulFwCX','6Baavsh6HfNka1IyvPrr24','4u7WFjehsC5sUibLEOaqLf','1P8eifMN4WiKEXtptCBwJQ','6Wu6m82JvVQvsa3kRhRebR','7J5iE51Mk97Mf0BjjwYXUZ','10rOE05XbfEohr0AmKaBzW','0VE1rUN3ehffFy9yjjnv3M','5Y6N5LyyR6HiDkoCNVD0UT','7CJJOmeba9pllcb3ma3h7b','0XGCL8zBp3Ncw7bqmzyzu9','6Ksu78BuCGonwiGTFeoxjW','2sb8fpcIweO45QMQIBO2ip','4QdiBnL3sB4fZ4cT0rg5k4','0Wtm0w4UXe2mqM0Ojbefg6','0JmzVnBJdJs0qMLn23fREO','7kHZdUygrwvLf9su1SjINW','5kLMrZCuDaS3QCpcRsSJk7','2eNPFiGtGeP2ySbIGxSb58']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setIndianNewAlbumg(
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

  //New Indian Albumh
useEffect(()=>{
    const albumId = ['007elGpKyE3OjvuQTxn303','3MbBbXl9AnPIXffDCAaNQ8','73tWMlbeLPpjXH62u50zbN','6WUmewgcTowgtuuXV1a7gA','4MdabzvbKjinp4ImDgMTd5','4AyGMWLHvkZiBniFBvTw8F','4Q9hzMKWB7qSAduQrdArjo','0T5kxD9jc3LKIEFVMDpFft','6HYp2yulQUYrEb1RvLfMj8','1nF6vpQNYvynaz60bL2Opi','6eZDaasMpggsXPD3FOrYog','3XJ89AoGTlTzsnhMSRAz5n','4d6YYJjPJCfaDyLG5jQOdi','7cdifNVELpnuIBzO4fIdlC','6WZgvKQUQhObbHZiAGAtzR','6bGGJNbUKjSEofV2mIp7vs','4f9zzG62c57RmgIxpr0nf2','49g8Aqji0Lw9rTeI5Av4Va','39EvXHZcWs9X8o0sfnQhRR','69ySdutHwc0ceKARgwTI6I']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setIndianNewAlbumh(
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

  //New Indian Albumi
useEffect(()=>{
    const albumId = ['67XaOJncxS4gzPbmaz42gs','4ZzUxs4ap6MCHi4uMZmOvw','0h20WlK2aV50wsthokWcm0','7bJJpZ7GMXxJlM4bZv1brZ','0WHkeTAdPr0OBy0rKEKhIv','2FqhUzYIswLaEtb4BcZZdr','2bchdQmbGl8Ed3jgXoct5s','2quFMIrXOzuCBs9t2Rs5TE','24QRpt2JtTr76etVIutFMV','31IhC0vc5vuC7h98RNK08G','2RR0yUah8ujuzBqOTAP6sZ','0Dm1z9FuEvgNHHNI5bquQZ','17iBviSh9zXYSUXwfX7DzD','79oOga8kEjlM5LtI5ptq89','4rMDvLrCzujtrqPRTvfIMk','4B7x36K07hhRNroQoHnJts','3WHIiM2LNNdUsrY7mLyknm','7zDbRVfHFjw7RqSIOedXWM','5hSGSJCvy95Y7MHtkgZWhY','0YjnJmLlKAErK4Z82Ys5fR']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setIndianNewAlbumi(
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

    //New Indian Albumj
useEffect(()=>{
    const albumId = ['6kn2kSQZ70NDqytoGgynAd','5RmWurh8800rBbNd7XDg5q','3fQckQXe1ALaUUKadI39dX','0RjcIk15e2woEI1LZNSSZN','4FHycMJBnRr6zMGGezayBG','0BlkVjtL4zUl2AxvfNmS2j','6cUpPgGveQOFp1BtHSHLPr','1z0c7YfDJo3QllOsTaOSHj','5KzDHdVQSRtdVp7yL1qQyr','5C41YB9AajI8EMroBUAvEd','6wGEpTjzw96BwEH4Jn1SHD','3AN7ulWT3ef5cjqSdzminC','6Zbji2httgW34R8tyNGAF8','4BX1FMnIIADMecgwSYPXy3','4m1MQcsNVhRvGOeynk0cPO','5PAmXuLRmvmrVDxoH12VWq','2Mm73kUod685vQnNVAjSBV','1TaHs1t20CmVHmrGB2FEQk','0AH0VkpryPGN3DdPLYqYyL','1qN6A2PnnlD98HhtTrzmd9']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setIndianNewAlbumj(
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

//IndianArtistAlbum
  useEffect(()=>{
    const albumId = ['0cPqV7ANsEL2kF0CDBf5Kv','5zOQcWFM4kDlS3OmeOKuxv','6mzpHrvDFCsiz7ZbPjlq3S','52BTyxPuYaCtwH3QpP5Zt5','5Mz7uZt7yAnIPpPebxpEE0','4Fs8UXx3ly4ekZp86BGLQc','5ofwPAiVnnBvBJrGTloj4S','4VaDbYspkLVgbZTXVNXqE6','33ZFKdU27Z3TiJcHhtNpob','3pixzWRcN4SA27UFb4oxRp','4JzgZDDmPu8iSHjanWa3vg','0LVMI64BPt0IRrDd1XuWkG','1CYgfCo3ZTip0gbqZywFzq','5pfd8NzcyP0hwJB9aaDGRv','7o0JYpcdfqQcMOufBCSWou','4FiDiSLBXfwDARL4v8kRWu','5fDEOcPDOOGktsxwITmGe1','3SUTLIH5IEhYK6Gpv7rtad','61LcmfbrgF6cTAbKXJFOav','5RY12a6eBoGDzudqjTrDvP']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setIndianArtistAlbum(
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
  
//IndianNewArtistAlbum
  useEffect(()=>{
    const albumId = ['2SrNQXb8bmifWwKxLDWpvy','6Mwut6BYqsL6WrhC1u3I06','3h1ueycZjFRmQmMgXTzSEO','0TKg5tmAFIIC6iytdXXiM2','3tG0IGB24sRhGFLs5F1Km8','43EA0oRUQfRVjjz0xfFxH5','6peCIjlKHw5WZI7dQ3DkJK','0rIS63ow4UkEN3Efc4qhk8','1hHawSufyrfHJV7pNxGUaL','7z4b1OGfroiNLqYCx6HQLD','4KJrQOxaPxWailz2ANzFCZ','1RNb1kwVUmpsCb0ncWeuKJ','0XwNnuUDcEqoRvXiQGsPiV','1koNJ2lJtuw9BAINiM5ifu','2TOOKm1jBEz42QWeHeDgXj','7p3dPNdscUSW8UMFO16hTS','6h6aMcr95uth7NvFFubZCh','4jvqY6y93hdMJkBnKc8NbN','4KqHaKbLBjAWtIlO3zlng9','5Y3ga8SaTsDJDFPPGPSn2o']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setIndianNewArtistAlbum(
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
  
  //WorldAlbuma
  useEffect(()=>{
    const albumId = ['3vyyDkvYWC36DwgZCYd3Wu','2gNPnKP1PDkB5SZz3IMKuX','21jF5jlMtzo94wbxmJ18aa','6TVfiWmo8KtflUAmkK9gGF','3pLdWdkj83EYfDN6H2N8MR','5duyQokC4FMcWPYTV9Gpf9','58ufpQsJ1DS5kq4hhzQDiI','6t7956yu5zYf5A829XRiHC','2kAqjStKcwlDD59H0llhGC','01dPJcwyht77brL4JQiR8R','3r5m8utqRZYJnpep7xxVyq','3KHPqtzQKRPKup29xEQWtg','11QKDc8OK4rnD3uBs7wKmR','5awrJZBt3rP9RO5hlYdZB0','66IXFg1AukADK41CP0xANr','2D4OJpTUpKLIyVHi1upoUj','6ehm0SMBBoSxH8oSrFXre6','1Scgivd40jqSf5QybT3Itq','7oiJYvEJHsmYtrgviAVIBD','3TJz2UBNYJtlEly0sPeNrQ']
    // const albumId = ['5aNTcwyLFcvO38BoVFvphs','3KcdEPvk6a5buQJLVufb0h','0xbQj78GnleQWq1BRQhIvs','6MphVWpj44wVTQ8d9yIoZ8','4zBa7qnn1jBEfpY7bm6uNT','1MPAXuTVL2Ej5x0JHiSPq8','4sLtOBOzn4s3GDUv3c5oJD','6Vip5A5NmEazvKuxj6GLYf','7e8DUDFqGg0H7troT6bDJo','39ygqv9nLogi5twQtNopF0','666d9PNXmiyefgWdJpZbgG','3JSWZWeTHF4HDGt5Eozdy7','7i2YLTVQ0dyngRuUqtGmr9,'5RypFF6rN9MUxFe4aAWA28','6DlCl3hBP1Gwhn0tgitGfN','4kmfbb949LURgQneVOs78h','1vA0EaXRAYS09mishgGhJa','11UN1E1c9WNW1KTWNUYc4m','7DMyQuDPe8xzjC0UDSDa96','3e91QRkfMkbIDBwH4X7n8s']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setWorldAlbuma(
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
  
//WorldAlbumb
  useEffect(()=>{
    const albumId = ['5aNTcwyLFcvO38BoVFvphs','3KcdEPvk6a5buQJLVufb0h','0xbQj78GnleQWq1BRQhIvs','6MphVWpj44wVTQ8d9yIoZ8','4zBa7qnn1jBEfpY7bm6uNT','1MPAXuTVL2Ej5x0JHiSPq8','4sLtOBOzn4s3GDUv3c5oJD','6Vip5A5NmEazvKuxj6GLYf','7e8DUDFqGg0H7troT6bDJo','39ygqv9nLogi5twQtNopF0','666d9PNXmiyefgWdJpZbgG','3JSWZWeTHF4HDGt5Eozdy7','7i2YLTVQ0dyngRuUqtGmr9','5RypFF6rN9MUxFe4aAWA28','6DlCl3hBP1Gwhn0tgitGfN','4kmfbb949LURgQneVOs78h','1vA0EaXRAYS09mishgGhJa','11UN1E1c9WNW1KTWNUYc4m','0qsYDEy07zuPoktEHLsaiv','28XwqM10O64bIc7TsPzImp']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setWorldAlbumb(
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
  
  //WorldAlbumc
  useEffect(()=>{
    const albumId = ['141Pzpc3lx42ifkJTCHf3Y','3WPr3e2yvKTjNS2JJi4tGk','2ey9jImi467qEu67fvW1kP','1P4eCx5b11Tfmi4s1GmWmQ','6Emqf9HKTnVtG1ENKQw9j5','4nsfoy12XSqqLDwJzAGGH7','2SsEtiB6yJYn8hRRAmtVda','1fRU05gTv95daX11JeCkbM','34SfejBXAhX3u7wJwWP6EG','28IWdZp5N1hAlhsG2QJySw','3rOlBvCZmQ7iEgorE7zTVO','3IqdPUFXuL3v0UGlAGUKSV','3jn59xkzvinHdHdDTHyGqu','5TzKiFldM8bjWQEroSrrAm','03wdkZACaHRuygSEWruX0v','1CHHIPnOBaLjn0XO0sN07W','16UDP6bD8rD4rnQ5VjD4JE','7xPiAfclDKutWZHeBhYjHO','7DMyQuDPe8xzjC0UDSDa96','0cDbz6xRoyEZEWlidVftPV']
  
    if(!accessToken) return 
    spotifyApi.getAlbums(albumId).then((res)=>{
        setWorldAlbumc(
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

    return (

        <div className='relative flex-col py-3 space-y-6 overflow-y-scroll lg:-ml-3'>

            <div className='flex flex-col gap-3 py-2 mx-4'>
                <p className='text-2xl tracking-wide text-white md:text-4xl xl:text-4xl lg:text-3xl '>Albums</p>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        indianNewAlbumf.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        indianNewAlbumg.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        indianNewAlbumh.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        indianNewAlbumi.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        indianNewAlbumj.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        indianArtistAlbum.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        indianNewArtistAlbum.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        indianNewAlbuma.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        indianNewAlbumb.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        indianNewAlbumc.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        indianNewAlbumd.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        indianNewAlbume.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        worldAlbuma.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        worldAlbumb.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row justify-between space-x-3 overflow-hidden overflow-x-scroll '>
                    {
                        worldAlbumc.slice(0,50).map((album) => (
                            <div key={album.id}>
                                <Albumdata album={album}/>
                            </div>
                        ))
                    }
                </div>
                <br/>
                
            </div> 
         
      </div>
    )
}

export default Album