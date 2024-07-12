/* eslint-disable no-unused-vars */


import { useContext, useState } from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap";
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

function App() {
  const {user} = useContext(AuthContext);
  return (
    <ChatContextProvider user = {user}>
    <NavBar />
    <Container style={{marginTop:"5rem"}} >
      <Routes>
        <Route path='/' element= {user? <Chat/>: <Login/>}/>
        <Route path={user? '/' : '/login'} element= {user? <Chat/>: <Login/>}/>
        <Route path={user? '/' : '/register'} element= {user? <Chat/>: <Register/>}/>
        <Route path='*' element= {<Navigate to="/"/>}/>
      </Routes>
    </Container>
    </ChatContextProvider>
  )
}

export default App
