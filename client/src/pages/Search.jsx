import {useContext , useEffect} from "react"
import Navbar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
import { useLocation, useParams } from "react-router-dom"
import { UserContext,MovieTitleContext,MoviesContext } from "../App"
import BackToHome from "../components/BackToHome"
import Footer from "../components/Footer"
import PagesNavigation from "../components/PagesNavigation"
import { useQuery } from "@tanstack/react-query"
import { searchMovies } from "../helper/handlers"
export default function Search() {
    
    const {movieTitleParam,pageId} = useParams()
    const {user,setUser} = useContext(UserContext)
    const {movieTitle,setMovieTitle} = useContext(MovieTitleContext)
    const {movies,setMovies} = useContext(MoviesContext)

        const{
        data:queryMovies,
        error,
        status
    }= useQuery({
        queryKey: ["Movies", movieTitleParam, pageId],
        queryFn: () =>
            movieTitleParam
            ? searchMovies(movieTitleParam, pageId) // se ho un titolo → search
            : getMovies("popular", pageId),         // altrimenti → lista
        });

            useEffect(() => {
        if (queryMovies) {
            setMovies(queryMovies);
        }
        }, [queryMovies]);

    return (
        <div className="flex flex-col h-full justify-end">
            <Navbar user={user} setUser={setUser}></Navbar>
            <SearchBar movieTitle={movieTitle} setMovieTitle={setMovieTitle} pageId={pageId}/>
            <BackToHome/>
            {movies?.results?.map((movie)=>(<Card movie={movie} key={movie.id+movie.title}></Card>))}
            <PagesNavigation pageId={pageId} movieTitleParam={movieTitleParam}/>
            <Footer/>
        </div>
    )
}