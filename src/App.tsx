import React, { useState } from "react";

import { GAME, HOW, LANDING, MODE, MODE_BASIC, SUMMARY } from "./constants";

import HowToMenu from "./components/HowToMenu";
import Landing from "./components/Landing";
import ModeSelector from "./components/ModeSelector";
import GameSummary from "./components/GameSummary";
import GameBoard from "./components/GameBoard";

import { Match } from "./types";

import getImages from "./utils/images";

const images = getImages();

export default () => {
  const [view, setView] = useState<number>(LANDING);

  const [points, setPoints] = useState<number>(0);
  const [gameMode, setGameMode] = useState<number>(MODE_BASIC);
  const [time, setTime] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);
  const [matches, setMatches] = useState<Match[]>([]);

  const chooseMode = () => setView(MODE);

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

  const toggleHowTo = () => setView(HOW);

  switch (view) {
    case MODE:
      return (
        <ModeSelector
          startGame={startGame}
        />
      );
    case SUMMARY:
      return (
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
    case HOW:
      return (
        <HowToMenu
          images={images}
          toLanding={toLanding}
        />
      );
    case GAME:
      return (
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
    case LANDING:
    default:
      return (
        <Landing
          chooseMode={chooseMode}
          toggleHowTo={toggleHowTo}
          images={images}
        />
      );
  }
};
