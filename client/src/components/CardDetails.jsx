import { useContext } from "react"
import { UserContext,AddContext } from "../App"
import { useLocation } from "react-router-dom"
import Navbar from "./NavBar"
import { handleClick } from "../helper/handlers"

export default function CardDetails(){

    const {add,setAdd} = useContext(AddContext)
    const {user,setUser} = useContext(UserContext)
    const movie = useLocation().state?.movie

    return (
        <>
            <Navbar user={user} setUser={setUser}/>
            {movie ? (
                <>
                    <div 
                    className=" relative w-full h-[25vh] flex items-end justify-around"
                    >
                        <div 
                        className="absolute mask-b-from-40% mask-b-to-80% w-full h-full z-0"
                        style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`}}></div>
                        <div className="flex flex-row w-full justify-start">
                            <img 
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} 
                            className="z-10 w-[100px] h-[150px] ml-8"/>
                            <button onClick={(e)=>handleClick(movie,setAdd)}>aggiungi alla watchlist</button>
                        </div>
                        
                    </div>
                </>
            ):(
                <></>
            )}
        </>
    )
}