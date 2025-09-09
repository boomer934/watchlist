import React from 'react'
import { Pencil } from 'lucide-react'

export default function Update({ aggiorna , setAggiorna,elimina ,setElimina }) {
    
  return (
    <>
    {aggiorna && elimina&&( setElimina(prev=>!prev))}
    <button
    onClick={() => setAggiorna(aggiorna => !aggiorna)}
    className="flex items-center justify-center h-[44px] w-[44px] bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 text-white rounded-lg transition-transform duration-200 hover:scale-105"
    >
        <Pencil size={20} />
    </button>
    </>
  )
}
