import { Switch, Route} from 'react-router-dom';
import Home from "./screens/Home/Home.js";
import "./global.css"

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path='/' exact={true} component={Home}/>
          {/* <Route path="/movie/:id" component={Detail} />
          <Route path="/tv/:id" component={Detail} /> */}
      </Switch>
    </div>
  );
}

export default App;
