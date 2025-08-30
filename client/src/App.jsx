import Home from './pages/Home'
import Login from './pages/Login'
import PersonalArea from './pages/PersonalArea'
import Register from './pages/Register'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Search from './pages/Search'
import { createContext, useState } from 'react'
import CardDetails from './components/CardDetails'

const UserContext = createContext()
const MovieTitleContext = createContext()
const MoviesContext = createContext()
const MovieContext = createContext()
const OpenStateContext = createContext()
function App() {
  const [user,setUser] = useState({name:"",surname:"",email:"",password:""})
  const [movieTitle,setMovieTitle] = useState("")
  const [movies,setMovies] = useState([{}])
  const [movie,setMovie] = useState({})
  const [isOpenState,setIsOpenState] = useState(false)
  return (
    <>
    <UserContext.Provider value={{user,setUser}}>
      <MovieTitleContext.Provider value={{movieTitle,setMovieTitle}}>
        <MoviesContext.Provider value={{movies,setMovies}}>
          <MovieContext.Provider value={{movie,setMovie}}>
            <OpenStateContext.Provider value={{isOpenState,setIsOpenState}}>
              <Router>
                <Routes>
                  <Route path='/register' element={<Register/>}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/home' element={<Home/>}/>
                  <Route path='/home/search' element={<Search/>}/>
                  <Route path='/area_personale' element={<PersonalArea/>}/>
                  <Route path='/home/search/movie' element={<CardDetails/>}/>
                </Routes>
              </Router>
            </OpenStateContext.Provider>
          </MovieContext.Provider>
        </MoviesContext.Provider>
      </MovieTitleContext.Provider>
    </UserContext.Provider>
    </>
    
  )
}
export {UserContext,MovieTitleContext,MoviesContext,OpenStateContext,MovieContext}
export default App