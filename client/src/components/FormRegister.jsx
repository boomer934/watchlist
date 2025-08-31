import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function RegisterForm({ user, setUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", user);
      setUser({ name: "", surname: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center h-full mt-8">
      <h1 className="text-4xl p-2.5">Registrati</h1>
      <form onSubmit={handleSubmit} className="w-full flex items-start justify-center flex-col h-auto rounded-3xl p-6 pt-0 ">
        <label htmlFor="name" className="self-start">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={({ target }) => setUser({ ...user, name: target.value })}
          placeholder="es: Mario"
          className="focus:outline-0 p-1 my-2 outline-1 outline-gray-500 rounded-3xl w-full"
        />
        <label htmlFor="surname" className="self-start">
          Cognome
        </label>
        <input
          type="text"
          name="surname"
          value={user.surname}
          onChange={({ target }) => setUser({ ...user, surname: target.value })}
          placeholder="es: Rossi"
          className="focus:outline-0 p-1 my-2 outline-1 outline-gray-500 rounded-3xl w-full"
        />
        <label htmlFor="email" className="self-start">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={({ target }) => setUser({ ...user, email: target.value })}
          placeholder="es: mariorossi@gmail.com"
          className="focus:outline-0 p-1 my-2 outline-1 outline-gray-500 rounded-3xl w-full"
        />
        <label htmlFor="password" className="self-start">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={({ target }) => setUser({ ...user, password: target.value })}
          placeholder="es: segretissima1234"
          className="focus:outline-0 p-1 outline-1 outline-gray-500 rounded-3xl w-full"
        />
        <input
          type="submit"
          value="Sign Up →"
          className="bg-amber-500 w-full h-8 cursor-pointer text-white font-semibold mt-5 self-center rounded-3xl focus:scale-110 focus:bg-red-600 focus:transition duration-300 ease-in-out"
        />
      </form>
    </div>
  );
}
