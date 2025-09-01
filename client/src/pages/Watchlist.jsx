import React from 'react'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
export default function Watchlist() {
  return (
    <div className="flex flex-col h-full justify-end">
      <Navbar/>
      <div className="flex flex-col h-full justify-end">
        <Footer/>
      </div>
    </div>
  )
}
