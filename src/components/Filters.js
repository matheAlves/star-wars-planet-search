import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { filterByName,
    onChangeName,
    setNewNumericFilter,
    columnOptions,
    removeColumnOption,
    numericFilterLocalSettings,
    numericFilterOnChange,
    filterByNumericValues,
    clearNumericFilters,
    removeNumericFilter } = useContext(PlanetsContext);

  function localOnSubmit(e) {
    const { column, comparison, value } = numericFilterLocalSettings;
    e.preventDefault();
    removeColumnOption(column);
    setNewNumericFilter(({
      column,
      comparison,
      value,
    }));
  }

  return (
    <>
      <form onSubmit={ localOnSubmit }>
        <input
          name="search-by-name"
          data-testid="name-filter"
          value={ filterByName.name }
          placeholder="search by name"
          type="text"
          onChange={ onChangeName }
        />
        <select
          name="column"
          onChange={ numericFilterOnChange }
          data-testid="column-filter"
          value={ numericFilterLocalSettings.column }
        >
          {columnOptions.map((option) => <option key={ option }>{option}</option>)}
        </select>
        <select
          name="comparison"
          onChange={ numericFilterOnChange }
          data-testid="comparison-filter"
          value={ numericFilterLocalSettings.comparison }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          name="value"
          value={ numericFilterLocalSettings.value }
          onChange={ numericFilterOnChange }
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
      <div>
        {filterByNumericValues.map(
          (filter) => (
            <span
              key={ filter.column }
              data-testid="filter"
            >
              {`${filter.column} ${filter.comparison} ${filter.value}`}
              <button
                name={ filter.column }
                onClick={ removeNumericFilter }
                type="button"
              >
                X
              </button>
            </span>
          ),
        )}
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ clearNumericFilters }
        >
          Remover todas filtragens
        </button>
      </div>
    </>

  );
}

export default Filters;
