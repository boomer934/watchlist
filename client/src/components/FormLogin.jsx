import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function FormLogin({ user, setUser }) {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/login", user)
      localStorage.setItem("token", response.data.token)
      if (response.status === 200) {
        navigate('/home')
      }
    } catch (error) {
      alert(error.response.data.message)
      console.error(error)
    }
    setUser({ email: "", password: "" })
  }

  return (
    <div className="flex flex-col items-center h-full mt-8">
      <h1 className="text-4xl p-2.5">Accedi</h1>
      <form onSubmit={handleSubmit} className="w-full flex items-start justify-center flex-col h-auto rounded-3xl p-6 pt-0">
        <label htmlFor="email" className="self-start">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={({ target }) => setUser({ ...user, email: target.value })}
          placeholder="Inserisci la tua email..."
          className="focus:outline-0 p-1 my-2 outline-1 outline-gray-500 rounded-3xl w-full"
        />
        <label htmlFor="password" className="self-start">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={({ target }) => setUser({ ...user, password: target.value })}
          placeholder="Inserisci la tua password..."
          className="focus:outline-0 p-1 my-2 outline-1 outline-gray-500 rounded-3xl w-full"
        />
        <input
          type="submit"
          value="Accedi →"
          className="bg-amber-500 w-full md:w-1/3 h-8 cursor-pointer rounded-md text-white font-semibold"
        />
      </form>
    </div>
  )
}
