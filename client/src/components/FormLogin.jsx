import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import { UserContext, UserNameContext } from '../App'

export default function FormLogin() {
  const {user,setUser} = useContext(UserContext)
  const {userName,setUserName} = useContext(UserNameContext)
  const [invalid, setInvalid] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, user)
      console.log(response)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("name", response.data.name)
      setUserName(localStorage.getItem("name"))
      setUser({name:response.data.name,surname:response.data.surname,email:response.data.email})
      if (response.status === 200) {
        navigate('/')
      }
    } catch (error) {
      setInvalid(true)
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-amber-200 to-amber-50 px-4">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-md p-8 md:p-12 flex flex-col">
        <h1 className="text-4xl font-bold text-center text-amber-600 mb-6">Accedi</h1>
        {invalid && <p className="text-red-500 text-center mb-4">Email o password errati</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user?.email}
              onChange={({ target }) => setUser({ ...user, email: target.value })}
              placeholder="Inserisci la tua email..."
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user?.password}
              onChange={({ target }) => setUser({ ...user, password: target.value })}
              placeholder="Inserisci la tua password..."
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
          </div>

          <input
            type="submit"
            value="Accedi →"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl cursor-pointer transition duration-200"
          />
        </form>

        <p className="text-center mt-6 text-gray-600">
          Non hai un account?{" "}
          <span
            className="text-amber-600 font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Registrati
          </span>
        </p>
      </div>
    </div>
  )
}
