import { useEffect, useState } from "react"
import axios from "axios"
import DropDownProfile from "./DropDownProfile"
export default function Navbar({user,setUser}){
    const [isOpen , setIsOpen] = useState(false)
    useEffect(()=>{
        const token = localStorage.getItem("token")
        axios.get("http://localhost:5000/home",{
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res=>{
            setUser({name:res.data.name,surname:res.data.surname,email:res.data.email})
        })
    },[])
    return(
        <>
            <nav className="bg-gray-900 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                    {/* Logo / Titolo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-[21px] font-bold tracking-wide text-red-500 pr-1.5">WATCHLIST</h1>
                    </div>
                    { user.name && user.surname && user.email ?(
                        <>
                        <div className=" flex flex-row focus:scale-120 cursor-pointer transform duration-200 ease-linear">
                            <p 
                            className="pr-1.5 bg-red-500 p-1.5 rounded-xl"
                            onClick={()=>setIsOpen((prev)=>!prev)}>
                                Benvenuto {user.name} {user.surname}
                            </p>
                        </div>
                        </>
                    ):(
                        <div className=" flex flex-row">
                            <p className="pr-1.5">Benvenuto ospite</p>
                        </div>
                    )
                    }{
                        isOpen && <DropDownProfile/>
                    }
                    
                    </div>
                </div>
            </nav>

        </>
    )
}