import { useEffect, useState } from "react"
import axios from "axios"
export default function PersonalArea(){
    const [userData, setUserData] = useState({id:"",email:""})

    useEffect(()=>{
        const token = localStorage.getItem("token")
        console.log(token)
        axios.get("http://localhost:5000/area_personale",{
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res=>{
            setUserData({id:res.data.id,name:res.data.name,surname:res.data.surname,email:res.data.email})
        })
        
    },[])
    return (
        <>
        <h1>Area personale</h1>
        {userData.id || userData.name || userData.surname || userData.email ? (
            <div>
                <p>id: {userData.id}</p>
                <p>name: {userData.name}</p>
                <p>surname: {userData.surname}</p>
                <p>email: {userData.email}</p>
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </>
    )
}