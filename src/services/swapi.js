const fetchPlanets = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await response.json();
  const results = await data.results;

  return results;
};

export default fetchPlanets;
