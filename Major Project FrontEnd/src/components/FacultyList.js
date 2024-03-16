import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FacultyList = () => {
  const [teacherList, setTeacherList] = useState(null);

  useEffect(() => {
    getTeacherList();
  }, []);

  const token = localStorage.getItem('token');

  const getTeacherList = async () => {
    try {
      const response = await fetch("http://localhost:8998/api/admin/get_all_faculty", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      const sortedTeacherList = data.sort((a, b) => a.department.localeCompare(b.department));
      setTeacherList(sortedTeacherList);

    } catch (error) {
      console.error('Error fetching teacher list:', error);
    }
  };

  if (teacherList === null) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="container mx-auto mt-8 ">
      <table className="table-auto w-full border-collapse border border-gray-800">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-600 px-4 py-2">Sr. No</th>
            <th className="border border-gray-600 px-4 py-2">Faculty Id</th>
            <th className="border border-gray-600 px-4 py-2">Faculty Name</th>
            <th className="border border-gray-600 px-4 py-2">Faculty Email</th>
            <th className="border border-gray-600 px-4 py-2">Faculty Department</th>
            <th className="border border-gray-600 px-4 py-2">Faculty Password</th>
            <th className="border border-gray-600 px-4 py-2">Faculty Courses</th>
          </tr>
        </thead>
        <tbody>
          {teacherList.map((faculty, idx) => (
            <tr key={faculty.id} className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
              <td className="border border-gray-600 px-4 py-2">{idx + 1}</td>
              <td className="border border-gray-600 px-4 py-2">{faculty.facultyId}</td>
              <td className="border border-gray-600 px-4 py-2">{faculty.name}</td>
              <td className="border border-gray-600 px-4 py-2">{faculty.email}</td>
              <td className="border border-gray-600 px-4 py-2">{faculty.department}</td>
              <td className="border border-gray-600 px-4 py-2">{faculty.password}</td>
              <td className="border border-gray-600 px-4 py-2">
                {faculty.allCourses.map((course) => (
                  <Link
                    key={course._id}
                    to={`/admin/home/faculty/${faculty.facultyId}/course/${course.CourseId}/average-ratings`}
                    className="cursor-pointer text-blue-500 hover:underline block"
                  >
                    {course.CourseName}
                  </Link>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyList;