import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import DropDownProfile from "./DropDownProfile"
export default function Navbar({user,setUser}){
    const [isOpen , setIsOpen] = useState(false)
    const location = useLocation()
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            return 
        }
        axios.get("http://localhost:5000/home",{
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res=>{
            setUser({name:res.data.name,surname:res.data.surname,email:res.data.email})
        })
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
                            ) : user && user.name && user.surname ? (
                                <p
                                className="bg-red-500  rounded-xl p-2 py-1"
                                onClick={() => setIsOpen((prev) => !prev)}
                                >
                                    <span className=" text-nowrap">Benvenuto {user.name}</span>
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
                    {
                        isOpen && <DropDownProfile/>
                    }
                    
                    </div>
                </div>
            </nav>

        </>
    )
}