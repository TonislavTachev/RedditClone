import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import reduxStore from "./store";
import SingleThread from "./components/SingleThread";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import Register from "./components/Auth/Register";

function App() {
  return (
    <Provider store={reduxStore}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/:id" component={SingleThread} exact />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
