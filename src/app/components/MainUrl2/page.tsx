"use client"
import { useState } from 'react';
import Image from "next/image";
// import { FaCamera } from "react-icons/fa";
// import { FaArrowLeft } from "react-icons/fa6";
import Photo1 from "../../../../public/assest/Meal-Prep-Garlic-Butter-Chicken-Meatballs 1.png"
import Photo2 from "../../../../public/assest/sub-buzz-25700-1547136308-1 1.png"
import Photo3 from "../../../../public/assest/Lounging-1024x768-1 1.png"
import Rating from '@mui/material/Rating';
import leftarrow from "../../../../public/assest/icons8-left 1.svg"
import StarIcon from '@mui/icons-material/Star';



const images = [Photo1, Photo2,Photo3];
const headings = ["A Your healthy lunch choice", "A  favorite item on your desk","Something you can't say no to"]
const Subheadings = ["They make so laugh every morning", "I really need this","I “Me: no more ipad. him..."]

export default function MainUrl2() {
  const [index, setIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [currentindex, setCurrentindex] = useState(1);
  const [isRatingClicked, setIsRatingClicked] = useState(false);

  const handleRatingChange = (event:any, newValue:any) => {
    setRating(newValue);
    setIsRatingClicked(true);
  };

  const isButtonDisabled = !isRatingClicked || rating === 0;

  const handleBackclick = () =>{
    if(index < 1){
      window.location.href = '/components/MainUrl1';
    }else{
      setIndex((prevIndex) => prevIndex - 1);
      setCurrentindex((curr) => curr - 1)
    }
  }
   
    const handleButtonClick = async () => {
      try {
          const response = await fetch("/api/auth/rating", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  user_id: localStorage.getItem('user_id'), 
                  image_id: 29, 
                  rating: rating
              }),
          });
          const data = await response.json();
          if (response.ok) {
              alert(data.message); 
              setRating(0);
              setIsRatingClicked(false);
            
            
              if (index === images.length - 1) {
                window.location.href = '/components/Popup';
              } else {
                setIndex((prevIndex) => prevIndex + 1);
                setCurrentindex((curr) => curr + 1)
              }// Show success message
          } else {
              alert(data.error || 'Something went wrong'); // Show error message
          }
      } catch (error) {
          console.error("Error:", error);
          alert("Something went wrong.");
      }
  };
    
  return ( 
   <>
      <div className="h-[812px] w-[375px] mx-auto relative bg-[#fff] ">
                <div className='top max-w-[375px] h-[95px] w-full bg-[#25283D] mx-auto flex justify-between item-center py-[25px] pl-[14px] pr-[12px]'>
                    <button onClick={handleBackclick} className="mt-auto">
                    <Image src={leftarrow} alt=''className=" w-[25px] h-[25px]"/>
                    </button>
                    <h2 className="text-[14px] tracking-[1px] pr-[25px] font-[OpenSans] font-bold mt-auto text-[#ffffff] text-center">
                        Rate
                    </h2>
                    <p className="text-[14px] tracking-[1px] font-bold font-[OpenSans] mt-auto text-[#ffffff] text-center">{currentindex}/{images.length}</p>
                </div>
                <div className="max-w-[375px] h-[65px] w-full bg-[#fff] border-b-[1px] border-b-solid border-b-[#DADADA]">
                    <p className="text-[14px] tracking-[1px] font-[OpenSans] font-bold text-[#343434] text-start px-[25px] pt-[13px]">{headings[index]}</p>
                </div>
                <div className="w-[375px]  flex flex-col justify-center items-center gap-[24px] bg-[#fff]">
                    <p className="text-[14px] tracking-[1px] font-[OpenSans] font-400 text-[#343434] text-center pt-[15px]">Shared by your teammate</p>
                    <Image src={images[index]} alt="image" className="w-[350px] h-[194px] mt-[28px]" />
                    <p className="text-[14px] tracking-[1px] font-[OpenSans] font-400 text-[#343434] text-center ">“{Subheadings[index]}”</p>
                    <Rating name="rating" value={rating}
                        onChange={handleRatingChange}
                        size="large"
                        emptyIcon={<StarIcon style={{ opacity: 0.55}} fontSize="inherit" />}
                        sx={{
                            marginTop: "40px",
                            "& .MuiRating-icon": {
                                height: "40px",
                                width: "40px",
                                margin: '0 4px'
                            },
                            "& .MuiSvgIcon-root": {
                                height: "40px",
                                width: "40px",
                            },
                        }} />
                    <p className="text-[14px] tracking-[1px] font-[OpenSans] font-400 text-[#343434] text-center">Your rating is anonymous </p>
                    <button className={`w-[336px] h-[50px] mt-[95px] font-[OpenSans] rounded-[50px] mx-auto font-bold text-[18px] ${
                        isButtonDisabled ? 'bg-[#A9A9A9] text-[#808080] cursor-not-allowed' : 'bg-[#F9B22D] text-[#000000]'
                        }`}
                        disabled={isButtonDisabled}
                        onClick={handleButtonClick}
                    >
                        {index === images.length - 1 ? "Complete" : "Rate (+1pts)"}
                    </button>
                </div>
            </div>
        </>
    );
}
