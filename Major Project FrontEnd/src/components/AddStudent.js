const AddStudent = () =>{

    const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    };

    const handleForm = () => {
    // Handle form input changes here
    };

    return(
        <div className="flex h-auto justify-center align-middle">
        <div className="min-h-screen flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-2xl w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center"> Add a Student</h2>
            
            <div className="justify-evenly flex flex-col mb-4">
              <label htmlFor="username" className="block text-gray-600">Student Id:</label>
              <input
                type="text"
                name="username"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Student id"

              />

              <label htmlFor="studentname" className="block text-gray-600">Student Name:</label>
              <input
                type="text"
                name="studentname"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Student Name"
                
              />
              <label htmlFor="username" className="block text-gray-600">Student Email:</label>
              <input
                type="text"
                name="username"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter Student Email id"

              />
              <label htmlFor="studentbranch" className="block text-gray-600">Branch:</label>
              <input
                type="text"
                name="studentbranch"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter your password"
              />
              <label htmlFor="studentsemester" className="block text-gray-600">Semester:</label>
              <input
                type="text"
                name="studentsemester"
                onChange={handleForm}
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500 mb-2"
                placeholder="Enter your password"
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
              Log In
            </button>
          </form>
        </div>
      </div>
    )


}

export default AddStudent;