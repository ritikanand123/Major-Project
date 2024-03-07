import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'
const AddFaculty = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8998/api/admin/register-faculty', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res);
    if (res.status == 200) {
      toast.success("Register Successful");
      setTimeout(function () {
        navigate("/faculty/home");
      }, 500)
    };


  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

  };

  return (
    <>
      <div className="flex h-auto justify-center align-middle">
        <div className="min-h-screen flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-2xl w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center"> Add Faculty</h2>

            <div className="justify-evenly flex flex-col mb-4">
              <label htmlFor="facultyId" className="block text-gray-600">Faculty Id:</label>
              <input
                type="text"
                name="facultyId"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Faculty Id"

              />

              <label htmlFor="name" className="block text-gray-600">Faculty Name:</label>
              <input
                type="text"
                name="name"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Faculty Name"

              />
              <label htmlFor="email" className="block text-gray-600">Faculty Email:</label>
              <input
                type="text"
                name="email"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Faculty Email"

              />
              <label htmlFor="department" className="block text-gray-600">Depatment:</label>
              <input
                type="text"
                name="department"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Faculty Depatment:"

              />
              <label htmlFor="password" className="block text-gray-600">Password:</label>
              <input
                type="password"
                name="password"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Default password"
              />

            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none">
              Register Faculty
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </>
  )
}

export default AddFaculty;