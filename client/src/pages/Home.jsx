import { useContext, useEffect, useState } from "react"
import Navbar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
import Filter from "../components/Filter"
import axios from "axios"
import { UserContext, MovieTitleContext, MoviesContext } from "../App"


export default function Home(){
    const {user,setUser} = useContext(UserContext)
    const {movieTitle,setMovieTitle} = useContext(MovieTitleContext)
    const {movies,setMovies} = useContext(MoviesContext)
    const [filterBy,setFilterBy] = useState("")
    
    useEffect(()=>{
        try {
            axios.get("https://api.themoviedb.org/3/movie/popular?language=en",{
                params: { api_key: "ae7e3d3ba153dd817538a94cd60ac92e" }
            })
            .then(res=>setMovies(res.data.results))
            .catch(err=>console.log(err))
        } catch (error){
            console.log(error)
        }
        
    },[])

    useEffect(()=>{
        try {
            axios.get(`https://api.themoviedb.org/3/movie/${filterBy}?language=en-US`,{
                params: { api_key: "ae7e3d3ba153dd817538a94cd60ac92e" }
            })
            .then(res=>{
                if(res.data.results){
                    setMovies(res.data.results)
                }else{
                    setMovies([res.data])
                }
            })
        } catch (error) {
            console.log(error)
        }
    },[filterBy])

    return(
        <>
            <Navbar user={user} setUser={setUser}></Navbar>
            <SearchBar movieTitle={movieTitle} setMovieTitle={setMovieTitle}/>
            <Filter filterBy={filterBy} setFilterBy={setFilterBy}></Filter>
            {movies && movies.map((movie,index)=>(<Card movie={movie} key={index}></Card>))}
        </>
    )
}