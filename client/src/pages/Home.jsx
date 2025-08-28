import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Navbar from "../components/NavBar"
export default function Home(){
    const navigate = useNavigate()
    const [user,setUser] = useState({name:"",surname:"",email:"",password:""})
    return(
        <>
            <Navbar user={user} setUser={setUser}></Navbar>
            <h1>Benvenuto nella tua home</h1>
            <a onClick={()=>navigate("/area_personale")}>area personale</a>
        </>
    )
}