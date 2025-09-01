import { toProfileOrLogin } from "../helper/handlers"
import { useNavigate } from "react-router-dom"
export default function DropDownProfile(){
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
    return(
      <>
      <div className="bg-gray-700 absolute right-9 top-12 w-12 h-12 rotate-[45deg] sm:top-16 sm:right-13 xl:right-42 desktop:right-100"></div>
        <div className=" flex flex-col absolute bg-gray-700 text-white shadow-md right-6 top-12 sm:top-18 sm:right-9 xl:right-38 rounded-2xl p-3 z-20 cursor-pointer">
            <ul className=" flex flex-col gap-4">
                {/* <li>Logout</li> */}
                <li onClick={()=>{toProfileOrLogin(navigate,token)}}>Profile</li>
                <li onClick={()=>navigate("/home/page/1")}>Home</li>
            </ul>
        </div>
      </>
    )
}