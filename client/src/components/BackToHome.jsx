import { useNavigate } from "react-router-dom"
export default function BackToHome(){
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/")
    }
    return(
        <div className="flex justify-center">
            <button 
            onClick={handleClick} 
            className="shadow-md shadow-gray-400 p-2 rounded-xl focus:bg-gray-400 focus:scale-110 transform duration-120 linear">
                Ritorna alla home
            </button>
        </div>
    )
}