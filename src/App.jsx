import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavbarComp from './pages/components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Products from './pages/Products.jsx';
import {useState, useEffect} from 'react';

export default function App(){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const handleLogin = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("token", token);
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };
    return (
        <Router>
            <NavbarComp user={user} onLogout={handleLogout}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/register" element={<Register />} />
                <Route path = "/login" element={<Login onLogin={handleLogin} />} />
            </Routes>
        </Router>
    )
}