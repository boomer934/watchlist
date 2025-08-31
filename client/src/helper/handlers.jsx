import axios from "axios";
import { useReducer } from "react";
import { useParams } from "react-router-dom";


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
export const handleRedirect = (movie, navigate) => {
    axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: {
            api_key: "ae7e3d3ba153dd817538a94cd60ac92e",
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res => {
        console.log(res.data);
        navigate(`/home/search/movie/${movie.id}`, { state: { movie: res.data } });
    })
    .catch(error => {
        console.error('Errore nel recupero del film:', error.response?.data?.message || error.message);
    });
};

export const getWatchProviders = async(movieId)=>{

    try {
        const res = await axios.get(` https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
            {
                params : {api_key: "ae7e3d3ba153dd817538a94cd60ac92e"},
                headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
            }
        )
        console.log(res.data)
        return res.data
    } catch (error) {
        console.error(error.response.data.message)
    }
}



export const redirectToProvider = (provider, movieTitle) => {
    const LINK = {
        "Netflix": "https://www.netflix.com/search?q=",
        "Netflix Standard with Ads": "https://www.netflix.com/search?q=", // Stesso pattern di ricerca
        "YouTube": "https://www.youtube.com/results?search_query=",
        "Apple TV": "https://tv.apple.com/search?term=",
        "Rakuten TV": "https://www.rakuten.tv/search?q=", // Pattern di ricerca verificato
        "Timvision": "https://www.timvision.it/search?q=", // Pattern di ricerca verificato
        "Amazon Video": "https://www.amazon.com/s?k=", // Pattern generico per Amazon Video
        "Amazon Prime Video": "https://www.primevideo.com/search/ref=atv_nb_sr?phrase=",
        "Amazon Prime Video with Ads": "https://www.primevideo.com/search/ref=atv_nb_sr?phrase=", // Stesso pattern di ricerca
    };

    console.log(movieTitle + " / " + provider);

    const baseUrl = LINK[provider];
    if (!baseUrl) {
        alert("Provider non supportato");
        console.error("Provider non supportato:", provider);
        return;
    }

    const url = baseUrl + encodeURIComponent(movieTitle);

    // Per aprire in una nuova scheda esterna
    window.open(url, "_blank");

    // Se invece vuoi usare React Router (ma in questo caso sono link esterni, quindi poco utile):
    // navigate(url);
};

export const getMovies = async (filterBy = "popular") => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${filterBy}?language=en`,
      {
        params: { api_key: "ae7e3d3ba153dd817538a94cd60ac92e" },
      }
    );
    return res.data || []
  } catch (error) {
    console.error(error)
    return [] 
  }
};

export const toProfileOrLogin = (navigate,token)=>{
    if(!token){
        alert("Devi essere loggato per vedere il tuo profilo")
        navigate("/login")
    }
    else navigate("/profile")
}
