import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import React, {useState} from 'react'
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";
import Recommendation from "./Pages/Recommendation/Recommendation";
import KNearestMovies from "./Pages/Recommendation/KNearestMovies"
import { Container } from "@material-ui/core";

function App() {
  
  const [newUserRatings, setNewUserRatings] = useState({})
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
            <Route path="/recommendation" render={(props) => <Recommendation {...props} setRatingChange={setNewUserRatings} /> } />
            <Route path="/top-movies" render={(props) => <KNearestMovies {...props} newUserRatings={newUserRatings}  /> } />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
