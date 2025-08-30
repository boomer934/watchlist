import axios from "axios"
import { useEffect, useState } from "react"
export default function Card({movie}){
    const [add, setAdd] = useState("Aggiungi")
    const handleClick = async () => {
    const token = localStorage.getItem("token");
    try {
        const res = await axios.post(
        "http://localhost:5000/watchlist",
        movie,
        { headers: { Authorization: `Bearer ${token}` } }
        );

        setAdd("Aggiunto");
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setAdd("Già in watchlist");
        } else {
            console.error("Errore durante l'aggiunta:", error);
        }
    }
    };
    useEffect(()=>{
        if (add === "Aggiunto"  || add === "Già in watchlist") {
            setTimeout(() => {
                setAdd("Aggiungi");
            }, 3000);
        }
    },[add])

    return(
        <>
        {movie && movie.poster_path !== undefined ? (
            <div className="flex flex-row justify-start p-3 m-3 gap-4 h-[224px] rounded-md bg-gray-400/50">
               <img 
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                    alt={movie.original_title} 
                    className="w-[140px] h-[200px]"/>
               <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                    <h2 className="font-bold">{movie.original_title}</h2>
                    <button 
                    className="bg-gray-400/50 focus:bg-gray-400/70 focus:scale-110 p-1 rounded-md min-h-[32px] transition ease-in-out duration-100"
                    onClick={handleClick}
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
            <p>Loading...</p>
        )}
            
        </>
    )
}