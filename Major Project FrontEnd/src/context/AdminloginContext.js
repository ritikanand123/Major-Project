import { createContext , useState} from "react";

export const adminstatuscontext = createContext(null);

export const statusprovider = (props) =>{

    const [adminstatus , setadminstatus] = useState(false)

    return(<statusprovider.provider value = {{adminstatus , setadminstatus}}>
        {props.children}
    </statusprovider.provider>) 

}
