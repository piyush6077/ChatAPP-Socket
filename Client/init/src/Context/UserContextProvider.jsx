import React , {useState} from "react";

import userContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [User, setUser] = useState(2)
    const [showSlide, setShowSlide] = useState(false)

    const handleGroupInfo = () => {
        setShowSlide((prev)=> !prev)
    }

    return(
        <userContext.Provider value={{User, setUser, handleGroupInfo , showSlide,setShowSlide}}>
            {children}
        </userContext.Provider>
    )
}


export default UserContextProvider