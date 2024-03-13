import React, { useState } from "react";
import { Provider, useSelector } from "react-redux";

import { GAME, HOW, LANDING, MODE, MODE_BASIC, STATS, SUMMARY } from "./constants";

import Announcement from "./components/Announcement";
import HowToMenu from "./components/HowToMenu";
import Landing from "./components/Landing";
import ModeSelector from "./components/ModeSelector";
import GameSummary from "./components/GameSummary";
import GameBoard from "./components/GameBoard";

import { RootState, store } from "./store";

import { Match } from "./types";

import getImages from "./utils/images";
import Statistics from "./components/Statistics";

const images = getImages();

const App = () => {
  const announcement = useSelector((state: RootState) => state.announcements.current);

  const [view, setView] = useState<number>(LANDING);

  const [points, setPoints] = useState<number>(0);
  const [gameMode, setGameMode] = useState<number>(MODE_BASIC);
  const [time, setTime] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);
  const [matches, setMatches] = useState<Match[]>([]);

  // const [tutorial, setTutorial] = useState<number>(0);

  const getGameStartFunction = () => {
    startGame();
  };

  const startGame = (mode: number = gameMode) => {
    setDraws(0);
    setGameMode(mode);
    setPoints(0);
    setMatches([]);
    setView(GAME);
  };

  const addSelection = (_match: Match) => {
    setMatches([
      ...matches,
      _match,
    ]);
  };

  const toLanding = () => {
    setView(LANDING);
  };

  const chooseMode = () => setView(MODE);

  const showStatistics = () => setView(STATS);

  const toggleHowTo = () => setView(HOW);

  let main;

  switch (view) {
    case MODE:
      main = (
        <ModeSelector
          startGame={startGame}
        />
      );
      break;
    case SUMMARY:
      main = (
        <GameSummary
          draws={draws}
          gameMode={gameMode}
          matches={matches}
          points={points}
          time={time}
          chooseMode={chooseMode}
          getGameStartFunction={getGameStartFunction}
          toLanding={toLanding}
        />
      );
      break;
    case HOW:
      main = (
        <HowToMenu
          images={images}
          toLanding={toLanding}
          // setTutorial={setTutorial}
        />
      );
      break;
    case GAME:
      main = (
        <GameBoard
          gameMode={gameMode}
          images={images}
          points={points}
          time={time}
          addSelection={addSelection}
          setDraws={setDraws}
          setPoints={setPoints}
          setTime={setTime}
          setView={setView}
          startGame={startGame}
        />
      );
      break;
    case STATS:
      main = (
        <Statistics toLanding={toLanding} />
      );
      break;
    case LANDING:
    default:
      main = (
        <Landing
          chooseMode={chooseMode}
          showStatistics={showStatistics}
          toggleHowTo={toggleHowTo}
          images={images}
        />
      );
  }

  let visibleAnnouncement = null;
  if (announcement) {
    visibleAnnouncement = (
      <Announcement
        location={announcement.location}
        timeout={announcement.timeout}
        value={announcement.value}
      />
    );
  }

  return (
    <React.Fragment>
      {main}
      {visibleAnnouncement}
    </React.Fragment>
  );
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
