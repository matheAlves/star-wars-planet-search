import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { filterByName, onChangeName, setNewNumericFilter } = useContext(PlanetsContext);
  const [localSettings, setLocalSettings] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  function localOnChange({ target }) {
    const { name, value } = target;
    setLocalSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function localOnSubmit(e) {
    const { column, comparison, value } = localSettings;
    e.preventDefault();
    setNewNumericFilter(({
      column,
      comparison,
      value,
    }));
  }

  return (
    <>
      <input
        name="search-by-name"
        data-testid="name-filter"
        value={ filterByName.name }
        placeholder="search by name"
        type="text"
        onChange={ onChangeName }
      />
      <form
        onSubmit={ localOnSubmit }
      >
        <select
          name="column"
          onChange={ localOnChange }
          data-testid="column-filter"
          value={ localSettings.column }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <select
          name="comparison"
          onChange={ localOnChange }
          data-testid="comparison-filter"
          value={ localSettings.comparison }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          name="value"
          value={ localSettings.value }
          onChange={ localOnChange }
          data-testid="value-filter"
          type="number"
        />
        <button
          data-testid="button-filter"
          type="submit"
        >
          Filtrar
        </button>
      </form>
    </>
  );
}

export default Filters;
