import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { userData } from './Data/userData';
import SingleContent from '../../components/SingleContent/SingleContent.js';
import Dropdown from 'react-dropdown';
import './Recommendation.css';
import { useHistory } from "react-router-dom";

const Recommendation = ({setRatingChange}) => {
  let newUserRatings = {};

  const options = [
    'Not Seen', 1, 2, 3, 4, 5
  ];
  const defaultOption = options[0];
  const [movies, setMovies] = useState([]);
  const history = useHistory();
  const ratedMovies = userData[0].movie;
  for(var i = 0; i<ratedMovies.length; ++i){
    const currId = ratedMovies[i].movId;
    newUserRatings[currId] = 'not seen';
  }
  //console.log('fsa', ratedMovies)
  useEffect(() =>
    {
     movies.length<10 && fetchSearch(userData[0].movie[movies.length].title, userData[0].movie[movies.length].movId)
    },[movies]
  )
  

  const handleChange = (e, id) => {
     newUserRatings[id] = e.value;
     console.log(e, id);
  }
  const handleSubmit = () => {
     console.log(newUserRatings);
     setRatingChange(newUserRatings);
     history.push("/top-movies")
  }

 const fetchSearch = async (searchText, id) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=0fbd2641fcad9e6a8793654997ab0fa1&query=${searchText}`
        );
        data.results[0]['movId'] = id;
        const newMov = [...movies, data.results[0]];
        setMovies(newMov)
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div>
      <h2 className = 'pg-hdr'> Rate out of 5⭐ the below movies, you have watched:</h2>
    <div className = 'all-cards'>
    {
      (movies.length===0)?"Not loaded yet":
      movies.map((movie) => (
        <div >
           <SingleContent
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type={"movie"}
              vote_average={movie.vote_average}
            />
            <Dropdown className="drp-btn" options={options} onChange={(e) => handleChange(e, movie.movId)} value={defaultOption} placeholder="Select an option" />
        </div>
      ))
    }
    </div >
    <div className='btn-container'>
    <button type="submit" className = 'rec-btn' onClick={handleSubmit}>Done</button>
    </div>
    
    </div>
  )

}

export default Recommendation
