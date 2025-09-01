import React from 'react'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import WatchlistCards from '../components/WatchlistCards'
export default function Watchlist() {
  return (
    <div className="flex flex-col h-full justify-end">
      <Navbar/>
      <SearchBar/>
      <WatchlistCards/>
      <Footer className="absolute bottom-0"/>
    </div>
  )
}
