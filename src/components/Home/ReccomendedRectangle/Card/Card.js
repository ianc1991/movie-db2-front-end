import './card.css'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Loading/Loading';
import { usePromiseTracker } from 'react-promise-tracker';

const Card = (props) => {

    const navigate = useNavigate();

    const LoadingIndicator = props => {
        const { promiseInProgress } = usePromiseTracker();
        return (
          promiseInProgress && 
          <Loading />
        );  
      }

  return (
    <div className='mainCardContainer'>
          <LoadingIndicator />
          {props.moviesArray.map((movie) => (
              <div className="card cardCard" key={movie._id} onClick={()=>navigate(`/moviedetails?id=${movie._id}`)}>
                  <img src={movie.poster} className="card-img-top cardImg" alt="Movie Poster" />
                  <div className="home-card-body">
                      <p className="card-text">{movie.title}</p>
                      <FontAwesomeIcon icon={faStar} inverse /> {movie.imdb.rating}
                  </div>
              </div>
          ))}
        </div>
  )
}

export default Card