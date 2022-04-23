import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { filterByName, onChangeName } = useContext(PlanetsContext);
  return (
    <input
      data-testid="name-filter"
      value={ filterByName.name }
      placeholder="name"
      type="text"
      onChange={ onChangeName }
    />
  );
}

export default Filter;
