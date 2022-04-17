import Link from 'next/link';
import React,{useEffect} from 'react';
import { useRouter } from 'next/router';

export default function Notfound() {

    const router = useRouter()
    useEffect(()=>{
        setTimeout(()=>{
            router.push('/')
        },40000)
    },[router])
  return (
    <div className='flex flex-col items-center justify-center w-full h-full' style={{marginLeft:'0px'}}>
      
        <h1 className='mt-10 text-6xl text-slate-200'>Oooops...</h1>
        <h2 className='pt-16 text2xl sm:text-3xl text-slate-400'>
          That page cannot be found. 
        </h2>
        <p className='pt-8 text-xl text-slate-300'>Go back to the <Link href='/'><a className='pl-2 text-2xl text-slate-100'> HomePage</a></Link></p>
     
    </div>
  );
}
