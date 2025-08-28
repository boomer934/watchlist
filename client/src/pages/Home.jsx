import { useNavigate } from "react-router-dom"
import Navbar from "../components/NavBar"
export default function Home(){
    const navigate = useNavigate()
    return(
        <>
            <Navbar></Navbar>
            <h1>Benvenuto nella tua home</h1>
            <a onClick={()=>navigate("/area_personale")}>area personale</a>
        </>
    )
}