import { useState } from 'react'
import { XCircleIcon } from 'lucide-react'
import { handleSubmit } from '../helper/handlers'

export default function EditMoviePopUp({editMovie,setEditMovie}) {

    const [status,setStatus] = useState("visto")
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
        
        <div className=' flex flex-col'>
            <form 
            onSubmit={(e)=> handleSubmit(e,status,editMovie)}
            className='relative flex flex-col bg-gray-200 p-4 h-[300px] w-[200px] justify-center items-center rounded-lg'>
                <div 
                onClick={()=>setEditMovie(null)}
                className='absolute top-4 right-4 cursor-pointer'>
                    <XCircleIcon className=' cursor-pointer' />
                </div>
                <h2 className='text-lg font-semibold mb-4'>Modifica stato film</h2>
                <select className='text-center bg-gray-300 rounded-md p-2 m-2 ' name="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option value="visto">Visto</option>
                    <option value="da vedere">Da vedere</option>
                </select>
                <input type="submit" value="Modifica" className='bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 text-white rounded-lg transition-transform duration-200 hover:scale-105 p-2'/>
            </form>
        </div>
        
    </div>
  )
}
