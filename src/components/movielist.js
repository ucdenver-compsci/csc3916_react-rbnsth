import React, { useEffect } from 'react';
import { fetchMovies, setMovie } from "../actions/movieActions";
import { useDispatch, useSelector } from 'react-redux';
import { Image, Nav, Carousel } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { LinkContainer } from 'react-router-bootstrap';

const MovieList = () => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.movies);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const handleSelect = (selectedIndex, e) => {
        dispatch(setMovie(movies[selectedIndex]));
    }

    const handleClick = (movie) => {
        dispatch(setMovie(movie));
    }

    if (!movies) {
        return <div>Loading....</div>
    }

    return (
        <Carousel onSelect={handleSelect}>
            {movies.map((movie) =>
                <Carousel.Item key={movie._id}>
                    <div>
                        <LinkContainer to={'/movie/'+movie._id} onClick={()=>handleClick(movie)}>
                            <Nav.Link><Image className="image" src={movie.imageUrl} thumbnail /></Nav.Link>
                        </LinkContainer>
                    </div>
                    <Carousel.Caption>
                        <h3>{movie.title}</h3>
                        <BsStarFill glyph={'star'} /> {movie.avgRating} &nbsp;&nbsp; {movie.releaseDate}
                    </Carousel.Caption>
                </Carousel.Item>
            )}
        </Carousel>
    )
}

export default MovieList;