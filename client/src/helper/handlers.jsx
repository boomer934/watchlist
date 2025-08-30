import axios from "axios";


export const handleClick = async (movie,setAdd) => {
    const token = localStorage.getItem("token");
    try {
        const res = await axios.post(
        "http://localhost:5000/watchlist",
        movie,
        { headers: { Authorization: `Bearer ${token}` } }
        );

        setAdd("Aggiunto");
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setAdd("Già in watchlist");
        } else {
            console.error("Errore durante l'aggiunta:", error);
        }
    }
}
export const handleRedirect = (movie,navigate) =>{
    try {
        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`,{
            params: {
                api_key: "ae7e3d3ba153dd817538a94cd60ac92e",
            },
            headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        .then(res=>{
            console.log(res.data)
            navigate(`/home/search/movie`,{state:{movie:res.data}})
        })
        }catch (error) {
            console.error(error.response.data.message)
        }
         
}
