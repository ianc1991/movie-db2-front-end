import './register.css'
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import AuthService from "../../Services/Users/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';


// TODO - Validation etc.
const Register = () => {
    const [userName, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    const {getLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault();

        if (password !== passwordVerify) return alert('Passwords do not match password');

        try {
            const registerData = {
                userName,
                password
            };

            await AuthService.register(registerData);
            await getLoggedIn();
            navigate('/');

        } catch(e) {
            console.error(e);
        }
    }

  return (
      <div className="registerScreenContainer">
          <div className="bg-dark registerFormContainer">
            <div className='loginIconContainer'>
                <FontAwesomeIcon icon={faUserPlus} className='fa-3x' />
            </div>
            <h1>Register new account</h1>
            <form onSubmit={register} className='registerFormElement'>
                <input type='text' placeholder='User name' required
                    onChange={(e) => setName(e.target.value)}
                />
                <input type='password' placeholder='Password' required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type='password' placeholder='Verify your password' required
                    onChange={(e) => setPasswordVerify(e.target.value)}
                />
                <button className='btn btn-outline-success' type='submit'>Register</button>
            </form>
          </div>
      </div>
  )
};

export default Register;