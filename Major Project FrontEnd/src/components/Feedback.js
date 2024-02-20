const Feedback = () =>{

    const questions = [
        "The teacher had Thorough and comprehensive Knowledge of subjects?",
        "Soft skill of the subject in-charge in handling of contents?",
        "Online learning materials/notes provided by the subject in-charge in enhancing my understanding of the subject?",
        "The teacher thoroughly answered the student's questions?",
        "There was positive interaction between students and teacher?",
        "Quality of work was emphasized more than quantity?",
        "You were encouraged to do extra reading about the course material?",
        "The teacher gave assignments that were useful for learning subject matter?",
        "Students feel free to interrupt presentations if points needed clarification?",
        "Video, sound quality and duration of video lectures prepared by subject in-charge?",
        "Lectures were held regularly and on time?",
        "Students were introduced with the relevant information iz. Registration & Certification for MOOCs based online course as a supplement activity to the course?",
        "Students were introduced with the relevant information on 'Virtual Labs' for the course?",
        "The online teaching technologies used by the subject in-charge in enhancing my understanding of the subject",
        "Overall rating of online teaching activities in this subject?"
      ];

    return (<div className="flex justify-center flex-col">
        <h1 className="text-2xl font-semibold mb-4 text-center">Form</h1>
        <ul className="max-w-md mx-auto p-4 bg-slate-100  rounded-md shadow-2xl">
        {questions.map((question, index) => (
          <li key={index} className="mb-8">
            <p className="font-bold mb-2">{"Q" + (index+1) + " " + question}</p>
            {[1, 2, 3, 4, 5].map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  id={`rating${rating}`}
                  name={`question${index + 1}`}
                  type="radio"
                  className="mr-2"
                />
                <label htmlFor={`rating${rating}`}>{`${rating}.0`}</label>
              </div>
            ))}
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
      <button
        type="submit"
        className="w-20 my-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Submit
      </button>
      </div>
      
        
    </div>)


}

export default Feedback;