import ReactDOM from "react-dom/client";
import { createBrowserRouter  , RouterProvider} from "react-router-dom";
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

const Approuter = createBrowserRouter([
    
   
    {
        path : "/",
        element : <Login/>
    },
    {
        path : "/login",
        element : <Login />
    },
    {

        path:"/feedback",
        element : <Feedback />,

    },
    {
        path : "/loginAsAdmin",
        element : <LoginAdmin />
    },
    {
        path : "/loginAsTeacher",
        element : <LoginTeacher />
    },
    {
        path : "/faculty/home" , 
        element : <FacultyHome/>,
        children : [
            {
                path : "/faculty/home/addstudent",
                element : <AddStudent/>
            },
        ],
    },
    {
        path : "/admin/home" , 
        element : <Header/>,
        children : [
            {
                path : "/admin/home/addfaculty",
                element : <AddFaculty/>
            },
            {
                path : "/admin/home/addcourse",
                element : <Addcourses />
            }
        ],
    }
]
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <statusprovider/>
            <RouterProvider router = {Approuter} />
        <statusprovider/>
    </>
);

