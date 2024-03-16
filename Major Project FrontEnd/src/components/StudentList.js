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
    <div>
      <table className="border-collapse w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Sr. No</th>
            <th className="border border-gray-400 px-4 py-2">Student Id</th>
            <th className="border border-gray-400 px-4 py-2">Student Name</th>
            <th className="border border-gray-400 px-4 py-2">Student Email</th>
            <th className="border border-gray-400 px-4 py-2">Student Branch</th>
            <th className="border border-gray-400 px-4 py-2">Student Semester</th>
            <th className="border border-gray-400 px-4 py-2">Student Password</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, idx) => (
            <tr key={student.id} className={idx % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border border-gray-400 px-4 py-2">{idx + 1}</td>
              <td className="border border-gray-400 px-4 py-2">{student.studentId}</td>
              <td className="border border-gray-400 px-4 py-2">{student.name}</td>
              <td className="border border-gray-400 px-4 py-2" style={{ wordWrap: 'break-word' }}>{student.email}</td>
              <td className="border border-gray-400 px-4 py-2">{student.branch}</td>
              <td className="border border-gray-400 px-4 py-2">{student.semester}</td>
              <td className="border border-gray-400 px-4 py-2">{student.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;