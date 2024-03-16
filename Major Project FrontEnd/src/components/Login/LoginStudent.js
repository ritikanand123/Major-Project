import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'

const Login = () => {

  const [form  , setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8998/api/student/login' , {
      method:'POST',
      body:JSON.stringify(form),
      headers : {
        'Content-Type':'application/json',
      }
    }); 
    const data = await res.json();
    console.log(data.token);
    localStorage.setItem('token', data.token);
    
    if (res.status == 200) {
      // localStorage.setItem('user' , JSON.stringify(json))
      toast.success(data.message);

      setTimeout(function () {
        navigate("/student/home");
      }, 700);

    } else {
      toast.error(data.message)
    }
    
  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    })
    
  };

  return (
    <>
      <div className="flex h-screen justify-center align-middle bg-gradient-to-r from-indigo-500 to-purple-600 ">
        <div className="min-h-screen flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-2xl w-96 rounded-3xl">
            <h2 className="text-2xl font-semibold mb-4 text-center"> Student Login</h2>
            
            <div className="mb-4">
              <label htmlFor="studentId" className="block text-gray-600 mb-2">Username:</label>
              <input
                type="text"
                name="studentId"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600 mb-2">Password:</label>
              <input
                type="password"
                name="password"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none">
              Log In
            </button>
            <div className="mt-4 flex justify-between">
              <Link className = "text-blue-600" to = "../loginAsTeacher">Login As Teacher</Link>
              <Link className = "text-blue-600" to = "../loginAsAdmin" >Login As Admin</Link>
            </div> 
          </form>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </>
    
    
  );
};

export default Login;
