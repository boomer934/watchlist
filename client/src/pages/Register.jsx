import FormRegister from '../components/FormRegister'
import { useState } from 'react'

export default function Register(){

    const [user,setUser] = useState({name:"",surname:"",email:"",password:""})
    return(
        <>
            <FormRegister user={user} setUser={setUser}></FormRegister>
        </>
    )
}