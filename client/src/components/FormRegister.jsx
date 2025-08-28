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
    <div className=' flex flex-col items-center justify-center h-dvh'>
      <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col h-auto rounded-3xl p-6 pt-0'>
        <label htmlFor="name" className=' self-start'>nome:</label>
        <input 
        type="text"
        name="name"
        value={user.name}
        onChange={(e)=>setUser({...user,name:e.target.value})} 
        placeholder='Inserisci il tuo nome...'
        className='focus:outline-0 p-1'/>
        <label htmlFor="surname" className=' self-start'>cognome:</label>
        <input 
        type="text"
        name="surname"
        value={user.surname}
        onChange={(e)=>setUser({...user,surname:e.target.value})} 
        placeholder='Inserisci il tuo cognome...'
        className='focus:outline-0 p-1'/>
        <label htmlFor="email" className=' self-start'>email:</label>
        <input 
          type="email" 
          name="email" 
          id="emailUtente"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Inserisci la tua email.." 
          className='focus:outline-0 p-1'
        />
        <label htmlFor="password" className=' self-start'>password:</label>
        <input 
          type="password" 
          name="password" 
          id="userPassword"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Inserisci la tua password.."
          className='focus:outline-0 p-1' 
        />
        <input 
          type="submit" 
          value="Invia" 
          className="bg-amber-500 w-20 h-8 cursor-pointer rounded-md text-white font-semibold" 
        />
      </form>
    </div>
      
    </>
  )
}
