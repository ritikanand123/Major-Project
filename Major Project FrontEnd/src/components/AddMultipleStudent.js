import React from 'react';

const AddMultipleStudent = () => {
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
