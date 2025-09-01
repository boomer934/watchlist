import { useQuery } from '@tanstack/react-query'
import { getWatchlistMovies } from '../helper/handlers'
import { useNavigate } from 'react-router-dom'
import { handleRedirect } from '../helper/handlers'
import { useContext } from 'react'
import { MovieTitleContext } from '../App'
export default function WatchlistCards(location) {
    
    const navigate=useNavigate()
    const {movieTitle,setMovieTitle}=useContext(MovieTitleContext)
    const{
        error,
        isError,
        isLoading,
        data:queryMovies
    }=useQuery({
        queryKey:["WatchlistMovies"],
        queryFn:()=>getWatchlistMovies(movieTitle),
    })

    if (isLoading) return <p>Caricamento...</p>
    if (isError) return <p>Errore: {error.message}</p>
    console.log("queryMovies:", queryMovies)

    return (
        <div className='grid grid-flow-row grid-cols-3 gap-3 p-3'>
            {queryMovies?.map((movie) => (
            <img 
            key={movie.id+movie.original_movie_id} 
            onClick={()=>handleRedirect(movie,navigate,location)}
            className="w-[140px] h-[200px] rounded-lg"
            src={`https://image.tmdb.org/t/p/w500/${movie.image_url}`} 
            alt={movie.title} />
            ))}
        </div>
    )
}

