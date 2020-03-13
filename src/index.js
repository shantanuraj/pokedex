import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./styles.css";

import { getStore } from "./store";
import { Loading } from "./Loading";

const store = getStore();

const Home = React.lazy(() => import("./Home"));
const Random = React.lazy(() => import("./Random"));
const Pokemon = React.lazy(() => import("./Pokemon"));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <nav>
        <Link to="/">home</Link>
        <Link to="/random">random</Link>
      </nav>
      <div className="App">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/random" exact component={Random} />
            <Route path="/entry/:pokemon" component={Pokemon} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
