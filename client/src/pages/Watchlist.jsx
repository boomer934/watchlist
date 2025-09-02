import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import WatchlistCards from '../components/WatchlistCards'
import { useLocation } from 'react-router-dom'
import { useState,useEffect } from 'react'
import FilterWatchList from '../components/FilterWatchList'
import { use } from 'react'
import Delete from '../components/Delete'
import Update from '../components/Update'
export default function Watchlist() {
  const [filter, setFilter] = useState("tutti")
  const [elimina,setElimina] = useState(false)
  const [aggiorna,setAggiorna] = useState(false)
  const location = useLocation();
  useEffect(() => {
    console.log(filter);
  },[filter])
  return (
    <div className="relative flex flex-col h-full justify-end">
      <Navbar/>
      <div className="flex justify-between items-center p-3 rounded-lg shadow-md mb-4">
      <FilterWatchList filter={filter} setFilter={setFilter}/>
      <div className="flex gap-2">
        <Update aggionra={aggiorna} setAggiorna={setAggiorna} elimina={elimina} setElimina={setElimina} />
        <Delete elimina={elimina} setElimina={setElimina} aggiorna={aggiorna} setAggiorna={setAggiorna}/>
      </div>
      </div>
      {filter === "tutti" && <WatchlistCards location={location} elimina={elimina} aggiorna={aggiorna} />}
      {filter === "da vedere" && <WatchlistCards location={location} filter={filter} elimina={elimina} aggiorna={aggiorna} />}
      {filter === "visto" && <WatchlistCards location={location} filter={filter} elimina={elimina} aggiorna={aggiorna} />}
      
    </div>
  )
}
