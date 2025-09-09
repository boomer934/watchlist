import { handleLogout, toProfileOrLogin } from "../helper/handlers"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext, UserNameContext } from "../App"
import 'animate.css'
export default function DropDownProfile({isOpen}){
  const {user,setUser} = useContext(UserContext)
  const {userName,setUserName} = useContext(UserNameContext)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()


    return(
      <>
        <div  
         className=" flex flex-col absolute bg-gray-700 text-white shadow-md right-6 top-15 sm:top-18 sm:right-9 xl:right-38 rounded-2xl p-3 z-20 cursor-pointer animate__bounceIn">
          <div className="bg-gray-700 absolute right-4 -top-1 w-12 h-12 -z-30 rotate-[45deg]"></div>
            <ul className=" flex flex-col gap-4">
                <li onClick={()=>{toProfileOrLogin(navigate,token)}}>Watchlist</li>
                <li onClick={()=>navigate("/home/page/1")}>Home</li>
                <li onClick={()=>handleLogout(user,setUser,userName,setUserName)}>Logout</li>
            </ul>
        </div>
      </>
    )
}