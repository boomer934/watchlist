import Home from './pages/Home'
import Login from './pages/Login'
import PersonalArea from './pages/PersonalArea'
import Register from './pages/Register'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/area_personale' element={<PersonalArea/>}/>
        </Routes>
      </Router>
    </>
    
  )
}

export default App