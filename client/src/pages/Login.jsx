import FormLogin from "../components/FormLogin"
import { useContext } from 'react'
import Navbar from "../components/NavBar"
import { UserContext } from "../App"
export default function Login(){

    const {user,setUser} = useContext(UserContext)
    return(
        <>
            <Navbar></Navbar>
            <FormLogin></FormLogin>
        </>
    )
}