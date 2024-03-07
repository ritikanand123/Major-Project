import { Toaster, toast } from 'sonner'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

const AddStudent = () =>{

  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8998/api/faculty/student-register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // console.log(res);
    if (res.status == 200) {
      toast.success("Register Successful");
    };


  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

  };

  return(
    <>
      <div className="flex h-auto justify-center align-middle">
        <div className="min-h-screen flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-2xl w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center"> Add a Student</h2>
            
            <div className="justify-evenly flex flex-col mb-4">
              <label htmlFor="studentId" className="block text-gray-600">Student Id:</label>
              <input
                type="text"
                name="studentId"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Student id"

              />

              <label htmlFor="name" className="block text-gray-600">Student Name:</label>
              <input
                type="text"
                name="name"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Student Name"
                
              />
              <label htmlFor="email" className="block text-gray-600">Student Email:</label>
              <input
                type="text"
                name="email"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Student Email id"

              />
              <label htmlFor="branch" className="block text-gray-600">Branch:</label>
              <input
                type="text"
                name="branch"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Branch"
              />
              <label htmlFor="semester" className="block text-gray-600">Semester:</label>
              <input
                type="text"
                name="semester"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Semester"
              />
              <label htmlFor="password" className="block text-gray-600">Password:</label>
              <input
                type="password"
                name="password"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter your password"
              />

            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none">
              Add Student
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </>
  )


}

export default AddStudent;