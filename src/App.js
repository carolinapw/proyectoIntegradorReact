import { Switch, Route} from 'react-router-dom';
import Home from "./screens/Home/Home.js";

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path='/' exact={true} component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
