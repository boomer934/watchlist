import { useContext, useEffect, useState } from "react"
import Navbar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
import Filter from "../components/Filter"
import { UserContext, MovieTitleContext, MoviesContext,OpenStateContext } from "../App"
import { useQuery } from "@tanstack/react-query"
import { getMovies } from "../helper/handlers"
import Footer from "../components/Footer"
import PagesNavigation from "../components/PagesNavigation"
import { useParams } from "react-router-dom"

export default function Home(){
    const {pageId} = useParams()
    const {user,setUser} = useContext(UserContext)
    const {movies,setMovies} = useContext(MoviesContext)
    const {movieTitle,setMovieTitle} = useContext(MovieTitleContext)
    const [filterBy,setFilterBy] = useState("popular")
    
    
    const{
        data:queryMovies,
        error,
        status
    }=useQuery({
        queryKey:["AllMovies",filterBy,movies,pageId],
        queryFn:()=>getMovies(filterBy,pageId),
    })

      useEffect(() => {
            if (queryMovies) {
                console.log(queryMovies); 
                setMovies(queryMovies);
            }
        }, [queryMovies,pageId]);

        useEffect(()=>{
            console.log(pageId)
        },[pageId])
    return(
        <>
            <Navbar></Navbar>
            <SearchBar movieTitle={movieTitle} setMovieTitle={setMovieTitle}/>
            <Filter filterBy={filterBy} setFilterBy={setFilterBy}></Filter>
            <div 
            className="relative h-full md:grid md:grid-cols-2 md:gap-2 md:grid-flow-row xl:grid-cols-3 xl:gap-2">
                {movies?.results?.map((movie) => (
                    <Card movie={movie} key={movie.id + movie.title} />
                ))}
            </div>
            <PagesNavigation pageId={pageId}/>
            <Footer/>
        </>
    )
}