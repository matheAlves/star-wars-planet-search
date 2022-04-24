import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/swApi';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const getPlanets = async () => {
    setLoading(true);
    const planets = await fetchPlanets();
    setData(planets);
    setLoading(false);
  };

  const onChangeName = ({ target }) => {
    const { value } = target;
    setFilterByName({
      name: value,
    });
  };

  function setNewNumericFilter(newFilterObject) {
    setFilterByNumericValues((prevState) => [...prevState, newFilterObject]);
    // setFilterByNumericValues([newFilterObject]);
  }

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    loading,
    setLoading,
    data,
    getPlanets,
    filterByName,
    onChangeName,
    filterByNumericValues,
    setNewNumericFilter,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
