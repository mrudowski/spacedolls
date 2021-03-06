// as selectors?
// size would be in place

import * as tilesDef from './tileDef';

export const getXYFromId = id => {
  const idArray = id.split(',');
  return { x: parseInt(idArray[0], 10), y: parseInt(idArray[1], 10) };
};

export const getIdFromXY = (x, y) => `${x},${y}`;

export const getXFromIndex = (index, size) => index % size.width;
export const getYFromIndex = (index, size) => Math.floor(index / size.width);

export const getIdFromIndex = (index, size) =>
  `${getXFromIndex(index, size)},${getYFromIndex(index, size)}`;

export const getIndexFromXY = (x, y, size) =>
  x + (y * size.width);

// export const getTileXFromId = id => parseInt(id.split(',')[0], 10);
// export const getTileYFromId = id => parseInt(id.split(',')[1], 10);

// export const getIndexFromId = (id, size) => {
// 	const {x, y} = getXYFromId(id);
// 	return getIndexFromXY(x, y, size);
// };

// ------

// export const hasWall = (tile) => !!tile.wall;
// export const hasDoll = (tile) => !!tile.dollId;

// some anti(?)pattern or not?
// it duplicates a selectors in some way
// and could be use be them
// but maybe it should be selector in first place?

// tight couple with redux state structure that it should be selector...
// only function here - do not duplicate data

export const getDataModel = tile => ({
  getId: 		() => tile.id, // only function here - do not duplicate simple data?
  //getXY:	() => getXYFromId(tile.id),
  hasWall: 	() => !!tile.wall,
  hasDoll: 	() => !!tile.dollId,
  getDollId: 	() => tile.dollId, // only function here - do not duplicate simple data?
  getWall: 	() => tile.wall,  // only function here - do not duplicate simple data?
  destroyWall() { tile.wall = null; },
  createWall() { tile.wall = tilesDef.getInitialStats(tilesDef.WALL); },
});

// better alternative?
// https://verekia.com/react/logic-less-jsx/

export class TileDataModel {
  constructor(tile) {
    this.tile = tile;
  }

  get id() {
    return this.tile.id;
  }

  hasWall() {
    return !!this.tile.wall;
  }

  hasDoll() {
    return !!this.tile.dollId;
  }
}
