import FormLogin from "../components/FormLogin"
import { useState } from 'react'
import Navbar from "../components/NavBar"
export default function Login(){

    const [user,setUser] = useState({name:"",surname:"",email:"",password:""})
    return(
        <>
            <Navbar></Navbar>
            <FormLogin user={user} setUser={setUser}></FormLogin>
        </>
    )
}