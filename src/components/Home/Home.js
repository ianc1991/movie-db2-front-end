import Carousel from "./Carousel/Carousel";
import ReccomendedRectangle from "./ReccomendedRectangle/ReccomendedRectangle";
import movieDataSrv from '../../Services/movies';
import { useEffect, useState } from "react";
import { trackPromise } from 'react-promise-tracker';
import './home.css';

// Our favorites
const pulpFiction = '573a1399f29313caabceea14';
const goodFellas = '573a1398f29313caabcebf8e';
const trumanShow = '573a139af29313caabcf0db0';
const deadPoets = '573a1398f29313caabceb610';
const wallE = '573a13bbf29313caabd53d77';

// Date night
const dateNightMovie = '573a13c2f29313caabd688cd';
const titanic = '573a139af29313caabcf0d74';
const timeTravelersWife = '573a13b3f29313caabd3ebd4';
const knocekdUp = '573a13b5f29313caabd44b8d';
const silverLinings = '573a13bef29313caabd5aeae';

// Kids zone
const findingNemo ='573a13a5f29313caabd1333a';
const shrek = '573a139af29313caabcf224e';
const ironGiant = '573a139bf29313caabcf2e35';
const princessBride ='573a1398f29313caabcea974';
const mosntersInc ='573a13a0f29313caabd0344a';



const Home = () => {
    const ourFavorites = [pulpFiction, goodFellas, trumanShow, deadPoets, wallE];
    const [retrievedFavoriteMovies, setOurFavorites] = useState([]);
    const dateNight = [dateNightMovie, titanic, timeTravelersWife, knocekdUp, silverLinings];
    const [retrievedDateNightMovies, setDateNightMovies] = useState([]);
    const kidsZone = [findingNemo, shrek, ironGiant, princessBride, mosntersInc];
    const [retrievedKidsZoneMovies, setKidsZoneMovies] = useState([]);
    
    useEffect(() => {
        retrieveFavoriteMoviesById();
        retrieveDateMoviesById();
        retrieveKidsZoneMoviesById();
    }, []);
    
    const retrieveFavoriteMoviesById = () => {
        ourFavorites.forEach((movieId) => {
            trackPromise(
                movieDataSrv.getMovieDetailsById(movieId)
                .then(response => {
                    setOurFavorites(oldArray => [...oldArray, response.data]);
                })
                .catch(e => {
                    console.log(e);
                })
            )
        })
    };

    const retrieveDateMoviesById = () => {
        dateNight.forEach((movieId) => {
            trackPromise(
                movieDataSrv.getMovieDetailsById(movieId)
                .then(response => {
                    setDateNightMovies(oldArray => [...oldArray, response.data]);
                })
                .catch(e => {
                    console.log(e);
                })
            )
        })
    };

    const retrieveKidsZoneMoviesById = () => {
        kidsZone.forEach((movieId) => {
            trackPromise(
                movieDataSrv.getMovieDetailsById(movieId)
                .then(response => {
                    setKidsZoneMovies(oldArray => [...oldArray, response.data]);
                })
                .catch(e => {
                    console.log(e);
                })
            )
        })
    };

    return (
        <div>
            <div className="carouselContainer">
                <Carousel />
            </div>
            <div className="rectangleContainer">
                <ReccomendedRectangle
                    title = "Our Favorites"
                    movies = {retrievedFavoriteMovies}
                />
                <ReccomendedRectangle
                    title = "Date Night"
                    movies = {retrievedDateNightMovies}
                />
                <ReccomendedRectangle
                    title = "Kids Zone"
                    movies = {retrievedKidsZoneMovies}
                />
            </div>
        </div>
    )
}

export default Home;
