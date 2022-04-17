import React, { useEffect } from 'react';
import Image from 'next/image';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loader from '../../components/Loader';


const Signin = ({providers}) => {

    const { data: session, status } = useSession()
    const router = useRouter()
    useEffect(()=>{
        if(session){
            router.push('/')
        }
    },[session, router])
    if(status==='loading') return <Loader/>

    return (
        <div className='flex items-center justify-center pt-16 md:mt-20 ml-20 md:ml-[130px] lg:ml-[187px] xl:ml-70 h-[75vh] w-[100vw] bg-[#000000]'>
                <div className='flex flex-col items-center justify-center gap-2 md:gap-4 lg:gap-6 xl:gap-8 md:flex-row'>
                    <Image className='rounded-full ml-52 animate-spi' src='https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg' alt='image' width={250} height={250} quality={100} objectFit="cover" />
                    
                    {Object.values(providers).map((provider) =>(
                    <div key={provider.id} className='flex flex-col justify-around space-y-9 md:space-y-15 lg:space-y-5 login__button' >
                        <h4 className='text-[28px] md:text-4xl font-extrabold lg:text-[28px] xl:text-4xl login__subtitle text-slate-100'>Continue With <span className='text-transparent bg-clip-text bg-gradient-to-tl from-lime-400 to-sky-500 animate-pulse'>{provider.name}</span></h4>
                        <button onClick={()=>signIn(provider.id)} className='text-lg text-white mx-12 md:mx-20 lg:mx-12 xl:mx-20 py-1 rounded-xl hover:bg-[#383030] border-[2px] border-orange-800 hover:border-yellow-700'>Sign In</button>
                    </div>
                    ))} 
                </div>
        </div>
       
    )
}

export default Signin

export async function getServerSideProps() {
    const providers = await getProviders();
    
    return {
      props: { providers },
    };
  }