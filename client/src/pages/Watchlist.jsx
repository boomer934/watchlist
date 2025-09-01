import React from 'react'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
export default function Watchlist() {
  return (
    <div className="flex flex-col h-full justify-end">
      <Navbar/>
      <SearchBar/>
      <div className="flex flex-col h-full justify-end">
        <Footer className="absolute bottom-0"/>
      </div>
    </div>
  )
}
