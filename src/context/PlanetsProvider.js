import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/swapi';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPlanets = async () => {
    setLoading(true);
    const planets = await fetchPlanets();
    setData(planets);
    setLoading(false);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    loading,
    data,
    getPlanets,
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
