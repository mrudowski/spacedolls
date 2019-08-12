import EasyStar from 'easystarjs';
import forEach from 'lodash/each';
import * as tileUtil from './tile';
// import store from '../redux/store';

const easystar = new EasyStar.js();
easystar.enableSync();
// easystar.setIterationsPerCalculation(1000);

const createGrid = (tilesData, boardSize) => {
	const {width: boardWidth} = boardSize;
	const grid = [];

  for (let i = 0; i < boardWidth; i++) {
    grid.push([]);
  }

  forEach(tilesData, (tile, tileId) => {
    const {x, y} = tileUtil.getXYFromId(tileId);
    // reversing order
		// TODO hasDoll()
    grid[y][x] =
      tile.dollId || tile.wall ? '1' : '0';
  });

  return grid;
};

export const prepareGrid = (tilesData, boardSize) => {
	const grid = createGrid(tilesData, boardSize);
  easystar.setGrid(grid);
  easystar.setAcceptableTiles(['0']);
};

export const calculatePath = (startX, startY, endX, endY, callbackFunction) => {
  easystar.findPath(
		startX,
		startY,
    endX,
    endY,
    callbackFunction
  );
  easystar.calculate();
};
