import React from 'react';
import { Toaster, toast } from 'sonner';

const AddMultipleStudent = () => {
  const token = localStorage.getItem('token');

  // Define a function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const fileInput = document.getElementById('excelFile');
    const file = fileInput.files[0]; // Get the selected file

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8998/api/faculty/import-students', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data', // Don't set Content-Type manually
          'Authorization': `Bearer ${token}`
        },
        body: formData // Set the FormData object as the request body
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Upload Multiple Students</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="excelFile" className="block text-gray-700">Select an Excel file:</label>
          <input type="file" id="excelFile" className="mt-2 p-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Upload</button>
      </form>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default AddMultipleStudent;