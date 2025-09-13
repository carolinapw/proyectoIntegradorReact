import { Switch, Route} from 'react-router-dom';
import Home from "./screens/Home/Home.js";
import MoviesPopular from "./screens/Sections/MoviesPopular";
import MoviesNowPlaying from "./screens/Sections/MoviesNowPlaying";
import SeriesPopular from "./screens/Sections/SeriesPopular";
import SeriesAiringToday from "./screens/Sections/SeriesAiringToday";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./global.css"

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path="/movies/popular" component={MoviesPopular} />
          <Route path="/movies/now-playing" component={MoviesNowPlaying} />
          <Route path="/series/popular" component={SeriesPopular} />
          <Route path="/series/airing-today" component={SeriesAiringToday} />
          {/* <Route path="/movie/:id" component={Detail} />
          <Route path="/tv/:id" component={Detail} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
