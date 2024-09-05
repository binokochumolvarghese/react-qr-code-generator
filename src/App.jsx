import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Header from './UI/Header'
import Footer from './UI/Footer'

function App() {

  return (
    <>
     <Header/>
     <Home/>
     <Footer/>
    </>
  )
}

export default App
