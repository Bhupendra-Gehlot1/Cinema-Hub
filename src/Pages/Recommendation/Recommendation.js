import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { userData } from './Data/userData';
import SingleContent from '../../components/SingleContent/SingleContent';
import Dropdown from 'react-dropdown';
import './Recommendation.css';
import { useHistory } from "react-router-dom";

const Recommendation = ({ setRatingChange }) => {
  const [movies, setMovies] = useState([]);
  const [newUserRatings, setNewUserRatings] = useState({});
  const history = useHistory();

  const options = ['Not Seen', '1', '2', '3', '4', '5'];
  const defaultOption = options[0];

  useEffect(() => {
    const ratedMovies = userData[0].movie;
    const initialRatings = ratedMovies.reduce((acc, movie) => {
      acc[movie.movId] = 'not seen';
      return acc;
    }, {});
    setNewUserRatings(initialRatings);
  }, []);

  const fetchSearch = useCallback(async (searchText, id) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=0fbd2641fcad9e6a8793654997ab0fa1&query=${searchText}`
      );
      if (data.results.length > 0) {
        const newMovie = { ...data.results[0], movId: id };
        setMovies(prevMovies => [...prevMovies, newMovie]);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (movies.length < 10 && userData[0].movie[movies.length]) {
      const nextMovie = userData[0].movie[movies.length];
      fetchSearch(nextMovie.title, nextMovie.movId);
    }
  }, [movies, fetchSearch]);

  const handleChange = (e, id) => {
    setNewUserRatings(prevRatings => ({
      ...prevRatings,
      [id]: e.value
    }));
  };

  const handleSubmit = () => {
    setRatingChange(newUserRatings);
    history.push("/top-movies");
  };

  return (
    <div>
      <h2 className="pg-hdr">Rate out of 5⭐ the below movies you have watched:</h2>
      <div className="all-cards">
        {movies.map((movie) => (
          <div key={movie.id}>
            <SingleContent
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type="movie"
              vote_average={movie.vote_average}
            />
            <Dropdown 
              className="drp-btn" 
              options={options} 
              onChange={(e) => handleChange(e, movie.movId)} 
              value={defaultOption} 
              placeholder="Select an option" 
            />
          </div>
        ))}
      </div>
      <div className='btn-container'>
        <button type="button" className="rec-btn" onClick={handleSubmit}>Done</button>
      </div>
    </div>
  );
};

export default Recommendation;