"use client"
import React ,{useState} from 'react'
import TextField from '@mui/material/TextField';
import swal from 'sweetalert2';



export default function Login() {
    const [forms , setForms] = useState({ username:"", password:"" });
    const [message, setMessage] = useState("");
    const [userid , setUserId] = useState("")
 
    const handleChange = (e:any) => {
      const { name , value } = e.target;
      setForms((prev) => ({...prev, [name]: value}));
    };


 
    const handleSubmit = async (e:any) => {
      e.preventDefault();
      try {

        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...forms }),
        });
        const data = await response.json();
        if (response.ok) {
            swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'You have successfully Logged In!',
              });
          setMessage(data.message);
          localStorage.setItem('user_id',data.user.user_id);
          window.location.href = '/';

        } else {
          setMessage(data.error);
          swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: data.error || 'Something went wrong!',
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("Something went wrong.");
        swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Something went wrong!',
          });
      }
    };
       
  return (
   <> 
     <div className="h-[630px] w-[346px] overflow-hidden flex justify-center items-center  mx-auto relative">
     <div className='max-w-[375px] h-[400px] w-full mx-auto bg-[#F3F3F3] rounded-[20px]' style={{ boxShadow:"0px 4px 10px 0px #00000017" }}>
     <h2 className='text-[32px] font-semibold text-[#25283D] text-center p-[10px]'>Login</h2> 
     <form onSubmit={handleSubmit}>
      <div className='pt-[30px] flex flex-col justify-center items-center gap-[25px]'>
      <TextField id="outlined-basic" 
      label="UserName" 
      variant="outlined"
      name="username"
      value={forms.username}
      onChange={handleChange}
      />  
      <TextField id="outlined-basic"
       label="Password" 
       variant="outlined"
       name="password"
       value={forms.password}
       onChange={handleChange} 
      />       
      <button type='submit' className='text-[16px] text-center px-[70px] h-[45.8px] leading-normal inline-flex bg-[#F9B22D] font-inter text-white rounded-[7.619px] items-center justify-center'>
            Login
        </button>   
          <p className='text-[15px] text-center  font-inter text-[#4B5A69]'>If dont have a account <a href='#' className='text-[15px] text-right font-inter text-[#F9B22D]'>SignUp</a></p>    
      </div>
      </form>
     </div> 
     </div>
   </>
  );
}
