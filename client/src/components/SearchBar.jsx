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
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <input 
            type="text"
            placeholder="Cerca un film..."
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            />
            <button onClick={handleSubmit}>Cerca</button>
        </div>
    )
}