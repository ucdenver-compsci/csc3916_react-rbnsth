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

export function fetchMovie(movieIdOrTitle) {
    // Determine if the input is a number (ID) or a string (title)
    const isId = !isNaN(movieIdOrTitle);
    const url = isId
        ? `${process.env.REACT_APP_API_URL}/movies/${movieIdOrTitle}?reviews=true`
        : `${process.env.REACT_APP_API_URL}/movies?title=${movieIdOrTitle}&reviews=true`;

    return dispatch => {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                dispatch(movieFetched(data));
            })
            .catch(error => {
                dispatch(fetchError(error));
            });
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