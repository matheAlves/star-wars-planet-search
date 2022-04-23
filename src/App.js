import React from 'react';
import Table from './components/Table';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
