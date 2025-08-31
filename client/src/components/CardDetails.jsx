import { useState, useContext, useEffect } from "react"
import { UserContext,AddContext } from "../App"
import { useLocation, useParams } from "react-router-dom"
import Navbar from "./NavBar"
import { handleClick, getWatchProviders } from "../helper/handlers"
import { useQuery } from "@tanstack/react-query"
import { redirectToProvider } from "../helper/handlers"

export default function CardDetails(){
    
    const {id} = useParams
    const {add,setAdd} = useContext(AddContext)
    const {user,setUser} = useContext(UserContext)
    const movie = useLocation().state?.movie

    useEffect(()=>{
        if (add === "Aggiunto"  || add === "Già in watchlist") {
            setTimeout(() => {
                setAdd("Aggiungi");
            }, 3000);
        }
    },[add])

    const {
        status,
        error,
        data: watchProviders,
    } = useQuery({
        queryKey:["watchProviders",movie.id],
        queryFn: ()=>getWatchProviders(movie.id),
        enabled: !!movie.id
    })

    return (
        <>
            <Navbar user={user} setUser={setUser}/>
            {movie ? (
                <>
                    <div className=" flex flex-col">
                        <div 
                        className=" relative w-full h-[25vh] flex items-end justify-around"
                        >
                            <div 
                            className="absolute w-full h-full z-0 bg-gradient-to-b from-transparent flex flex-col justify-end"
                            style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`}}>
                                <div className=" absolute w-full h-[50px] bg-gradient-to-t from-gray-300 to-transparent"></div>
                            </div>
                            <div className="flex flex-row w-full justify-start items-end">
                                <img 
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} 
                                className="z-10 w-[100px] h-[150px] ml-8 mb-3"/>
                                <button 
                                className="z-10 ml-8 h-auto bg-red-500 text-white text-[13px] p-1 mb-3 rounded focus:bg-red-600 text-center focus:scale-110 transform duration-100 ease-linear"
                                onClick={(e)=>{
                                    handleClick(movie,setAdd)
                                    }}>
                                    {add}
                                </button>
                            </div>
                            
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-left p-4">
                                {movie.title}
                            </h1>
                            <p className="text-left p-4 border-b-gray-400/35 border-b-2">
                                {movie.overview}
                            </p>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold text-left p-4">
                                    Scheda tecnica
                                </h1>
                                <table className="place-self-center text-center bg-gray-300 shadow-xl/30
                                shadow-red-500 rounded-2xl border-separate border-spacing-0 overflow-hidden">
                                    <tbody>
                                        <tr>
                                            <td className="p-4 border-b border-gray-500 font-semibold">Titolo originale:</td>
                                            <td className="p-4 border-b border-gray-500">{movie.original_title}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border-b border-gray-500 font-semibold">Lingua originale:</td>
                                            <td className="p-4 border-b border-gray-500">{movie.original_language}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border-b border-gray-500 font-semibold">Voto:</td>
                                            <td className="p-4 border-b border-gray-500">{movie.vote_average}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border-gray-500 font-semibold">Data di uscita:</td>
                                            <td className="p-4">{movie.release_date}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h2 className=" p-4 font-semibold text-lg text-center">Disponibile ora su</h2>
                                {status === "success" && (
                                    <div className="flex flex-row flex-wrap justify-evenly">
                                        {(watchProviders?.results?.IT?.flatrate ?? watchProviders?.results?.IT?.buy ?? watchProviders?.results?.US?.flatrate ?? watchProviders?.results?.US?.buy ??[]).map(
                                        (provider) => (
                                            <img
                                            src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                                            alt={provider.provider_name}
                                            key={provider.provider_id}
                                            onClick={()=>redirectToProvider(provider.provider_name,movie.title)}
                                            className="w-[70px] h-[65px] m-2 rounded-md"
                                            />
                                        )
                                        )}
                                    </div>
                                )}
                                {
                                    status === "pending" && (
                                        <div className="flex flex-row justify-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </>
            ):(
                <></>
            )}
        </>
    )
}