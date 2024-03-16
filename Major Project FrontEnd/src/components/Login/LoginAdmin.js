import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Toaster, toast } from 'sonner'
// import {adminstatuscontext} from '../../context/AdminloginContext'

const LoginAdmin = () => {
  // const adminstatus = useContext(adminstatuscontext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form)
    setForm({
      ...form,
    })
    const res = await fetch('http://localhost:8998/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)


    });

    const data = await res.json();
    localStorage.setItem('token', data.token);

    if (res.status == 200) {

      toast.success(data.message);

      setTimeout(function () {
        navigate("/admin/home");
      }, 500);

    } else {
      toast.error(data.message)
    }
    // const data = await res.json();
    // console.log(res);

  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

  };

  return (
    <>
      <div className="flex h-screen justify-center align-middle bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="min-h-screen flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-2xl w-96 rounded-3xl">
            <h2 className="text-2xl font-semibold mb-4 text-center"> Admin Login</h2>

            <div className="mb-4">
              <label htmlFor="adminId" className="block text-gray-600 mb-2">Username:</label>
              <input
                type="text"
                name="adminId"
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
              <Link className="text-blue-600" to="../loginAsTeacher">Login As Teacher</Link>
              <Link className="text-blue-600" to="../login">Login As Student</Link>
            </div>

          </form>
        </div>

      </div>
      <Toaster position="top-right" richColors />
    </>
  );

}


export default LoginAdmin;