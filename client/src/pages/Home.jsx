import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
import axios from "axios"
export default function Home(){
    const navigate = useNavigate()
    const [user,setUser] = useState({name:"",surname:"",email:"",password:""})
    const [movieTitle,setMovieTitle] = useState("")
    const [movies,setMovies] = useState([{}])
    
    useEffect(()=>{
        try {
            axios.get("https://api.themoviedb.org/3/movie/popular?language=en",{
                params: { api_key: "ae7e3d3ba153dd817538a94cd60ac92e" },
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res=>setMovies(res.data.results))
            .catch(err=>console.log(err))
        } catch (error){
            console.log(error)
        }
        
    },[])
    return(
        <>
            <Navbar user={user} setUser={setUser}></Navbar>
            <SearchBar movieTitle={movieTitle} setMovieTitle={setMovieTitle} movies={movies} setMovies={setMovies}/>
            {movies && movies.filter((movie)=>(movie.poster_path !== null || movie.poater_path !== undefined)).map((movie)=>(<Card movie={movie} key={movie.id}></Card>))}
        </>
    )
}