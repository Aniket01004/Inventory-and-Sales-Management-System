import React, { useState } from 'react'
import api from '../api/axios';

function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async(e) => {
        e.preventDefault();
        setError("");

        try{
            await api.post("/auth/login",{username, password});
            onLogin();
        }catch{
            setError("Invalid credentials");
        }
    };

  return (
    <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input placeholder='Username' onChange={e => setUsername(e.target.value)}/>
        <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
        <button>Login</button>
    </form>
    
  )
}

export default Login