import { useEffect, useState, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import DropDownProfile from "./DropDownProfile"
import { UserContext, UserNameContext } from "../App"
export default function Navbar(){
    const navigate = useNavigate()
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
                    <div 
                    onClick={() => navigate("/")}
                    className="flex-shrink-0">
                        <h1 className="text-[21px] font-bold tracking-wide text-red-500 pr-1.5">WATCHLIST</h1>
                    </div>
                    
                        <>
                        <div className=" flex flex-row focus:scale-120 cursor-pointer transform duration-200 ease-linear">
                            {location.pathname === "/login" || location.pathname === "/register" ? (
                                <></> 
                            ) : userName ? (
                                <button
                                className=" rounded-xl p-2 py-1 focus:shadow-lg focus:shadow-gray-400 hover:shadow-md hover:shadow-gray-400 hover:scale-110 focus:scale-110 transform duration-100 ease-linear"
                                onClick={() => setIsOpen((prev) => !prev)}
                                >
                                    <span className=" text-nowrap">Benvenuto {userName}</span>
                                </button>
                            ) : (
                                <button
                                onClick={() => navigate("/login")}
                                className=" rounded-xl p-2 py-1 focus:shadow-lg focus:shadow-gray-400 hover:shadow-md hover:shadow-gray-400 hover:scale-110 focus:scale-110 transform duration-100 ease-linear  text-nowrap bg-gray-700 hover:bg-gray-600 cursor-pointer"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                        </>
                    {isOpen && <DropDownProfile isOpen={isOpen} setIsOpen={setIsOpen}/>}
                    
                    </div>
                </div>
            </nav>

        </>
    )
}