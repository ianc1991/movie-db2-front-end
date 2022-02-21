import axios from "axios";

export default axios.create({
    //baseURL: "https://movie-db-mern-project.herokuapp.com/users/api/",
    baseURL: "http://localhost:4000/users/api/",
    headers: {
        "Content-type": "application/json"
    }
});