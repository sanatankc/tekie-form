import React from 'react';
import ReactDOM from 'react-dom';
import 'react-bootstrap-modal/lib/css/rbm-complete.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './index.css';
import App from './App';
import App1 from './App1';
import * as serviceWorker from './serviceWorker';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/collab-dav-school">
        <App1 />
      </Route>
      <Route path="/">
        <div>Not Found</div>
      </Route>
    </Switch>
  </Router>
)
ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept()
}
