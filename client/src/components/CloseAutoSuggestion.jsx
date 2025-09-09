import React from 'react'
import { OpenStateContext,MovieTitleContext } from '../App'
import { useContext } from 'react'
export default function CloseAutoSuggestion() {
    const {isOpenState,setIsOpenState} = useContext(OpenStateContext)
    const {movieTitle,setMovieTitle} = useContext(MovieTitleContext)
  return (
    <>
        {isOpenState && movieTitle &&(
            <div 
        onClick={()=>{setIsOpenState(prev=>!prev)}}
        className="absolute right-0 top-0 p-1 mt-3 mr-3 w-[30px] h-[30px] z-50 flex justify-center items-center rounded-3xl bg-gray-500/50 focus:bg-gray-500 hover:bg-gray-500 cursor-pointer focus:scale-110 hover:scale-110 transform duration-100 ease-in-out">
            <span className='p-1'>X</span>
        </div>
        )}
  </>
  )
}
