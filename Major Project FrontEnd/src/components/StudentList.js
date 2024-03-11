import React, { useState, useEffect } from 'react';

const StudentList = () => {

  const [studetnList, setstudetnList] = useState(null);

  useEffect(() => {
    getstudetnList();
  }, []);
  const token = localStorage.getItem('token');

  const getstudetnList = async () => {
    try {
      const response = await fetch("http://localhost:8998/api/faculty/getStudents", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        }

      });
      const data = await response.json();
      const sortedstudetnList = data.sort((a, b) => a.department.localeCompare(b.department));
      setstudetnList(sortedstudetnList);

    } catch (error) {
      console.error('Error fetching teacher list:', error);
    }
  };

  if (studetnList == null) {
    return <h1> Loading </h1>
  }

  return (
    <>
      <div className="flex justify-evenly w-full shadow-xl py-8">
        <div className="w-5">Sr. No</div>
        <div className="w-5">Student Id</div>
        <div className="w-5">Student Name</div>
        <div className="w-5">Student Email</div>
        <div className="w-5">Student Branch</div>
        <div className="w-5">Student Semester</div>
        <div className="w-5">Student Password</div>
      </div>



      <div className="justify-start mt-8">
        {studetnList.map((student, idx) => (
          <div key={student.id} className="flex align-left justify-evenly w-full py-4">
            <div className="w-5 ">{idx + 1}</div>
            <div className="w-5">{student.studentId}</div>
            <div className="w-5">{student.name}</div>
            <div className="w-5 ">{student.email}</div>
            <div className="w-5">{student.branch}</div>
            <div className="w-5">{student.semester}</div>
            <div className="w-5">{student.password}</div>
          </div>

        ))}
      </div>
    </>
  );
}

export default StudentList;