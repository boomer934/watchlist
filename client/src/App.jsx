import Home from './pages/Home'
import Login from './pages/Login'
import PersonalArea from './pages/PersonalArea'
import Register from './pages/Register'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Search from './pages/Search'
import { createContext, useState } from 'react'

const UserContext = createContext()
const MovieTitleContext = createContext()
const MoviesContext = createContext()

function App() {
  const [user,setUser] = useState({name:"",surname:"",email:"",password:""})
  const [movieTitle,setMovieTitle] = useState("")
  const [movies,setMovies] = useState([{}])
  return (
    <>
    <UserContext.Provider value={{user,setUser}}>
      <MovieTitleContext.Provider value={{movieTitle,setMovieTitle}}>
        <MoviesContext.Provider value={{movies,setMovies}}>
          <Router>
            <Routes>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/home/search' element={<Search/>}/>
              <Route path='/area_personale' element={<PersonalArea/>}/>
            </Routes>
          </Router>
        </MoviesContext.Provider>
      </MovieTitleContext.Provider>
    </UserContext.Provider>
    </>
    
  )
}
export {UserContext,MovieTitleContext,MoviesContext}
export default App