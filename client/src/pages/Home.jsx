import { useContext, useEffect, useState } from "react"
import Navbar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
import Filter from "../components/Filter"
import axios from "axios"
import { UserContext, MovieTitleContext, MoviesContext,OpenStateContext } from "../App"
import { useQuery } from "@tanstack/react-query"
import { getMovies } from "../helper/handlers"
import Footer from "../components/Footer"

export default function Home(){
    const {user,setUser} = useContext(UserContext)
    const {movies,setMovies} = useContext(MoviesContext)
    const {movieTitle,setMovieTitle} = useContext(MovieTitleContext)
    const [filterBy,setFilterBy] = useState("popular")
    
    
    const{
        data:queryMovies,
        error,
        status
    }=useQuery({
        queryKey:["AllMovies",filterBy],
        queryFn:()=>getMovies(filterBy),
        refetchOnWindowFocus:false,
    })

      useEffect(() => {
            if (queryMovies) {
            setMovies(queryMovies);
            }
        }, [queryMovies]);

    return(
        <>
            <Navbar user={user} setUser={setUser}></Navbar>
            <SearchBar movieTitle={movieTitle} setMovieTitle={setMovieTitle}/>
            <Filter filterBy={filterBy} setFilterBy={setFilterBy}></Filter>
            <div 
            className="relative h-full md:grid md:grid-cols-2 md:gap-2 md:grid-flow-row lg:grid-cols-3 lg:gap-2">
                {movies?.map((movie) => (
                    <Card movie={movie} key={movie.id + movie.title} />
                ))}
            </div>
            <Footer/>
        </>
    )
}