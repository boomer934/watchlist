import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext, useEffect } from "react"
import { OpenStateContext,MoviesContext,MovieTitleContext } from "../App"
import AutoSuggestion from "./AutoSuggestion"
import CloseAutoSuggestion from "./CloseAutoSuggestion"

export default function SearchBar({pageId=1}){
    const {isOpenState,setIsOpenState} = useContext(OpenStateContext)
    const {movies,setMovies} = useContext(MoviesContext)
    const {movieTitle,setMovieTitle} = useContext(MovieTitleContext)
    const navigate = useNavigate()
    const handleSubmit = () => {
        const res = axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
                api_key: "ae7e3d3ba153dd817538a94cd60ac92e",
                query: movieTitle
            }
        })
        .then(res => {
            res.data
            console.log(res.data)
            setMovies(res.data)
            setIsOpenState(false)
            navigate(`/home/search/${movieTitle}/${pageId}`,{state:{movies:movies}})
            setMovieTitle("")
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(()=>{
        setIsOpenState(true)
    },[movieTitle])

    return (
        <>
            <div className="flex flex-row p-5 pb-3 mb-3 justify-center gap-2 border-b-2 border-gray-400">
                <input 
                type="text"
                placeholder="Cerca un film..."
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        handleSubmit()
                    }
                }}
                className=" px-3 my-2 outline-1 outline-gray-500 rounded-3xl  placeholder:text-black" />
                <button 
                onClick={handleSubmit}
                className=" px-3 py-1 my-2 outline-1 outline-gray-500 rounded-3xl focus:scale-110 focus:bg-gray-200  transition ease-in-out duration-200 ">Cerca</button>
            </div>
            <AutoSuggestion isOpenState={isOpenState} setIsOpenState={setIsOpenState}/>
            <CloseAutoSuggestion/>
        </>
    )
}