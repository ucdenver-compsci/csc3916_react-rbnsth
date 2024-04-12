import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { fetchMovie } from "../actions/movieActions";
import MovieDetail from "../components/moviedetail"

function Movie(props) {
    const { selectedMovie } = props;
    const { movieId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedMovie == null) {
            dispatch(fetchMovie(movieId));
        }
    }, [dispatch, movieId, selectedMovie]);

    return (<MovieDetail movieId={movieId} />)
}

export default Movie;