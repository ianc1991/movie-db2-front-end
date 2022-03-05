import './navbar.css'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthContext';
import LogoutBtn from '../Logout/LogoutBtn';


const Navbar = () => {
    
    const navigate = useNavigate();

    // Reads value from AuthContext to check if user is logged in
    const { loggedIn, userInfo } = useContext(AuthContext);
    //const { userInfo } = useContext(AuthContext);

    // Search text state
    const [searchText, setSearchText] = useState("");

    const handleSearchText = (e) => {
        setSearchText(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/movielist?s=${searchText}`)
    }


    return (
            <nav className="navbar navbar-expand-md navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-brand buttonLinks" tabIndex={0} onClick={() => navigate('/')}>MovieDB</button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="nav-link buttonLinks" aria-current="page" onClick={() => navigate(`/movielist?filter=new`)}>New Releases</button>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="nav-link dropdown-toggle buttonLinks" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                Movies
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><button className="dropdown-item" onClick={() => navigate(`/movielist?filter=all`)}>View All</button></li>
                                    <li><button className="dropdown-item" onClick={() => navigate(`/movielist?filter=toprated`)}>Top Rated</button></li>
                                </ul>
                            </li>
                            {
                                !loggedIn === true && (
                                    <li className="nav-item">
                                        <button className="nav-link buttonLinks" aria-current="page" onClick={() => navigate(`/login`)}>Login</button>
                                    </li>
                                    )
                            }

                        </ul>
                        {
                            !userInfo === false ? (
                                <div className='greetingContainer'>
                                    <span className='navGreeting'>
                                        Hello, {userInfo.userName}!
                                    </span>
                                    <span className="nav-item logoutButton">
                                        <LogoutBtn />
                                    </span>
                                </div>
                            )
                            :
                            <></>
                        }
                        <form className="d-flex" 
                            onSubmit={handleSearchSubmit} 
                        >
                            <input 
                                className=" navSearch form-control me-2" 
                                type="search" 
                                required
                                placeholder="Search..." 
                                aria-label="Search"
                                onChange={handleSearchText}
                                name='s'
                            />
                            <button 
                                className="btn btn-outline-light"
                                type='submit'
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar
