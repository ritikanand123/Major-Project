import React from 'react';

const AddMultipleStudent = async () => {
  const token = localStorage.getItem('token');
  const fileInput = document.getElementById('excelFile');
  console.log(fileInput);
  const res = fetch('http://localhost:8998/api/faculty/import-students/:path', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    }
  });
  // const data = await res.json();
  // console.log(data);

  return (
    <>
      <form>
        <label htmlFor="excelFile">Select an Excel file:</label>
        <input type="file" id="excelFile" />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default AddMultipleStudent;
