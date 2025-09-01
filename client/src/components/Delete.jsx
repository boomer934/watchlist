import React from 'react'

export default function Delete({elimina,setElimina}) {
  return (
    <button onClick={() => setElimina(!elimina)}
    className='text-white h-[45px] p-1 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center scale-80 hover:scale-100 transition ease-in-out duration-300'>
        Elimina
    </button>
  )
}
