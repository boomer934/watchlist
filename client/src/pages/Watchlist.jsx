import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import WatchlistCards from '../components/WatchlistCards'
import { useLocation } from 'react-router-dom'
import { useState,useEffect } from 'react'
import FilterWatchList from '../components/FilterWatchList'
import { use } from 'react'
import Delete from '../components/Delete'
export default function Watchlist() {
  const [filter, setFilter] = useState("tutti")
  const [elimina,setElimina] = useState(false)
  const location = useLocation();
  useEffect(() => {
    console.log(filter);
  },[filter])
  return (
    <div className="flex flex-col h-full justify-end">
      <Navbar/>
      <div className='flex justify-around items-center'>
        <FilterWatchList filter={filter} setFilter={setFilter}/>
        <Delete elimina={elimina} setElimina={setElimina}/>
      </div>
      {filter === "tutti" && <WatchlistCards location={location} elimina={elimina} />}
      {filter === "da vedere" && <WatchlistCards location={location} filter={filter} />}
      {filter === "visto" && <WatchlistCards location={location} filter={filter} />}
      <Footer className="absolute bottom-0"/>
    </div>
  )
}
