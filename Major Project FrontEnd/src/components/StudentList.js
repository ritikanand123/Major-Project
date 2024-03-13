import React, { useState, useEffect } from 'react';

const StudentList = () => {
  const [studentList, setStudentList] = useState(null);

  useEffect(() => {
    getStudentList();
  }, []);

  const token = localStorage.getItem('token');

  const getStudentList = async () => {
    try {
      const response = await fetch("http://localhost:8998/api/faculty/getStudents", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      const sortedStudentList = data.sort((a, b) => a.department.localeCompare(b.department));
      setStudentList(sortedStudentList);
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };

  if (studentList === null) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className="flex justify-evenly w-full shadow-xl py-8">
        <div className="w-5">Sr. No</div>
        <div className="w-20">Student Id</div>
        <div className="w-20">Student Name</div>
        <div className="w-20">Student Email</div>
        <div className="w-20">Student Branch</div>
        <div className="w-10">Student Semester</div>
        <div className="w-10">Student Password</div>
      </div>

      <div className="justify-start mt-8">
        {studentList.map((student, idx) => (
          <div key={student.id} className="flex align-left justify-evenly w-full py-4">
            <div className="w-5">{idx + 1}</div>
            <div className="w-20">{student.studentId}</div>
            <div className="w-20">{student.name}</div>
            <div className="w-20" style={{ wordWrap: 'break-word' }}>{student.email}</div>
            <div className="w-20">{student.branch}</div>
            <div className="w-10">{student.semester}</div>
            <div className="w-10">{student.password}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StudentList;
