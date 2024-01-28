import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import "./App.css";
import { PageLayout } from "./Layout";

const CreateGamePage = lazy(() => import("./pages/CreateGamePage"));
const WordGuesserGamePage = lazy(() => import("./pages/WordGuesserGamePage"));

function App() {
  return (
    <Router root={PageLayout}>
      <Route path="/" component={CreateGamePage} />
      <Route path="/create" component={CreateGamePage} />
      <Route path="/play/:gamedata" component={WordGuesserGamePage} />
    </Router>
  );
}

export default App;
