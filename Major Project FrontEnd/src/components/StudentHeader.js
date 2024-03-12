import React from 'react'
import { Outlet, Link ,useNavigate} from 'react-router-dom';
import { Toaster, toast } from 'sonner'

const StudentHeader = () => {
    const navigate = useNavigate();
    async function handelLogout(e){

      e.preventDefault();
      // console.log(form)
      const res = await fetch('http://localhost:8998/api/student/logout' , {
        method:'POST',
        headers : {
          'Content-Type':'application/json'
        }
      }); 
      // console.log(res);
      const message = await res.json()
      if(res.status == 200){
        toast.success(message.message);
        setTimeout(function() {
          navigate("/login");
      }, 500)
        
      }else{
        toast.error(message.message);
      }

    }  
    return(
        <>
        <div className="flex justify-end  mt-2 mx-5 mb-8 ">


        <ul className="flex w-2/4 justify-evenly ">

        <Link to = "myCourses"><li className="font-medium m-2">Courses List</li></Link>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded " onClick={handelLogout}>Sign Out</button>

        </ul>
        </div>
        <Toaster position="top-right" richColors/>
        <Outlet/>
        </>
        
       
    )
}

export default StudentHeader