import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Search from './pages/Search'
import { createContext, useState } from 'react'
import CardDetails from './components/CardDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'
import Watchlist from './pages/Watchlist'

const queryClient = new QueryClient()
const UserContext = createContext()
const MovieTitleContext = createContext()
const MoviesContext = createContext()
const MovieContext = createContext()
const OpenStateContext = createContext()
const UserNameContext = createContext()
function App() {
  const [user,setUser] = useState({name:"",surname:"",email:"",password:""})
  const [movieTitle,setMovieTitle] = useState("")
  const [movies,setMovies] = useState([{}])
  const [movie,setMovie] = useState({})
  const [isOpenState,setIsOpenState] = useState(false)
  const [userName, setUserName] = useState("")
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{user,setUser}}>
        <MovieTitleContext.Provider value={{movieTitle,setMovieTitle}}>
          <MoviesContext.Provider value={{movies,setMovies}}>
            <MovieContext.Provider value={{movie,setMovie}}>
              <OpenStateContext.Provider value={{isOpenState,setIsOpenState}}>
                  <UserNameContext.Provider value={{userName,setUserName}}>
                    <Router>
                        <Routes>
                          <Route path='/' element={<Navigate to={'/home/page/1'}/>}/>
                          <Route path='/register' element={<Register/>}/>
                          <Route path='/login' element={<Login/>}/>
                          <Route path='/home/page/:pageId' element={<Home/>}/>
                          <Route path='/home/search/:movieTitleParam/:pageId' element={<Search/>}/>
                          <Route path='/home/watchlist' element={<Watchlist/>}/>
                          <Route path={`/home/search/movie/:id`} element={<CardDetails/>}/>
                        </Routes>
                      </Router>
                  </UserNameContext.Provider>
              </OpenStateContext.Provider>
            </MovieContext.Provider>
          </MoviesContext.Provider>
        </MovieTitleContext.Provider>
      </UserContext.Provider>
    </QueryClientProvider>
    </>
    
  )
}
export {UserContext,MovieTitleContext,MoviesContext,OpenStateContext,MovieContext,UserNameContext}
export default App