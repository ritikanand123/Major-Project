import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/LoginStudent";
import Feedback from "./components/Feedback"
import LoginAdmin from "./components/Login/LoginAdmin";
import LoginTeacher from "./components/Login/LoginTeacher"
import FacultyHome from "./components/FacultyHeader";
import AddStudent from "./components/AddStudent";
import Header from "./components/AdminHeader";
import AddFaculty from "./components/AddFaculty";
import Addcourses from "./components/Addcourse"
import statusprovider from "./context/AdminloginContext"
import FacultyList from "./components/FacultyList"
import StudentList from "./components/StudentList"
import AddMultipleStudent from "./components/AddMultipleStudent"
import StudentHeader from "./components/StudentHeader"
import StudentCourses from "./components/StudentCourses"
import Feedback from "./components/Feedback"
import CourseFeedBack from "./components/CourseFeedBack"

const Approuter = createBrowserRouter([

    {
        path: "/",
        element: <Login />
    },
    {
        path: "/login",
        element: <Login />
    },
    {

        path: "/feedback",
        element: <Feedback />,

    },
    {
        path: "/loginAsAdmin",
        element: <LoginAdmin />
    },
    {
        path: "/loginAsTeacher",
        element: <LoginTeacher />
    },
    {
        path: "/faculty/home",
        element: <FacultyHome />,
        children: [
            {
                path: "/faculty/home/addstudent",
                element: <AddStudent />
            },
            {
                path: "/faculty/home/studentlist",
                element: <StudentList />
            },
            {
                path: "/faculty/home/addmultiplestudent",
                element: <AddMultipleStudent />
            },
        ],
    },
    {
        path: "/admin/home",
        element: <Header />,
        children: [
            {
                path: "/admin/home/addfaculty",
                element: <AddFaculty />
            },
            {
                path: "/admin/home/addcourse",
                element: <Addcourses />
            },
            {
                path: "/admin/home/teacherlist",
                element: <FacultyList />
            },
            {
                path: "/admin/home/teacherlist",
                element: <FacultyList />
            },
            {
                path: "/admin/home/faculty/:facultyId/course/:courseId/average-ratings",
                element: <CourseFeedBack />
            }

        ],
    },
    {
        path: "/student/home",
        element: <StudentHeader />,
        children: [
            {
                path: "/student/home/myCourses",
                element: <StudentCourses />
            },
            {
                path: "/student/home/course/:courseid",
                element: <Feedback />
            }
        ],
    }
]
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>

        <RouterProvider router={Approuter} />

    </>
);

