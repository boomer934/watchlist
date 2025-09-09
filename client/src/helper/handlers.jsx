import axios from "axios";

export const handleClick = async (movie,setAdd,option="da vedere") => {
    console.log("Invio al backend:", movie,option);
    console.log("Token:", localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    try {
        const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/watchlist`,
        { movie,option },
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

export const handleRedirect = (movie, navigate,location) => {
  let url = ""
  let nav = ""
  const pathname = location?.pathname || location?.location?.pathname
  console.log(location)
    if(pathname ==='/home/watchlist'){
        nav = movie.original_movie_id
        url = `https://api.themoviedb.org/3/movie/${movie.original_movie_id}`
    }else{
        nav = movie.id
        url = `https://api.themoviedb.org/3/movie/${movie.id}`
    }
  console.log("Film selezionato:", movie);
    axios.get(url, {
        params: {
            api_key: "ae7e3d3ba153dd817538a94cd60ac92e",
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res => {
        console.log(res.data);
        navigate(`/home/search/movie/${nav}`, { state: { movie: res.data } });
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

export const getMovies = async (filterBy = "popular",pageId) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${filterBy}?language=en?&page=${pageId}`,
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

export const toProfileOrLogin = (navigate) => {
    const token = localStorage.getItem("token");

    if (!token || token === "" || token === "undefined" || token === "null") {
        alert("Devi essere loggato per vedere il tuo profilo");
        navigate("/login");
        return;
    }

    navigate("/home/watchlist");
}

export const searchMovies = async (query, pageId = 1) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: { 
          api_key: "ae7e3d3ba153dd817538a94cd60ac92e",
          query,
          page: pageId
        }
      }
    );
    return res.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const handleLogout = async(user,setUser,userName,setUserName) =>{
    
    try {
        const token = localStorage.getItem("token")
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/logout`,{},{
            headers : {Authorization : `Bearer ${token}`}
        })
        localStorage.clear()
        setUser({})
        setUserName("")
        return res.data
    } catch (error) {
        console.error(error.response.data.message)
    }
}

export const getWatchlistMovies = async (movieTitle,filter) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/watchlist`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    console.log("filter:", filter);
    console.log("Watchlist API:", response);
    if(filter !== "tutti") return response.data.filter((movie) => movie.status === filter)
    return response.data || []; 
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    return []; 
  }
}

export const deleteFilm = async (movieId,eliminato=false,setEliminato) => {
  console.log("movieId:", movieId);
  setEliminato(!eliminato)
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/watchlist/${movieId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data || []; 
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    return []; 
  }
}

export const handleSubmit = async(e,status,editMovie) =>{
  console.log(editMovie.db_id)
  e.preventDefault()
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/watchlist/${editMovie.db_id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    if(response.status === 200) alert("Stato aggiornato con successo")
    return response.data || [];
    } catch (error) {
    console.error("Errore nell'update dello stato:", error);
    throw error;
    }
}