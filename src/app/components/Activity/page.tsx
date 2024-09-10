"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import Mask from "../../../../public/assest/Mask.svg"

export default function Activiy() {
  const [points, setPoints] = useState(null);
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {

    async function fetchavgrating() {
      try {
        const user_id = localStorage.getItem('user_id');

        const response = await fetch(`/api/auth/avgrating?user_id=${user_id}`);
        const data = await response.json();

        if (data.error) {
          console.error('Error:', data.error);
          return;
        }
        // setPoints(data.points);
        setAverageRating(data.averageRating);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchavgrating();

    async function fetchpoints() {
      try {
        const user_id = localStorage.getItem('user_id');

        const response = await fetch(`/api/auth/users?user_id=${user_id}`);
        const data = await response.json();

        if (data.error) {
          console.error('Error:', data.error);
          return;
        }
        setPoints(data.points);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchpoints();
  
  }, []);

    const content = (
        <>
         <div className="w-[375px] h-[100px] flex justify-between items-center">
              <div className="w-[50%] flex flex-col justify-center">
               <h4 className="text-[14px] tracking-[1px] font-[OpenSans] font-bold text-[#343434] text-center">
               Today’s points
                </h4>
                <h4 className="text-[44px] font-[OpenSans] font-bold text-[#343434] text-center">
                 {points !== null ? points : '0'}
                </h4>
              </div>
              <div className="w-[50%] flex flex-col justify-center">
               <h4 className="text-[14px] tracking-[1px] font-[OpenSans] font-bold text-[#343434] text-center">
                  Photo’s avg. rating
                </h4>
                <h4 className="text-[44px] font-[OpenSans] font-bold text-[#343434] text-center">
                  {averageRating !== null ? averageRating : '0'}
                </h4>
              </div>
         </div>
         <a href="/components/MainUrl1" className="w-[116px] mx-auto mt-[15px] h-[35px]">
          <button className="bg-[#F9B22D] font-[OpenSans] w-[116px] mx-auto h-[35px] rounded-[25px] text-[16px] font-bold text-[#343434] text-center">
            Play
          </button>
          </a>
        </>
    )

    return (
   <>
     <div className="h-[812px] w-[375px] bg-[#F3F3F3]  mx-auto relative">
     <div style={{ background: 'linear-gradient(125.5deg, #78CDEC 16.29%, #98AAFF 87.17%)' }} className=' bg-no-repeat max-w-[375px] h-[337px] mx-auto flex flex-col item-center justify-center'>
        {content}
     </div>
     </div>
   </>
  );
}
