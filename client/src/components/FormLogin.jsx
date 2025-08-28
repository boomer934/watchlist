import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function FormLogin({ user, setUser }) {
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/login",user)
        .then(res=> {
            localStorage.setItem("token",res.data.token)
            if(res.status === 200){
                navigate('/home')
            }
        })
        setUser({email:"",password:""})

    }
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          id="emailUtente"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Inserisci la tua email.." 
        />

        <input 
          type="password" 
          name="password" 
          id="userPassword"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Inserisci qui la tua password.." 
        />

        <input 
          type="submit" 
          value="Invia" 
          className="bg-amber-500 w-20 h-8 cursor-pointer rounded-md text-white font-semibold" 
        />
      </form>
    </>
  )
}
