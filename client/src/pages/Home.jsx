import { useNavigate } from "react-router-dom"
export default function Home(){
    const navigate = useNavigate()
    return(
        <>
            <h1>Benvenuto nella tua home</h1>
            <a onClick={()=>navigate("/area_personale")}>area personale</a>
        </>
    )
}