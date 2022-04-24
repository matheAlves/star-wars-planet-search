import React from 'react';
import Table from './components/Table';
import Filters from './components/Filters';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Filters />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
