import {React , useEffect , useState} from 'react'
import {Link} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode';

const StudentCourses = () => {
    
  const [Courses, setCourses] = useState(null);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    
    getCourses();
  }, []);

  const getCourses = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch("http://localhost:8998/api/student/getCourses", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
  
      });
      const data = await response.json();
      setCourses(data);
      // console.log(data)
      
    } catch (error) {
      console.error('Error fetching teacher list:', data.message);
    }
  };

  if(Courses == null){
    return <h1> Loading </h1>
  }
  

  return(
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Courses</h1>
      {Courses.map(course => (
        <Link
          key={course._id}
          to={`/student/home/course/${course.CourseId}`}
          className="text-decoration-none"
        >
          <div className="bg-gray-100 p-4 rounded shadow mb-4 cursor-pointer">
            <h1 className="text-xl font-semibold mb-2">CourseId: {course.CourseId}</h1>
            <p className="text-gray-700 rounded-2xl">CourseName: {course.CourseName}</p>
          </div>
        </Link>
      ))}
    </div>
  )


}

export default StudentCourses