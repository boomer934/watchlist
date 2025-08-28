import axios from 'axios'
export default function FormRegister({ user, setUser }) {
  const handleSubmit = async(e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/register",user)
    .then(res=>res.data)
    setUser({name:"",surname:"",email:"",password:""})
  }
  

  return (
    <>
    
    <div className=' flex flex-col items-center h-dvh mt-8'>
      <h1 className=' text-[20px] p-2.5'>Sign Up For free</h1>
      <form onSubmit={handleSubmit} className='w-full flex items-start justify-center flex-col h-auto rounded-3xl p-6 pt-0'>
        <label htmlFor="name" className=' self-start'>Nome</label>
        <input 
        type="text"
        name="name"
        value={user.name}
        onChange={(e)=>setUser({...user,name:e.target.value})} 
        placeholder='Inserisci il tuo nome...'
        className='focus:outline-0 p-1 my-2 outline-1 outline-gray-500 rounded-3xl w-full'/>
        <label htmlFor="surname" className=' self-start'>Cognome</label>
        <input 
        type="text"
        name="surname"
        value={user.surname}
        onChange={(e)=>setUser({...user,surname:e.target.value})} 
        placeholder='Inserisci il tuo cognome...'
        className='focus:outline-0 p-1 my-2 outline-1 outline-gray-500 rounded-3xl w-full'/>
        <label htmlFor="email" className=' self-start'>Email</label>
        <input 
          type="email" 
          name="email" 
          id="emailUtente"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Inserisci la tua email.." 
          className='focus:outline-0 p-1 my-2 outline-1 outline-gray-500 rounded-3xl w-full'
        />
        <label htmlFor="password" className=' self-start'>Password</label>
        <input 
          type="password" 
          name="password" 
          id="userPassword"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Inserisci la tua password.."
          className='focus:outline-0 p-1 outline-1 outline-gray-500 rounded-3xl w-full' 
        />
        <input 
          type="submit" 
          value="Invia" 
          className="bg-amber-500 w-20 h-8 cursor-pointer rounded-md text-white font-semibold mt-3 self-center focus:scale-110" 
        />
      </form>
    </div>
      
    </>
  )
}
