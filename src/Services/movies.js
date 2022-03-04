import http from './httpCommon';

// TODO - Refactor
class MovieDataService {
    // Get new movies
    getNew(maxreturn) {
        return http.get(`/allmovies/${maxreturn}`)
    }

    // Get by Id
    getMovieDetailsById(id) {
        return http.get(`/${id}`)
    }

    // Get movie comments
    getMovieComments(id) {
        return http.get(`/comments/${id}`)
    }

    // Post movie comment
    postMovieComment(comment, id) {
        return http.post(`/comments/postcomment/${id}`, {
            text: comment
        },
        {
            withCredentials: true
        })
    }

    // Delete movie comment
    deleteMovieComment (commentId) {
        return http.delete(`/comments/deletecomment/${commentId}`,
        {
            withCredentials: true
        })
    }

    // Get by search text
    getMoviesBySearchText(searchText, pageNumber) {
        if (pageNumber) return http.get(`/allmovies/${searchText}/${pageNumber}`);
        return http.get(`/allmovies/${searchText}`);
    }

    // Get by search text
    getMoviesByFilter(filter, pageNumber) {
        if (pageNumber) return http.get(`/allmovies/filter/${filter}/${pageNumber}`);
        return http.get(`/allmovies/filter/${filter}`);
    }
}

export default new MovieDataService();