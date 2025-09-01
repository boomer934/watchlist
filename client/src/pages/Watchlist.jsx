import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import WatchlistCards from '../components/WatchlistCards'
import { useLocation } from 'react-router-dom'
export default function Watchlist() {
  const location = useLocation();
  return (
    <div className="flex flex-col h-full justify-end">
      <Navbar/>
      <WatchlistCards location={location}/>
      <Footer className="absolute bottom-0"/>
    </div>
  )
}
