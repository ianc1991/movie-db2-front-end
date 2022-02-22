import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import './card.css'

const Card = (props) => {

    const navigate = useNavigate();

  return (
    <div className='mainCardContainer'>
        {props.moviesArray.map((movie) => (
            <div className="card cardCard" key={movie._id} onClick={()=>navigate(`/moviedetails?id=${movie._id}`)}>
                <img src={movie.poster} className="card-img-top cardImg" alt="Movie Poster" />
                <div className="card-body">
                    <p className="card-text">{movie.title}</p>
                    <FontAwesomeIcon icon={faStar} inverse /> {movie.imdb.rating}
                </div>
            </div>
        ))}
        
    </div>
  )
}

export default Card