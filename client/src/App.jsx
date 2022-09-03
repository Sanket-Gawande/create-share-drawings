import React from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from './Login'
import { ContextProvider } from "./ContextProvider"
import Home from './Home'
import Shared from './Shared'
import Canvas from './Canvas'
const App = () => {
    
    return (
        <>

            <ContextProvider>
            <Router>
                <Routes>
                    <Route path="/"  element={<Home />} />
                    <Route path="/shared"  element={<Shared />} />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Canvas />} path="/canvas/:id" />
                </Routes>
            </Router>
            </ContextProvider>
        </>

    )
}

export default App