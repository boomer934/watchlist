import { useQuery } from '@tanstack/react-query'
import { getWatchlistMovies } from '../helper/handlers'
import { useNavigate } from 'react-router-dom'
import { handleRedirect,deleteFilm } from '../helper/handlers'
import { useContext,useState } from 'react'
import { MovieTitleContext } from '../App'
export default function WatchlistCards({ location,filter="tutti",elimina=false }) {
    
    const navigate=useNavigate()
    const [eliminato,setEliminato]=useState(false)
    const {movieTitle,setMovieTitle}=useContext(MovieTitleContext)
    const [movieId, setMovieId] = useState(null);
    const{
        error,
        isError,
        isLoading,
        data:queryMovies,
    }=useQuery({
        queryKey:["WatchlistMovies",filter,eliminato],
        queryFn:()=>getWatchlistMovies(movieTitle,filter),
        refetchInterval: elimina ? 1000 : false
    })

    if (isError) return <p>Errore: {error.message}</p>
    console.log("queryMovies:", queryMovies)

    return (
        <>
        <div className='grid grid-flow-row grid-cols-3 gap-3 p-3'>
            {isLoading &&(
                <div className=" w-[140px] h-[200px] bg-gray-400/50 p-3 m-3 rounded-md flex justify-center items-center">
                <div className="w-16 h-16 border-b-2 border-black animate-spin rounded-full"></div>
            </div>
            )}
            {queryMovies?.map((movie) => (
            <div className='relative'>
            {elimina &&(
                <button
                onClick={()=>deleteFilm(movie.db_id,eliminato,setEliminato)}
                className='absolute text-[15px] p-2 h-[37px] w-[37px] top-1 right-1 text-white text-2xl bg-red-500 rounded-full text-center'>
                    x
                </button>
            )}
            <img 
            key={movie.id+movie.original_movie_id} 
            onClick={()=>handleRedirect(movie,navigate,location)}
            className="w-[140px] h-[200px] rounded-lg"
            src={`https://image.tmdb.org/t/p/w500/${movie.image_url}`} 
            alt={movie.title} />

            </div>
            ))}
        </div>
        </>
    )
}

