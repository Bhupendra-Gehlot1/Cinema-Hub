import React from 'react'
import { userData } from './Data/userData';
import ShowMovies from './ShowMovies'


    
const KNearestMovies = ({newUserRatings}) => {
  //console.log(newUserRatings);

  const newUser = {
    id: 14,
    name: 'user14',
     movie: [
        
    ]
  }
  // make new user object out of newUserRatings
  
  const allMovies = userData[0].movie;
  // console.log('allLen', allMovies.length);
  for(let i = 0; i<allMovies.length; ++i){
    let currRating  = newUserRatings[allMovies[i].movId];
    const currMovie = allMovies[i];
    if(currRating==='not seen'){
      currRating  = -1
    }
    newUser.movie.push(
      {
        'movId' : currMovie.movId,
        'title' : currMovie.title,
        'rating': currRating
      }
    )
  }
  console.log('nu1', newUser);
  var similarityScores = {};
    for (var i = 0; i < userData.length; i++) {
      var other = userData[i];
      var similarity = euclideanDistance(newUser, other);
      similarityScores[other.id] = similarity;
    }
  //console.log(similarityScores);
    userData.sort(compareSimilarity);

  function compareSimilarity(a, b) {
    var score1 = similarityScores[a.id];
    var score2 = similarityScores[b.id];
    return score2 - score1;
  }

  function euclideanDistance(user1, user2) {
    console.log('nu2', user1, user2);
    var diffSquareSum = 0;
    for(var j = 0; j<user1.movie.length; ++j){
        if(user1.movie[j].rating!==-1&&user2.movie[j].rating!==-1){
            diffSquareSum += Math.pow((user1.movie[j].rating-user2.movie[j].rating), 2);
        }
    }
    var euclid = Math.sqrt(diffSquareSum);
    var similarity = 1/(1+euclid);
    return similarity;
  }
  

  var notSeen = [];
  for(let i = 0; i<newUser.movie.length/2; ++i){
      if(newUser.movie[i].rating===-1){
        notSeen.push(newUser.movie[i].movId);
      }
  }
  
  var idx = 0;
  const movies = newUser.movie;
  let predictedRating = []
  let allPredictions = {}
  for(let i = 0; i<movies.length; ++i){
      const id = movies[i].movId;
      const title = movies[i].title;
      if(id===notSeen[idx]){
        var userRatingSum = 0;
        var similaritySum = 0;
        for(var j = 0; j<userData.length; ++j){
          const userRating = userData[j].movie[i].rating;
          const similarity = similarityScores[userData[j].id];
          userRatingSum += userRating*similarity;
          similaritySum += similarity;
        }
        const prediction = userRatingSum/similaritySum;
        predictedRating.push({
          'id' : id,
          'prediction' : prediction,
           'title' : title
        })
        allPredictions[id] = prediction;
        idx++;
      }
  }
  //console.log(predictedRating);
  predictedRating.sort(comparePredictions);
  function comparePredictions(a, b) {
    var score1 = allPredictions[a.id];
    var score2 = allPredictions[b.id];
    return score2 - score1;
  }
  let topMovies = [];
  for(let k = 0; k<predictedRating.length; ++k){
      topMovies.push(predictedRating[k].title);
  }
  
  
  return (
    <ShowMovies topMovies = {topMovies} />
  )
}

export default KNearestMovies;
