import { useNavigate } from "react-router-dom"
export default function BackToHome(){
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/home")
    }
    return(
        <>
            <button 
            onClick={handleClick} 
            className="bg-red-500 p-2 rounded-xl">
                Ritorna alla home
            </button>
        </>
    )
}