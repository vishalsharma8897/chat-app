import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';


function App() {
  return (
    <>
      <BrowserRouter>
         

          <Routes>
            
            <Route exact path="/register" element={<Register/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/chat" element={<Chat/>}></Route>

          </Routes>
      
      </BrowserRouter>
  </>
  );
}

export default App;
