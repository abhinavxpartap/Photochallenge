"use client"
import { useState } from 'react';
import Image from "next/image";
import Photo from "../../../../public/assest/Bg E.png"
import Profile from "../../../../public/assest/Iman.png"
import Crown from "../../../../public/assest/Crown.png"






export default function Popup() {

  return (
   <>
     <div className="h-[812px] w-[390px] bg-[#ffff] mx-auto relative">
     <div className='max-w-[390px] w-full bg-[#fffff] mx-auto flex flex-col justify-center item-center px-[10px] gap-[90px]'>
        <div className='w-[329px] h-[609px] mx-auto'>
            <Image src={Photo} alt="" className='absolute top-[50px] w-[329px] h-[609px]'/>
            <Image src={Profile} alt='' className='w-[108px] h-[103px] absolute top-[115px] left-[144px]'/>
            <Image src={Crown} alt='' className='w-[84px] h-[81px] absolute top-[58px] left-[176px] rotate-[10deg]'/>
            <h2 className='text-[32px] font-normal absolute top-[270px] left-[81px]'>You’ve earned</h2>
            <h2 className='text-[54px] font-semibold absolute top-[374px] left-[84px]'>4 points</h2>
        </div>
        <button className={`w-[336px] h-[50px] rounded-[50px] absolute top-[743px] left-[16px]  mx-auto font-bold text-[18px] bg-[#F9B22D] text-[#000000]
        `}
        >   Done 
         </button>
       </div>
     </div>
   </>
  );
}
