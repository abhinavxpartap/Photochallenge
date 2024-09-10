import Image from "next/image";
import arrow from "../../public/assest/Vector.png"

export default function Home() {
  return (
   <>
     <div className="h-[812px] bg-[#F3F3F3] w-[375px] mx-auto relative">
     <div className='max-w-[375px] h-[176px] w-full mx-auto bg-[#25283D] rounded-b-[20px]'/>
       <div className="max-w-[138px] mx-auto w-full h-[84px] rounded-[10px] absolute top-[172px] left-[-5px] bg-[#F9B22D] -rotate-90" style={{ boxShadow:"0px 4px 10px 0px #00000017" }}>
            <h4 className="text-[16px] leading-[21px] tracking-[1px] font-bold font-[OpenSans] text-[#343434] text-center pt-[18px]">Photo</h4>
       </div>
       <div className="max-w-[278px] mx-auto h-[138px] rounded-[10px] absolute top-[145px] left-[75px] bg-[#fff]" style={{ boxShadow:"0px 4px 10px 0px #00000017" }}>
            <h4 className="text-[11px] tracking-[1px] leading-[21px] font-[OpenSans] font-semibold text-[#343434] text-start pl-[15px] pt-[10px]">
            Share  a  moment
            </h4>
            <p className="text-[16px] tracking-[1.5px] leading-[21px] font-[OpenSans] font-bold text-[#343434] text-start px-[35px] pt-[15px]">A picture of something that <br/> made me happy today...</p>
            
            <a href="/components/Activity">
            <button className="text-[12px] font-[OpenSans] flex justify-end items-center font-bold text-[#343434] tracking-[1.3px] text-start px-[15px] pt-[15px] w-[278px] ">
             Take a pic <Image src={arrow} alt="" className="ml-[8px] w-[23px] h-[10px]"/>
            </button>
            </a>
       </div>
     </div>
   </>
  );
}
