import React from 'react'
import  {Trash2} from 'lucide-react'

export default function Delete({elimina,setElimina,aggiorna,setAggiorna}) {

  const handleClick = () => {
    setElimina(!elimina)
    if (aggiorna) setAggiorna(prev=>!prev)
  }

  return (
    <>
    {elimina && aggiorna &&( setAggiorna(prev=>!prev))}
    <button
    onClick={handleClick}
    className="flex items-center justify-center h-[44px] w-[44px] bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-white rounded-lg transition-transform duration-200 hover:scale-105"
    >
      <Trash2 size={20} />
    </button>
    </>
  )
}
