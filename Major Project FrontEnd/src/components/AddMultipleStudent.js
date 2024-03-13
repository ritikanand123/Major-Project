import React from 'react';

const AddMultipleStudent = async () => {
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

      if (res.ok) {
        console.log('File uploaded successfully');
        // Handle success, e.g., show a success message to the user
      } else {
        console.error('Failed to upload file');
        // Handle failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}> {/* Call the handleSubmit function on form submission */}
        <label htmlFor="excelFile">Select an Excel file:</label>
        <input type="file" id="excelFile" />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default AddMultipleStudent;