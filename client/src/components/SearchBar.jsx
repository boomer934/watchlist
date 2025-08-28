import { useEffect } from "react"
import axios from "axios"
export default function SearchBar({movieTitle,setMovieTitle,movies,setMovies}) {
    const handleSubmit = () => {
        const res = axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
                api_key: "ae7e3d3ba153dd817538a94cd60ac92e",
                query: movieTitle
            }
        })
        .then(res => {
            res.data
            console.log(res.data.results)
            setMovies(res.data.results)
            setMovieTitle("")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="flex flex-row p-5 pb-3 mb-3 justify-center gap-2 border-b-2 border-gray-300">
            <input 
            type="text"
            placeholder="Cerca un film..."
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            className=" px-3 my-2 outline-1 outline-gray-500 rounded-3xl"/>
            <button 
            onClick={handleSubmit}
            className=" px-3 py-1 my-2 outline-1 outline-gray-500 rounded-3xl focus:scale-110 focus:bg-gray-200  transition ease-in-out duration-200 ">Cerca</button>
        </div>
    )
}