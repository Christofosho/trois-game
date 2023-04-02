import React, { useState } from 'react';

import { GAME, HOW, LANDING, MODE, MODE_BASIC, SUMMARY } from './constants';

import HowToMenu from './components/HowToMenu';
import Landing from './components/Landing';
import ModeSelector from './components/ModeSelector';
import GameSummary from './components/GameSummary';
import GameBoard from './components/GameBoard';
import { Match } from './types';

const images = [
  require('./images/card00.png'), require('./images/card01.png'), require('./images/card02.png'),
  require('./images/card03.png'), require('./images/card04.png'), require('./images/card05.png'),
  require('./images/card06.png'), require('./images/card07.png'), require('./images/card08.png'),
  require('./images/card09.png'), require('./images/card10.png'), require('./images/card11.png'),
  require('./images/card12.png'), require('./images/card13.png'), require('./images/card14.png'),
  require('./images/card15.png'), require('./images/card16.png'), require('./images/card17.png'),
  require('./images/card18.png'), require('./images/card19.png'), require('./images/card20.png'),
  require('./images/card21.png'), require('./images/card22.png'), require('./images/card23.png'),
  require('./images/card24.png'), require('./images/card25.png'), require('./images/card26.png'),
  require('./images/card27.png'), require('./images/card28.png'), require('./images/card29.png'),
  require('./images/card30.png'), require('./images/card31.png'), require('./images/card32.png'),
  require('./images/card33.png'), require('./images/card34.png'), require('./images/card35.png'),
  require('./images/card36.png'), require('./images/card37.png'), require('./images/card38.png'),
  require('./images/card39.png'), require('./images/card40.png'), require('./images/card41.png'),
  require('./images/card42.png'), require('./images/card43.png'), require('./images/card44.png'),
  require('./images/card45.png'), require('./images/card46.png'), require('./images/card47.png'),
  require('./images/card48.png'), require('./images/card49.png'), require('./images/card50.png'),
  require('./images/card51.png'), require('./images/card52.png'), require('./images/card53.png'),
  require('./images/card54.png'), require('./images/card55.png'), require('./images/card56.png'),
  require('./images/card57.png'), require('./images/card58.png'), require('./images/card59.png'),
  require('./images/card60.png'), require('./images/card61.png'), require('./images/card62.png'),
  require('./images/card63.png'), require('./images/card64.png'), require('./images/card65.png'),
  require('./images/card66.png'), require('./images/card67.png'), require('./images/card68.png'),
  require('./images/card69.png'), require('./images/card70.png'), require('./images/card71.png'),
  require('./images/card72.png'), require('./images/card73.png'), require('./images/card74.png'),
  require('./images/card75.png'), require('./images/card76.png'), require('./images/card77.png'),
  require('./images/card78.png'), require('./images/card79.png'), require('./images/card80.png'),
];

export default () => {
  const [view, setView] = useState<number>(LANDING);

  const [points, setPoints] = useState<number>(0);
  const [gameMode, setGameMode] = useState<number>(MODE_BASIC);
  const [time, setTime] = useState<number>(0);

  const [matches, setMatches] = useState<Match[]>([]);

  const chooseMode = () => setView(MODE);

  const getGameStartFunction = () => {
    startGame();
  };

  const startGame = (mode: number = gameMode) => {
    setPoints(0);
    setMatches([]);
    setView(GAME);
    setGameMode(mode);
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
  const getViewComponent = () => {
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
            chooseMode={chooseMode}
            gameMode={gameMode}
            getGameStartFunction={getGameStartFunction}
            points={points}
            time={time}
            toLanding={toLanding}
            matches={matches}
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
            mode={gameMode}
            points={points}
            setPoints={setPoints}
            setTime={setTime}
            setView={setView}
            startGame={startGame}
            time={time}
            addSelection={addSelection}
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

  return getViewComponent();
};
