import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/swApi';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const [filteredData, setFilteredData] = useState(data);
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [filterOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [numericFilterLocalSettings, setNumericFilterLocalSettings] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [orderFilterLocalSettings, setOrderFilterLocalSettings] = useState(({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  }));
  const [order, setOrder] = useState(({
    order: {
      column: 'surface_water',
      sort: 'ASC',
    },
  }));

  function setNewFilteredData(newFilteredData) {
    setFilteredData(newFilteredData);
  }

  function orderFilterOnChange({ target }) {
    switch (target.type) {
    case 'select-one':
      setOrderFilterLocalSettings((prevState) => ({
        order: ({
          column: target.value,
          sort: prevState.order.sort,
        }),
      }));
      break;
    case 'radio':
      setOrderFilterLocalSettings((prevState) => ({
        order: ({
          column: prevState.order.column,
          sort: target.value,
        }),
      }));
      break;
    default:
      break;
    }
  }

  function setOrderFilter() {
    setOrder(orderFilterLocalSettings);
    setFirstRender(false);
  }

  function numericFilterOnChange({ target }) {
    const { name, value } = target;
    setNumericFilterLocalSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const onChangeName = ({ target }) => {
    const { value } = target;
    setFilterByName({
      name: value,
    });
  };

  function setNewNumericFilter(newFilterObject) {
    setFilterByNumericValues((prevState) => [...prevState, newFilterObject]);
    setNumericFilterLocalSettings((prevState) => ({
      ...prevState,
      value: '',
    }));
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
    setColumnOptions([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
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
    const getPlanets = async () => {
      setLoading(true);
      const planets = await fetchPlanets();
      // fonte https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
      planets.sort((a, b) => a.name.localeCompare(b.name));
      setData(planets);
      setFilteredData(data);
      setLoading(false);
      setFirstRender(false);
    };
    getPlanets();
  }, [data]);

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
    orderFilterOnChange,
    filterOptions,
    setOrderFilter,
    firstRender,
    order,
    filteredData,
    setNewFilteredData,
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
