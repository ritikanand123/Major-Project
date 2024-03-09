import React, { useState, useEffect } from 'react';

const FacultyList = () => {
  const [teacherList, setTeacherList] = useState(null);

  useEffect(() => {
    getTeacherList();
  }, []);

  const getTeacherList = async () => {
    try {
      const response = await fetch("http://localhost:8998/api/admin/get_all_faculty");
      const data = await response.json();
      const sortedTeacherList = data.sort((a, b) => a.department.localeCompare(b.department));
      setTeacherList(sortedTeacherList);
      
    } catch (error) {
      console.error('Error fetching teacher list:', error);
    }
  };

  if(teacherList == null){
    return <h1> Loading </h1>
  }

  return (
    <>
      <div className="flex justify-evenly w-full shadow-xl py-8">
      <div className = "w-5">Sr. No</div>
        <div className = "w-5">Faculty Id</div>
        <div className = "w-5">Faculty name</div>
        <div className = "w-5">Faculty Email</div>
        <div className = "w-5">Faculty Department</div>
        <div className = "w-5">Faculty Password</div>
        <div className = "w-5">Faculty Courses</div>
      </div>

      
        
      <div className = "justify-start mt-8">
      {teacherList.map((faculty,idx) => (
        <div key={faculty.id} className="flex align-left justify-evenly w-full py-4">
          <div className = "w-5 ">{idx+1}</div>
          <div className = "w-5">{faculty.facultyId}</div>
          <div className = "w-5">{faculty.name}</div>
          <div className = "w-5 ">{faculty.email}</div>
          <div className = "w-5">{faculty.department}</div>
          <div className = "w-5">{faculty.password}</div>
          <div className="w-5">
            {faculty.allCourses.map(course => (
              <span key={course._id}>{course.CourseName}, </span>
            ))}
        </div>
        </div>
        
      ))}
      </div>
    </>
  );
};

export default FacultyList;