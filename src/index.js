import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "normalize.css";
import "./styles.css";

import { getStore } from "./store";
import Loading from "./Loading";
import Header from "./Header";
import GlobalShortcuts from "./GlobalShortcuts";

const store = getStore();

const Home = React.lazy(() => import("./Home"));
const Random = React.lazy(() => import("./Random"));
const Pokemon = React.lazy(() => import("./Pokemon"));
const Search = React.lazy(() => import("./Search"));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Header />
      <div className="App">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/random" exact component={Random} />
            <Route path="/search" exact component={Search} />
            <Route path="/entry/:pokemon" component={Pokemon} />
          </Switch>
        </Suspense>
        <GlobalShortcuts />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
