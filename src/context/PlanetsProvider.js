import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/swApi';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [numericFilterLocalSettings, setNumericFilterLocalSettings] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  function numericFilterOnChange({ target }) {
    const { name, value } = target;
    setNumericFilterLocalSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

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
  }

  function removeNumericFilter({ target }) {
    console.log(target.name);
    const { name } = target;
    const newFilterArray = filterByNumericValues.filter(
      (filter) => filter.column !== name,
    );
    setFilterByNumericValues(newFilterArray);
    setColumnOptions((prevState) => ([...prevState, name]));
  }

  function clearNumericFilters() {
    setFilterByNumericValues([]);
  }

  function removeColumnOption(optionToRemove) {
    const newOptions = columnOptions.filter((option) => option !== optionToRemove);
    setColumnOptions(newOptions);
    setNumericFilterLocalSettings((prevState) => ({
      ...prevState,
      column: newOptions[0],
    }));
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
    clearNumericFilters,
    setNewNumericFilter,
    columnOptions,
    removeColumnOption,
    numericFilterLocalSettings,
    numericFilterOnChange,
    removeNumericFilter,
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
