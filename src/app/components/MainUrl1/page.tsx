"use client"
import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';
import leftarrow from "../../../../public/assest/icons8-left 1.svg"

export default function MainUrl1() {
  const [images, setImages] = useState<Array<File | undefined>>([]);
  const [textData, setTextData] = useState<string[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      const newImages: Array<File | undefined> = [...images];
      newImages[index] = file;
      setImages(newImages);

      if (newImages.filter(img => img !== undefined).length === 3 && textData.every(data => data.trim() !== '')) {
        setIsButtonDisabled(false);
      }
      const imageURL = URL.createObjectURL(file);
      const newImageURLs = [...imageURLs];
      newImageURLs[index] = imageURL;
      setImageURLs(newImageURLs);
    }
  };


  const handleTextDataChange = (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
    event.preventDefault();
    const newTextData = [...textData];
    newTextData[index] = event.target.value;
    setTextData(newTextData);

    if (images.every(img => img) && newTextData.every(data => data.trim() !== '')) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const UserId = localStorage.getItem('user_id') || " "
      const formData = new FormData();
      formData.append('user_id', UserId); 
      images.forEach((image, index) => {
        if (image) {
          formData.append(`file${index + 1}`, image);
        }
      });
      textData.forEach((data, index) => {
        formData.append(`text_data${index + 1}`, data); 
      });
  
      const response = await fetch('/api/auth/uploadimage', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data); 
      if(response.ok){
        window.location.href = '/components/MainUrl2';
        
       }
    
      setImages([]);
      setTextData([]);
      setIsButtonDisabled(true);
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };
  

  return (
    <>
      <div className="h-[812px] w-[375px] mx-auto bg-[#fFFF] relative">
        <div className="max-w-[375px] h-[95px] py-[25px] w-full bg-[#25283D] mx-auto flex flex-col item-end justify-end">
          <button className="pl-[15px]">
            <Image src={leftarrow} alt=''className=" w-[25px] h-[25px]"/>
          </button>
        </div>
        <div className="max-w-[375px]  h-[65px] w-full bg-[#fff] border-b-[1px] border-b-solid border-b-[#DADADA]">
          <p className="text-[14px] tracking-[1px] font-bold font-[OpenSans] text-[#343434] text-start px-[25px] pt-[13px]">
            A picture of something that made me <br /> happy today...
          </p>
        </div>
        <div className="w-[375px] flex flex-col gap-[20px] bg-[#fff]">
          <p className="text-[14px] tracking-[1px] font-400 font-[OpenSans] text-[#343434] text-start px-[17px] pt-[18px]">
            Respond with up to 3 pictures
          </p>
          {[...Array(3)].map((_, index) => (
            <div className="w-[375px] flex justify-start gap-[15px] pb-[23px] px-[17px] items-center" key={index}>
              <div className="w-[134px] h-[110px] border-[2px] border-solid border-[#F9B22D] flex flex-col justify-center bg-[#E7E7E7]">
                {images[index] ? (
                  <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${imageURLs[index]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                ) : (
                  <label htmlFor={`upload-${index}`} className="cursor-pointer mt-[20px]">
                    <FaCamera className="w-[29px] h-[25px]  text-center mx-auto" />
                    <p className="text-[14px] font-[OpenSans] font-400 text-[#343434] text-center px-[25px]">Add Picture</p>
                  </label>
                )}
                <input
                  type="file"
                  id={`upload-${index}`}
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handleImageUpload(event, index)}
        
                />
              </div>
              <textarea
                placeholder="Type something..."
                className="w-[186px] h-[110px] pl-[10px] pt-[8px] font-[OpenSans] border-[1px] rounded-[10px] border-solid border-[#343434]"
                value={textData[index]}
                onChange={(event) => handleTextDataChange(event, index)}
              />
            </div>
          ))}
          {/* <a href="/components/MainUrl2" className='w-[336px] h-[50px] mx-auto'> */}
            <button
              className={`w-[336px] mt-[67px] h-[50px] rounded-[50px] mx-auto font-[OpenSans] font-bold text-[18px] ${
                isButtonDisabled ? 'bg-[#A9A9A9] text-[#808080] cursor-not-allowed' : 'bg-[#F9B22D] text-[#000000]'
              }`}
              disabled={isButtonDisabled}
              onClick={handleSubmit}
            >
              Share to feed (+1pts)
            </button>
          {/* </a> */}
        </div>
      </div>
    </>
  );
}
