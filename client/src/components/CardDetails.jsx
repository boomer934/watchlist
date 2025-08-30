import { useContext } from "react"
import { UserContext } from "../App"
import { useLocation } from "react-router-dom"
import Navbar from "./NavBar"
export default function CardDetails(){

    const {user,setUser} = useContext(UserContext)
    const movie = useLocation().state?.movie

    return (
        <>
            <Navbar user={user} setUser={setUser}/>
        </>
    )
}