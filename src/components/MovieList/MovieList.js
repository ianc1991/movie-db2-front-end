import './movieList.css';
import { useState, useEffect } from "react";
import movieDataSrv from '../../Services/movies';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import Pagination from "react-js-pagination";
//Assets
import noImageAvailablePicture from '../../assets/noImage.png';
import nothingFoundImage from '../../assets/noResultFound.webp';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

 // TODO - Use nothingFoundImage if no results are found for list

const MovieList = () => {
    // Get search parameter from url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchParam = urlParams.get('s');

    const navigate = useNavigate();
    
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    // Get movie list and set it to 'movieList' state.
    const retrieveMovieListBySearch = () => {
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

    useEffect(() => {
            retrieveMovieListBySearch();
    }, [searchParam, currentPage]); // Dependency array. useEffect() will run when variable changes.


    // If image 404
    const handleImgError = e => {
        e.target.src = noImageAvailablePicture
    }

    // Paginate comments {
        const [totalMovies, setTotalMovies] = useState(0);

        const pageNumberClicked = (pageNumber) => {
            setCurrentPage(pageNumber);
        }

        // Page element
        // TODO - Figure out how to make this responsive
        const PageNumbersElement = () => { return (
            <Pagination
                activePage={currentPage}
                totalItemsCount={totalMovies}
                // Backend numbers need to be adjusted as well if this is changed
                itemsCountPerPage={10}
                onChange={pageNumberClicked}
                // Bootstrap props
                itemClass="page-item"
                linkClass="page-link"
            />
        )}
    // }


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
                            <td><div className='imageTitleContainer'><img className='moviePoster' src={movie.poster || noImageAvailablePicture} onError={handleImgError} alt='Movie Poster'></img> {movie.title}</div></td>
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
        <PageNumbersElement/>
    </div>
    )
}
export default MovieList;
