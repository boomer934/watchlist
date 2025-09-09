import { useContext, useEffect, useState } from "react"
import { MovieTitleContext, MoviesContext, MovieContext } from "../App"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import CloseAutoSuggestion from "./CloseAutoSuggestion"
export default function AutoSuggestion({isOpenState,setIsOpenState}){
    const {movieTitle,setMovieTitle} = useContext(MovieTitleContext)
    const {movie,setMovie} = useContext(MovieContext)
    const [moviesSuggestion,setMoviesSuggestion] = useState([{}])
    const navigate = useNavigate()

    const handleClick = (movie) =>{
        setMovie(movie)
        setIsOpenState(false)
        try{
            const token = localStorage.getItem("token")
            axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`,{
            params:{
                api_key: "ae7e3d3ba153dd817538a94cd60ac92e",
            },
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res=>navigate(`/home/search/movie/${movie.id}`,{state:{movie:res.data}}))
        .catch(err=>console.log(err))
        } catch (error){
            console.error(error.response.data.message)
        }
    }

    useEffect(()=>{
        try {
            axios.get("https://api.themoviedb.org/3/search/movie",{
                params: {
                    api_key: "ae7e3d3ba153dd817538a94cd60ac92e",
                    query: movieTitle
                }
            })
            .then(res=>setMoviesSuggestion(res.data.results))
        } catch (error) {
            console.error(error.response.data.message)
        }
    },[movieTitle])

    return(
        <div className="realtive flex justify-center">
            {isOpenState && movieTitle && moviesSuggestion !== undefined ? (
                <div className=" absolute h-[224px] w-[180px] sm:w-[300px] top-[-20px] rounded-xl p-4 overflow-y-scroll overflow-x-hidden bg-gray-400 shadow-md z-50">
                    <CloseAutoSuggestion/>
                    <ul className=" flex flex-col gap-2 justify-start">
                        {moviesSuggestion.filter((movie)=> movie.poster_path !== null && movie.release_date !== null).map((movie,index)=>(
                            <li 
                            key={index}
                            onClick={()=>handleClick(movie)} 
                            className="flex flex-row gap-1">
                                <img 
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}` }
                                alt={movie.title} 
                                className="max-h-[60px] max-w-[60px]"/>
                                <div className=" flex flex-col">
                                    <button className=" text-left max-h-[50px] flex line-clamp-2">
                                        {movie.title}
                                    </button>
                                    <span className="text-[10px]">{movie.release_date ? movie.release_date.slice(0,4) : "N/A"} TV</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ):(
                <></>
            )
            }
        </div>
        
    )
}