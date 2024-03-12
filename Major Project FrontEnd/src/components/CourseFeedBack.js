import {React , useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';

const CourseFeedBack = () => {

  const { facultyId, courseId } = useParams();
  useEffect(() => {
    getRatings()
  }, [])


  const getRatings = async () =>{
    
    const res = await fetch(`http://localhost:8998/api/admin/faculty/${facultyId}/course/${courseId}/average-ratings`)

    const data = await res.json();
    console.log(data);

  } 
  
  


  return (
    <>
      
    </>
  )
}

export default CourseFeedBack