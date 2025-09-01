import { useEffect, useState, useContext } from "react"
import { useLocation } from "react-router-dom"
import DropDownProfile from "./DropDownProfile"
import { UserContext, UserNameContext } from "../App"
export default function Navbar(){
    const [isOpen , setIsOpen] = useState(false)
    const {user,setUser} = useContext(UserContext)
    const {userName,setUserName} = useContext(UserNameContext)
    const location = useLocation()

    useEffect(() => {
        const name = localStorage.getItem("name")
        if (name) {
            setUserName(name)
        }
    },[])

    return(
        <>
            <nav className="bg-gray-900 text-white shadow-md h-[8vh] sm:h-[80px] p-4">
                <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-full flex justify-between items-center">
                    {/* Logo / Titolo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-[21px] font-bold tracking-wide text-red-500 pr-1.5">WATCHLIST</h1>
                    </div>
                    
                        <>
                        <div className=" flex flex-row focus:scale-120 cursor-pointer transform duration-200 ease-linear">
                            {location.pathname === "/login" || location.pathname === "/register" ? (
                                <></> 
                            ) : userName ? (
                                <p
                                className="bg-red-500  rounded-xl p-2 py-1"
                                onClick={() => setIsOpen((prev) => !prev)}
                                >
                                    <span className=" text-nowrap">Benvenuto {userName}</span>
                                </p>
                            ) : (
                                <p
                                className="bg-red-500  rounded-xl p-2"
                                onClick={() => setIsOpen((prev) => !prev)}
                                >
                                    <span className=" text-nowrap">Benvenuto Ospite</span>
                                </p>
                            )}
                        </div>
                        </>
                    {isOpen && <DropDownProfile isOpen={isOpen}/>}
                    
                    </div>
                </div>
            </nav>

        </>
    )
}