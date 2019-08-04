import { createSlice, createSelector } from 'redux-starter-kit';
import * as boardUtil from '../utils/board';
import * as levelUtil from '../utils/level';

const board = createSlice({
  slice: 'board',
  initialState: {
		width: 0,
		height: 0,
    tiles: {},
    selectedTileId: null
  },
  reducers: {
    setBoard: (state, action) => {
      // You can "mutate" the state in a reducer, thanks to Immer
      const levelId = action.payload;
      const tiles = boardUtil.prepareData(levelId);
			const level = levelUtil.getLevel(levelId);
      state.tiles = tiles;
      state.width = level.size.width;
      state.height = level.size.height;
    },
    // TODO: change SelectTile to SelectTileId?
    selectTile: (state, action) => {
      state.selectedTileId = action.payload;
    },
    toggleWall: state => {
      const tile = state.selectedTileId && state.tiles[state.selectedTileId];
      if (tile && tile.wall) {
        tile.wall = false;
      } else if (tile && !tile.doll) {
        tile.wall = true;
      }
    },
		changeDollPosition: (state, action) => {
      const {sourceTileId, destinationTileId} = action.payload;
			const sourceTile = state.tiles[sourceTileId];
			const destinationTile = state.tiles[destinationTileId];
      // thanks to immer
			// change doll to dollId
			destinationTile.doll = sourceTile.doll;
			sourceTile.doll = null;
			state.selectedTileId = destinationTile.id;
		}
  }
});

// selectors

const getSize = createSelector(
	['board.width', 'board.height'],
	(width, height) => {
		return {width, height};
	}
);
const getTiles = createSelector(['board.tiles']);
const getSelectedTileId = createSelector(['board.selectedTileId']);

const getSelectedTile = createSelector(
  [getTiles, getSelectedTileId],
  (tiles, selectedTileId) => {
    if (selectedTileId) {
      return tiles[selectedTileId];
    } else {
      return null;
    }
  }
);

board.selectors = {
  // replacing board.selectors.getBoard,
	getSize,
	getTiles,
	getSelectedTileId,
	getSelectedTile,
};

export default board;
