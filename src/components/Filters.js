import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { filterByName,
    onChangeName,
    setNewNumericFilter,
    columnOptions,
    removeColumnOption,
    numericFilterLocalSettings,
    filterOptions,
    numericFilterOnChange,
    filterByNumericValues,
    clearNumericFilters,
    orderFilterOnChange,
    removeNumericFilter,
    setOrderFilter } = useContext(PlanetsContext);

  function localOnSubmit() {
    const { column, comparison, value } = numericFilterLocalSettings;
    removeColumnOption(column);
    setNewNumericFilter(({
      column,
      comparison,
      value,
    }));
  }

  return (
    <>
      <form>
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
          onClick={ localOnSubmit }
          data-testid="button-filter"
          type="button"
        >
          Filtrar
        </button>
      </form>
      <select
        data-testid="column-sort"
        onChange={ orderFilterOnChange }
      >

        {filterOptions.map(
          (option) => <option value={ option } key={ option }>{option}</option>,
        )}
      </select>

      <label htmlFor="ASC">
        ASC
        <input
          onChange={ orderFilterOnChange }
          name="order"
          value="ASC"
          type="radio"
          id="ASC"
          data-testid="column-sort-input-asc"
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          onChange={ orderFilterOnChange }
          type="radio"
          name="order"
          value="DESC"
          id="DESC"
          data-testid="column-sort-input-desc"
        />
      </label>
      <button
        onClick={ setOrderFilter }
        data-testid="column-sort-button"
        type="button"
      >
        Ordenar
      </button>

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
