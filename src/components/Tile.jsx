import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import StyledTile from '../styled/Tile';
import { selectTile } from '../redux/actions';

const propTypes = {};

const defaultProps = {};

const Tile = ({ id, selected }) => {
  const dispatch = useDispatch();

  return (
    <StyledTile onClick={() => dispatch(selectTile(id))} selected={selected}>
      <div className="coordinates">{id}</div>
    </StyledTile>
  );
};

Tile.propTypes = propTypes;
Tile.defaultProps = defaultProps;

export default Tile;
