import './login.css'
import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/Users/auth';
import AuthContext from '../../context/AuthContext';
import Register from '../Register/Register';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';



const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Check if logged in
  const {getLoggedIn} = useContext(AuthContext);

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    try {
        const loginData = {
          userName,
          password
        };

        await AuthService.login(loginData);
        await getLoggedIn();
        navigate('/');

    } catch(e) {
        console.error(e);
      }
  }
  
  return (
      <div className='loginScreenContainer'>
        <div className='loginFormContainer bg-dark'>
          <div className='loginIconContainer'>
            <FontAwesomeIcon icon={faUser} className='fa-3x' />
          </div>
          <h1>Login</h1>
          <form 
            className='loginFormElement' 
            onSubmit={login}
          >
            <input 
              type='text'
              placeholder="User name"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input 
              type='password' 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type='submit'
              value='Login' 
              className="btn btn-outline-success"
            />
          </form>
        </div>
        <Register />
      </div>
    )
}

export default Login;
