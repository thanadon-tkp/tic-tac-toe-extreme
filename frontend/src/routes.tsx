import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import GameMode from "./pages/game-mode";
import ScoreBoard from "./pages/score-board";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "game/:mode/:play",
        Component: GameMode,
      },
      {
        path: "score-board",
        Component: ScoreBoard,
      }
    ],
  },
]);

export default routes;
