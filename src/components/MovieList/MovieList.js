import './movieList.css';
import { useState, useEffect } from "react";
import movieDataSrv from '../../Services/movies';
import { useNavigate, useLocation } from 'react-router-dom';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import Pagination from "react-js-pagination";
import Loading from '../Loading/Loading';
//Assets
import noImageAvailablePicture from '../../assets/noImage.png';
import nothingFoundImage from '../../assets/noResultFound.webp';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

 // TODO - Use nothingFoundImage if no results are found for list

const MovieList = () => {
    // Get search parameter from url
    
    const search = useLocation().search;
    const searchParam = new URLSearchParams(search).get('s');
    const filter = new URLSearchParams(search).get('filter');

    const navigate = useNavigate();
    
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    // Get movie list and set it to 'movieList' state.
    const retrieveMovieListBySearch = () => {
        if (!searchParam) setCurrentPage(1);
        trackPromise(
            movieDataSrv.getMoviesBySearchText(searchParam, currentPage)
                .then((response) => {
                    setMovieList(response.data.searchedMovies);
                    setTotalMovies(response.data.totalMovies);
                })
                .catch(e => {
                    console.log(e);
                })
        )
    }

    // Get movie list by filter
    const retrieveMovieListByFilter = () => {
        if (!filter) setCurrentPage(1);
        trackPromise(
            movieDataSrv.getMoviesByFilter(filter, currentPage)
                .then((response) => {
                    setMovieList(response.data.searchedMovies);
                    setTotalMovies(response.data.totalMovies);
                })
                .catch(e => {
                    console.log(e);
                })
        )
    }

    useEffect(() => {
      // prevents paginator from being left on a certain when url params change
      setCurrentPage(1);    
    }, [searchParam, filter])

    // Get new list of movies when pages/params change
    useEffect(() => {
            if (searchParam) retrieveMovieListBySearch();
            if (filter) retrieveMovieListByFilter();
    }, [searchParam, currentPage, filter]); // Dependency array. useEffect() will run when variable changes.

    


    // If image 404
    const handleImgError = e => {
        e.target.src = noImageAvailablePicture
    }

    // Paginate comments {
        const [totalMovies, setTotalMovies] = useState(0);

        const pageNumberClicked = (pageNumber) => {
            // prevent setting movie list to empty array if clicking on same page.
            if (currentPage === pageNumber) return;
            setMovieList([]);
            setCurrentPage(pageNumber);
        }

        // TODO - make this responsive
        const PageNumbersElement = () => { return (
            <Pagination
                activePage={currentPage}
                totalItemsCount={totalMovies}
                // Backend numbers need to be adjusted as well if this is changed
                itemsCountPerPage={10}
                onChange={pageNumberClicked}
                hideFirstLastPages={true}
                // Bootstrap props
                itemClass="page-item"
                linkClass="page-link"
            />
        )}
    // }

    const LoadingIndicator = props => {
        const { promiseInProgress } = usePromiseTracker();
        return (
          promiseInProgress && 
          <Loading />
        );  
      }


  return (
    <div className='mainMovieListContainer'>
        <div className='filterContainer'>
        </div>
        <table className="table movieListTable table-dark table-striped table-hover">
            <thead>
                <tr>
                <th scope="col">Title</th>
                <th scope="col">IMDb Rating</th>
                <th scope="col">Release Year</th>
                <th scope="col">Media Type</th>
                </tr>
            </thead>
            <tbody className='movieListTableBody'>
                {
                    movieList.map((movie, i) => (
                        <tr className='movieListTableRow' key={i} onClick={() => navigate(`/moviedetails?id=${movie._id}`)}>
                            <td className='titleRow'><div className='imageTitleContainer'><img className='moviePoster' src={movie.poster || noImageAvailablePicture} onError={handleImgError} alt={movie.title + ' Poster'}></img> {movie.title}</div></td>
                            <td><div className='imageTitleContainer'>
                                <p><FontAwesomeIcon icon={faStar} inverse /> {movie.imdb.rating}</p></div>
                            </td>
                            <td><div className='imageTitleContainer'>{movie.year}</div></td>
                            <td><div className='imageTitleContainer'>{movie.type}</div></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <div className="movieListLoadingIndicatorContainer">
            <LoadingIndicator />
        </div>
        <PageNumbersElement/>
    </div>
    )
}
export default MovieList;
