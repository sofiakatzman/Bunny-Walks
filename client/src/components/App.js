import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom" 


import Home from "./Home"
import Navigation from "./Navigation"
import Walks from "./Walks"
import Bunnies from "./Bunnies"
import Paths from "./Paths"
import CreatePath from "./CreatePath"
import CreateBunny from "./CreateBunny"
import CreateWalk from "./CreateWalk"
import '../index.css'

function App() {
  const [bunnies, setBunnies] = useState(null)

  useEffect(() => {
    fetch("/api/bunnies")
      .then((r) => r.json())
      .then((data) => setBunnies(data))
  }, [])

  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/walks" element={<Walks />} />
          <Route path="/bunnies" element={<Bunnies bunnies={bunnies} setBunnies={setBunnies}/>} />
          <Route path="/paths" element={<Paths />} />
          <Route path="/create/path" element={<CreatePath />} />
          <Route path="/create/bunny" element={<CreateBunny />} />
          <Route path="/create/walk" element={<CreateWalk bunnies={bunnies} setBunnies={setBunnies}/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
