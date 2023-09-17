import React from 'react'
import TaskCompleted from './TaskCompleted'
import AddTask from './AddTask'
import ToDo from './ToDo'
import Home from './Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login'

const getBasename = path => path.substr(0, path.lastIndexOf('/'));

function App() {
    return (
        <BrowserRouter basename={getBasename(window.location.pathname)}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/ToDo" element={<ToDo />} />
                <Route path="/TaskCompleted" element={<TaskCompleted />} />
                <Route path="/addTask" element={<AddTask />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
