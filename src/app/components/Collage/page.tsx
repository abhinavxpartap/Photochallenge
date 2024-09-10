import Image from "next/image";
import photo1 from "../../../public/assest/Meal-Prep-Garlic-Butter-Chicken-Meatballs 1.png"
import photo2 from "../../../public/assest/Lounging-1024x768-1 1.png"
import photo3 from "../../../public/assest/sub-buzz-25700-1547136308-1 1.png"


export default function Collage() {
   const data = [
    {
      simg: photo1,
      simg2: photo2,
      bimg: photo3
    },
    {
      simg: photo1,
      simg2: photo2,
      bimg: photo3
    },
    {
      simg: photo1,
      simg2: photo2,
      bimg: photo3
    },
   ]
  return (
   <> 
     <div className="h-[812px] w-[375px] overflow-hidden mx-auto relative">
     <div className='max-w-[375px] h-[85px] w-full mx-auto bg-[#25283D] flex justify-center items-center rounded-b-[20px]'>
     <h4 className="text-[14px] tracking-[1px] font-[OpenSans] font-bold text-[#ffff] text-center ">
          Collage
      </h4>
      </div>
       {data.map((photo,index:number) => (
          <div key={index}>
          <div className="flex justify-center pt-[30px] mx-auto">
          <Image
            className="w-[180px] h-[100px]"
            src={photo.simg}
            alt=""
            />
            <Image
            className="w-[180px] h-[100px]"
            src={photo.simg2}
            alt=""
            />
        </div>
        <div className="pt-[30px] mx-auto">
           <Image
            className="w-[350px] h-[195px] mx-auto"
            src={photo.bimg}
            alt=""
            />
        </div>
        </div>
       ))}
     </div>
   </>
  );
}
