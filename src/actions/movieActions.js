import actionTypes from '../constants/actionTypes';

function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function movieFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    }
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

function fetchError(error) {
    return {
        type: actionTypes.FETCH_ERROR,
        error: error
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}

export function fetchMovie(movieId) {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/movies/${movieId}?reviews=false`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(movieFetched(res));
        }).catch((e) => dispatch(fetchError(e)));
    }
}

export function fetchMovies() {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/movies?reviews=false`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(moviesFetched(res));
        }).catch((e) => dispatch(fetchError(e)));
    }
}