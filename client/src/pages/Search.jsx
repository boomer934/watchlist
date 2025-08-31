import {useContext} from "react"
import Navbar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
import { useLocation } from "react-router-dom"
import { UserContext,MovieTitleContext } from "../App"
import BackToHome from "../components/BackToHome"
import Footer from "../components/Footer"
export default function Search() {
    
    const {user,setUser} = useContext(UserContext)
    const {movieTitle,setMovieTitle} = useContext(MovieTitleContext)
    const movies = useLocation().state?.movies || [];

    return (
        <>
            <Navbar user={user} setUser={setUser}></Navbar>
            <SearchBar movieTitle={movieTitle} setMovieTitle={setMovieTitle}/>
            <BackToHome/>
            {movies && movies.filter((movie)=>(movie.poster_path !== null)).map((movie,index)=>(<Card movie={movie} key={index}></Card>))}
            <Footer/>
        </>
    )
}