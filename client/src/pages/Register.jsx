import FormRegister from '../components/FormRegister'
import { useState } from 'react'
import Navbar from '../components/NavBar'

export default function Register(){

    const [user,setUser] = useState({name:"",surname:"",email:"",password:""})
    return(
        <>
            <Navbar></Navbar>
            <FormRegister user={user} setUser={setUser}></FormRegister>
        </>
    )
}