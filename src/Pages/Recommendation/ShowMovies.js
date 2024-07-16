import React, {useEffect, useState} from 'react'
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent.js';

const ShowMovies = ({topMovies}) => {
    const [moviesToShow, setMoviesToShow] = useState([]);
    useEffect(() =>
    {
        moviesToShow.length<topMovies.length && fetchSearch(topMovies[moviesToShow.length])
    },[moviesToShow]
  )
  

 const fetchSearch = async (searchText) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=0fbd2641fcad9e6a8793654997ab0fa1&query=${searchText}`
        );
        const newMov = [...moviesToShow, data.results[0]];
        setMoviesToShow(newMov)
      } catch (error) {
        console.error(error);
      }
  };
  return (
    <div>
        <h2 className = 'pg-hdr'>Movies you may like to watch:</h2>
        <div className = 'all-cards'>
        {
          moviesToShow.map((movie) => (
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
            </div>
          ))
      }
    </div>
    </div>
    
  )
}

export default ShowMovies
