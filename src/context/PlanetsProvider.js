import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/swapi';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterByName, setFilterByName] = useState({ name: '' });

  const getPlanets = async () => {
    setLoading(true);
    const planets = await fetchPlanets();
    // if (filterByName.name.length) {
    //   console.log('caiu aqui');
    //   const filteredPlanets = planets.filter(
    //     (planet) => planet.name.toLowerCase().includes(filterByName.name.toLowerCase()),
    //   );
    //   setData(filteredPlanets);
    // }
    setData(planets);
    setLoading(false);
  };

  const onChangeName = ({ target }) => {
    const { value } = target;
    setFilterByName({
      name: value,
    });
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    loading,
    data,
    getPlanets,
    filterByName,
    onChangeName,
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
