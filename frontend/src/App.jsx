import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CreateLink from './pages/CreateLink'
import DashBoard from './pages/DashBoard'
import LinkDetails from './pages/LinkDetails'
// import Analytics from './pages/Analytics'


export default function App(){
return (
<div className="min-h-screen flex flex-col">
<NavBar />
<main className="flex-1 container mx-auto px-4 py-8">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/create" element={<CreateLink />} />
<Route path="/dashboard" element={<DashBoard />} />
  <Route path="/details/:code" element={<LinkDetails />} />

{/* <Route path="/analytics/:id" element={<Analytics />} /> */}
</Routes>
</main>
<Footer />
</div>
)
}    
