import { useState } from "react";
import {Toaster , toast} from "sonner";

const AddFaculty = () =>{
  const [form  , setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8998/api/admin/addCourse' , {
      method:'POST',
      body:JSON.stringify(form),
      
      headers : {
        'Content-Type':'application/json'
      }
    }); 
    console.log(res);
    if (res.status == 200) {
      toast.success("Course Added Successful");
    };
    
  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    })
    
  };

  return(
      <>
        <div className="flex h-auto justify-center align-middle">
          <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-2xl w-96">
              <h2 className="text-2xl font-semibold mb-4 text-center"> Add Course</h2>
              
              <div className="justify-evenly flex flex-col mb-4">
                <label htmlFor="CourseId" className="block text-gray-600">Course Id:</label>
                <input
                  type="text"
                  name="CourseId"
                  onChange={handleForm}
                  className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                  placeholder="Enter Course Id"

                />

                <label htmlFor="CourseName" className="block text-gray-600">Course Name:</label>
                <input
                  type="text"
                  name="CourseName"
                  onChange={handleForm}
                  className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                  placeholder="Enter Course Name"
                  
                />
                <label htmlFor="facultyId" className="block text-gray-600">Faculty Id:</label>
                <input
                  type="text"
                  name="facultyId"
                  onChange={handleForm}
                  className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                  placeholder="Enter Faculty Id"

                />
                <label htmlFor="department" className="block text-gray-600">Depatment:</label>
                <input
                  type="text"
                  name="department"
                  onChange={handleForm}
                  className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                  placeholder="Enter Depatment"

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

              </div>

              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none">
                Add Course
              </button>
            </form>
          </div>
        </div>
        <Toaster position="top-right" richColors />
      </>
  )
}

export default AddFaculty;