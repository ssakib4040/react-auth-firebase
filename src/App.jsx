import "./App.css";

import { Switch, Route } from "react-router-dom";

// screens
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";

// privateroute
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="container col-md-4 mt-4 ">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
