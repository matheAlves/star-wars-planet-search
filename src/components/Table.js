import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Loading from './Loading';

function Table() {
  const { data,
    loading,
    filterByName,
    filterByNumericValues,
    firstRender,
    order } = useContext(PlanetsContext);

  const [filteredData, setFilteredData] = useState(data);

  function orderList(list, orderFilter) {
    const { order: { column, sort } } = orderFilter;
    const unknown = list.filter((planet) => planet[column] === 'unknown');
    const known = list.filter((planet) => planet[column] !== 'unknown');

    if (sort === 'ASC') {
      const orderedKnown = known.sort((a, b) => a[column] - b[column]);
      return [...orderedKnown, ...unknown];
    } if (sort === 'DESC') {
      const orderedKnown = known.sort((a, b) => b[column] - a[column]);
      return [...orderedKnown, ...unknown];
    }
  }

  // function filterByNumeric(list, numericFilters) {
  //   let filtered = list;
  //   numericFilters.forEach((filter) => {
  //     const { column, value, comparison } = filter;
  //     switch (comparison) {
  //     case 'maior que':
  //       filtered = filtered.filter(
  //         (planet) => (Number(planet[column]) > Number(value)),
  //       );
  //       setFilteredData(filtered);
  //       break;
  //     case 'menor que':
  //       filtered = filtered.filter(
  //         (planet) => (Number(planet[column]) < Number(value)),
  //       );
  //       setFilteredData(filtered);
  //       break;
  //     case 'igual a':
  //       filtered = filtered.filter(
  //         (planet) => (Number(planet[column]) === Number(value)),
  //       );
  //       setFilteredData(filtered);
  //       break;
  //     default:
  //       setFilteredData(filtered);
  //     }
  //   });
  //   const orderedList = orderList(filteredData, order);
  //   return orderedList;
  // }

  useEffect(() => {
    function filterByNumeric(list, numericFilters) {
      let filtered = list;
      console.log(filtered);
      numericFilters.forEach((filter) => {
        const { column, value, comparison } = filter;
        switch (comparison) {
        case 'maior que':
          filtered = filtered.filter(
            (planet) => (Number(planet[column]) > Number(value)),
          );
          setFilteredData(filtered);
          break;
        case 'menor que':
          filtered = filtered.filter(
            (planet) => (Number(planet[column]) < Number(value)),
          );
          setFilteredData(filtered);
          break;
        case 'igual a':
          filtered = filtered.filter(
            (planet) => (Number(planet[column]) === Number(value)),
          );
          setFilteredData(filtered);
          break;
        default:
          setFilteredData(filtered);
        }
      });
      const orderedList = orderList(filteredData, order);
      return orderedList;
    }

    function filterRawData() {
      if (firstRender) {
        setFilteredData(data);
      } else {
        const test = filterByNumeric(data, filterByNumericValues);
        console.log(test);
        setFilteredData(test);
      }
    }

    filterRawData();
  }, [data, filterByNumericValues, firstRender, order, filteredData]);

  return (
    <div>
      { loading
        ? <Loading />
        : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Rotation Period</th>
                <th>Orbital Period</th>
                <th>Diameter</th>
                <th>Climate</th>
                <th>Gravity</th>
                <th>Terrain</th>
                <th>Surface Water</th>
                <th>Population</th>
                <th>Films</th>
                <th>Created</th>
                <th>Edited</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.filter(
                (planet) => planet.name.toLowerCase().includes(
                  filterByName.name.toLowerCase(),
                ),
              ).map(
                (planet) => {
                  const {
                    name,
                    rotation_period: rotationPeriod,
                    orbital_period: orbitalPeriod,
                    diameter,
                    climate,
                    gravity,
                    terrain,
                    surface_water: surfaceWater,
                    population,
                    films,
                    created,
                    edited,
                    url,
                  } = planet;
                  return (
                    <tr key={ name }>
                      <td
                        data-testid="planet-name"
                      >
                        {name}
                      </td>
                      <td>{rotationPeriod}</td>
                      <td>{orbitalPeriod}</td>
                      <td>{diameter}</td>
                      <td>{climate}</td>
                      <td>{gravity}</td>
                      <td>{terrain}</td>
                      <td>{surfaceWater}</td>
                      <td>{population}</td>
                      <td>{films}</td>
                      <td>{created}</td>
                      <td>{edited}</td>
                      <td>{url}</td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>)}
    </div>
  );
}

export default Table;
