import FormLogin from "../components/FormLogin"
import { useState } from 'react'
export default function Login(){

    const [user,setUser] = useState({name:"",surname:"",email:"",password:""})
    return(
        <>
            <FormLogin user={user} setUser={setUser}></FormLogin>
        </>
    )
}