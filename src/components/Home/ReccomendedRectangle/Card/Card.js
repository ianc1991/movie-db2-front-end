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
        <div className='flipCard'>
          <div className='cardInner'>
            <div className='cardFront'>
                <button className="card cardCard" key={movie._id} tabIndex={0} onClick={()=>navigate(`/moviedetails?id=${movie._id}`)}>
                    <img src={movie.poster} className="card-img-top cardImg" alt={ movie.title + " movie poster"} />
                    <div className="home-card-body">
                        <p className="card-text">{movie.title}</p>
                        <FontAwesomeIcon icon={faStar} inverse /> {movie.imdb.rating}
                    </div>
                </button>
            </div>
            <div className='cardBack' onClick={()=>navigate(`/moviedetails?id=${movie._id}`)}>
              <p>{movie.plot}</p>
            </div>
          </div>
      </div>
      ))}
    </div>
  )
}

export default Card