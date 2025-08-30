import { handleClick , handleRedirect } from "../helper/handlers"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function Card({movie}){
    
    const {add,setAdd} = useContext(AddContext)
    const navigate = useNavigate()
    

    useEffect(()=>{
        if (add === "Aggiunto"  || add === "Già in watchlist") {
            setTimeout(() => {
                setAdd("Aggiungi");
            }, 3000);
        }
    },[add])

    return(
        <>
        {movie && movie.poster_path !== undefined && movie.poster_path !== null ? (
            <div 
            className="flex flex-row justify-start p-3 m-3 gap-4 h-[224px] rounded-md bg-gray-400/50 "
            onClick={()=>handleRedirect(movie,navigate)}>
               <img 
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                    alt={movie.original_title} 
                    className="w-[140px] h-[200px]"/>
               <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                    <h2 className="font-bold">{movie.title}</h2>
                    <button 
                    className="bg-gray-400/50 focus:bg-gray-400/70 focus:scale-110 p-1 rounded-md min-h-[32px] transition ease-in-out duration-100"
                    onClick={
                        (e) => {
                            e.stopPropagation()
                            handleClick(movie,setAdd)
                        }
                    }
                    >
                        {add}
                    </button>
                </div>
                <div>
                    <span className="text-[14px]">
                        release year : {movie.release_date ? movie.release_date.slice(0,4) : "N/A" }
                    </span>
                </div>
                    
                    <p className=" overflow-auto">{movie.overview}</p>
                </div>
            </div>
        ):(
            <></>
        )}
            
        </>
    )
}