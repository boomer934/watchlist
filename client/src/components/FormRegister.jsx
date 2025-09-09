import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm({ user, setUser }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, user);
      setUser({ name: "", surname: "", email: "", password: "" });
      navigate(`/login`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-amber-200 to-amber-50 px-4">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-md p-8 md:p-12 sm:my-10 flex flex-col">
        <h1 className="text-4xl font-bold text-center text-amber-600 mb-6">Registrati</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={({ target }) => setUser({ ...user, name: target.value })}
              placeholder="Es: Mario"
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="surname" className="mb-1 font-medium text-gray-700">Cognome</label>
            <input
              type="text"
              name="surname"
              value={user.surname}
              onChange={({ target }) => setUser({ ...user, surname: target.value })}
              placeholder="Es: Rossi"
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={({ target }) => setUser({ ...user, email: target.value })}
              placeholder="Es: mariorossi@gmail.com"
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={({ target }) => setUser({ ...user, password: target.value })}
              placeholder="Es: segretissima1234"
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
          </div>

          <input
            type="submit"
            value="Sign Up →"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl cursor-pointer transition duration-200 mt-4"
          />
        </form>

        <p className="text-center mt-6 text-gray-600">
          Hai già un account?{" "}
          <span
            className="text-amber-600 font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Accedi
          </span>
        </p>
      </div>
    </div>
  );
}
