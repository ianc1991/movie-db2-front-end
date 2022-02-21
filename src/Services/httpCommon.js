import axios from "axios";

export default axios.create({
    //baseURL: "https://movie-db-mern-project.herokuapp.com/movies",
    baseURL: "http://localhost:4000/movies",
    headers: {
        "Content-type": "application/json"
    }
});