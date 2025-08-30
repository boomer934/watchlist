import { useContext, useEffect } from "react"
import { MovieTitleContext, MoviesContext, MovieContext } from "../App"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function AutoSuggestion({isOpenState,setIsOpenState}){
    const {movies,setMovies} = useContext(MoviesContext)
    const {movieTitle,setMovieTitle} = useContext(MovieTitleContext)
    const {movie,setMovie} = useContext(MoviesContext)
    const navigate = useNavigate()

    const handleClick = (movie) =>{
        setMovie(movie)
        navigate("/home/search/movie",{state:{movie:movie}})
    }

    useEffect(()=>{
        try {
            axios.get("https://api.themoviedb.org/3/search/movie",{
                params: {
                    api_key: "ae7e3d3ba153dd817538a94cd60ac92e",
                    query: movieTitle
                }
            })
            .then(res=>setMovies(res.data.results))
        } catch (error) {
            console.error(error.response.data.message)
        }
    },[movieTitle])

    
    return(
        <div className="flex justify-center">
            {isOpenState && movieTitle && movies ? (
                <div className=" absolute h-[224px] w-[180px]   top-[145px] rounded-xl p-4 overflow-y-scroll bg-gray-400 shadow-md">
                    <ul className=" flex flex-col gap-2 justify-start">
                        {movies.filter((movie)=> movie.poster_path !== null && movie.release_date !== null).map((movie,index)=>(
                            <li 
                            key={index}
                            onClick={handleClick(movie)} 
                            className="flex flex-row gap-1">
                                <img 
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}` }
                                alt={movie.title} 
                                className="max-h-[60px] max-w-[60px]"/>
                                <div className=" flex flex-col">
                                    <button className=" text-left max-h-[50px] line-clamp-2 flex">
                                        {movie.title}
                                    </button>
                                    <span className="text-[10px]">{movie.release_date.slice(0,4)} TV</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ):(
                <></>
            )}
        </div>
    )
}