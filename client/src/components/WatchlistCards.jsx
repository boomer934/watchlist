import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getWatchlistMovies } from '../helper/handlers'
export default function WatchlistCards() {
    const{
        error,
        isError,
        isLoading,
        data:queryMovies
    }=useQuery({
        queryKey:["WatchlistMovies"],
        queryFn:()=>getWatchlistMovies(),
    })

  if (isLoading) return <p>Caricamento...</p>
  if (isError) return <p>Errore: {error.message}</p>
    console.log("queryMovies:", queryMovies)

    return (
        <div className='grid grid-flow-row grid-cols-4 gap-4'>
            {queryMovies?.map((movie) => (
            <img 
            key={movie.id} 
            className="w-[140px] h-[200px]"
            src={`https://image.tmdb.org/t/p/w500/${movie.image_url}`} 
            alt={movie.title} />
            ))}
        </div>
    )
}

