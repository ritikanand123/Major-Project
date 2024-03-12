import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseFeedback = () => {
  const { facultyId, courseId } = useParams();
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRatings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:8998/api/admin/faculty/${facultyId}/course/${courseId}/average-ratings`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();
        setRatings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setLoading(false);
      }
    };

    getRatings();
  }, [facultyId, courseId]);

  const questions = [
    "1. The teacher had Thorough and comprehensive Knowledge of subjects?",
    "2. Soft skill of the subject in-charge in handling of contents?",
    "3. Online learning materials/notes provided by the subject in-charge in enhancing my understanding of the subject?",
    "4. The teacher thoroughly answered the student's questions?",
    "5. There was positive interaction between students and teacher?",
    "6. Quality of work was emphasized more than quantity?",
    "7. You were encouraged to do extra reading about the course material?",
    "8. The teacher gave assignments that were useful for learning subject matter?",
    "9. Students feel free to interrupt presentations if points needed clarification?",
    "10. Video, sound quality and duration of video lectures prepared by subject in-charge?",
    "11. Lectures were held regularly and on time?",
    "12. Students were introduced with the relevant information iz. Registration & Certification for MOOCs based online course as a supplement activity to the course?",
    "13. Students were introduced with the relevant information on 'Virtual Labs' for the course?",
    "14. The online teaching technologies used by the subject in-charge in enhancing my understanding of the subject",
    "15. Overall rating of online teaching activities in this subject?"
  ];

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Course Feedback</h1>
      <p className="mb-2 text-lg text-gray-700">
        Faculty ID: {facultyId} | Course ID: {courseId}
      </p>

      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-blue-600">Average Ratings</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(ratings.questionwiseAverageRatings).map((question, index) => (
              <div key={index} className="mb-4 p-4 border border-blue-200 rounded-md">
                <p className="font-medium text-gray-700">{questions[index]}</p>
                <p className="text-2xl font-bold text-blue-600">{ratings.questionwiseAverageRatings[question]}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseFeedback;