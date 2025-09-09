import { useQuery } from '@tanstack/react-query'
import { getWatchlistMovies } from '../helper/handlers'
import { useNavigate } from 'react-router-dom'
import { handleRedirect, deleteFilm } from '../helper/handlers'
import { useContext, useState } from 'react'
import { MovieTitleContext } from '../App'
import { Delete, PenSquareIcon } from 'lucide-react'

export default function WatchlistCards({ location, filter="tutti", elimina=false, aggiorna=false, editMovie, setEditMovie }) {
   
    const navigate = useNavigate()
    const [eliminato, setEliminato] = useState(false)
    const { movieTitle } = useContext(MovieTitleContext)
    const { error, isError, isLoading, data: queryMovies } = useQuery({
        queryKey: ["WatchlistMovies", filter, eliminato, editMovie],
        queryFn: () => getWatchlistMovies(movieTitle, filter),
        refetchInterval: elimina ? 1000 : false
    })
    
    if (isError) return <p>Errore: {error.message}</p>
    
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-3">
            {isLoading && (
                <div className="w-full h-[200px] bg-gray-400/50 rounded-md flex justify-center items-center">
                    <div className="w-12 h-12 border-b-2 border-black animate-spin rounded-full"></div>
                </div>
            )}
            {queryMovies?.map((movie) => (
                <div key={movie.db_id} className="relative flex justify-center group">
                    {/* Container per le icone in alto a destra - responsive graduato */}
                    <div className="absolute top-1.5 right-1.5 flex gap-1 z-20 xs:right-2">
                        {aggiorna && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setEditMovie(movie)
                                }}
                                className="flex items-center justify-center h-7 w-7 bg-green-500 hover:bg-green-600 focus:ring-2 focus:outline-none focus:ring-green-300 text-white rounded-full transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
                                title="Modifica film"
                            >
                                <PenSquareIcon className="h-4 w-4" />
                            </button>
                        )}
                        {elimina && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deleteFilm(movie.db_id, eliminato, setEliminato)
                                }}
                                className="flex items-center justify-center h-7 w-7 bg-red-500 hover:bg-red-600 focus:ring-2 focus:outline-none focus:ring-red-300 text-white rounded-full transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
                                title="Elimina film"
                            >
                                <Delete className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    
                    <img
                        onClick={() => handleRedirect(movie, navigate, location)}
                        className="w-full max-w-[140px] sm:max-w-[150px] md:max-w-[160px] lg:max-w-[180px] h-auto rounded-lg object-contain cursor-pointer transition-transform duration-200 hover:scale-105"
                        src={`https://image.tmdb.org/t/p/w500/${movie.image_url}`}
                        alt={movie.title}
                    />
                </div>
            ))}
        </div>
    )
}