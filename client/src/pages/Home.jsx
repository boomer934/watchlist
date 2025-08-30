import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
export default function Home(){
    const navigate = useNavigate()
    const [user,setUser] = useState({name:"",surname:"",email:"",password:""})
    const [movieTitle,setMovieTitle] = useState("")
    const [movies,setMovies] = useState([{}])
    
    return(
        <>
            <Navbar user={user} setUser={setUser}></Navbar>
            <SearchBar movieTitle={movieTitle} setMovieTitle={setMovieTitle} movies={movies} setMovies={setMovies}/>
            {movies && movies.filter((movie)=>(movie.poster_path !== null || movie.poater_path !== undefined)).map((movie)=>(<Card movie={movie} key={movie.id}></Card>))}
        </>
    )
}