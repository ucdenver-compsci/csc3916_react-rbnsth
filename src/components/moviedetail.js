import React, { useEffect } from 'react';
import { fetchMovie } from "../actions/movieActions";
import { useSelector, useDispatch } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'

const MovieDetail = ({ movieId }) => {
    const dispatch = useDispatch();
    const selectedMovie = useSelector(state => state.movie.selectedMovie);

    useEffect(() => {
        if (!selectedMovie) {
            dispatch(fetchMovie(movieId));
        }
    }, [dispatch, movieId, selectedMovie]);

    if (!selectedMovie) {
        return <div>Loading....</div>
    }

    return (
        <Card>
            <Card.Header>Movie Detail</Card.Header>
            <Card.Body>
                <Image className="image" src={selectedMovie.imageUrl} thumbnail />
            </Card.Body>
            <ListGroup>
                <ListGroupItem>{selectedMovie.title}</ListGroupItem>
                <ListGroupItem>
                    {selectedMovie.actors.map((actor, i) =>
                        <p key={i}>
                            <b>{actor.actorName}</b> {actor.characterName}
                        </p>)}
                </ListGroupItem>
                <ListGroupItem><h4><BsStarFill/> {selectedMovie.avgRating}</h4></ListGroupItem>
            </ListGroup>
            <Card.Body>
                {selectedMovie.reviews.map((review, i) =>
                    <p key={i}>
                        <b>{review.username}</b>&nbsp; {review.review}
                        &nbsp;  <BsStarFill /> {review.rating}
                    </p>
                )}
            </Card.Body>
        </Card>
    );
}

export default MovieDetail;