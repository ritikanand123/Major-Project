import { Link } from "react-router-dom";

const FacultyHome = () => {

    return(<>
    
    <div className="flex justify-between m-5 align-middle">

        <img src="../../utils/image.avif" alt="logo"></img>

        <ul className="flex w-2/4 justify-evenly ">

            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded ">Sign Out</button>

        </ul>

    </div>


    </>)


}

export default FacultyHome;