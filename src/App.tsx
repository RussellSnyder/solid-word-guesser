import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import "./App.css";

const CreateGamePage = lazy(() => import("./pages/CreateGamePage"));
const WordGuesserGamePage = lazy(() => import("./pages/WordGuesserGamePage"));

function App() {
  return (
    <Router>
      <Route path="/" component={CreateGamePage} />
      <Route path="/create" component={CreateGamePage} />
      <Route path="/play" component={WordGuesserGamePage} />
    </Router>
  );
}

export default App;
