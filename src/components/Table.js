import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Loading from './Loading';

function Table() {
  const { data, loading, filterByName } = useContext(PlanetsContext);
  // console.log(filterByName.name);

  function filterName(rawData) {
    return rawData.filter(
      (planet) => planet.name.toLowerCase().includes(filterByName.name.toLowerCase()),
    );
  }
  return (
    <ul>
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
              {filterName(data).map(
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
                      <td>{name}</td>
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
    </ul>
  );
}

export default Table;
