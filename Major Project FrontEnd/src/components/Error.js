import { useRouteError } from "react-router-dom";

const Error = () =>{
    const err = useRouteError();

    return <div className="flex justify-center align-middle mt-auto mb-auto p-52">
        <h1>Opps!</h1>
        <h1>{err.status + ":" + err.statusText}</h1>
        <h1 className="text-4xl">App Galata Jagha a gaye ho</h1>
    
    </div>


}

export default Error; 