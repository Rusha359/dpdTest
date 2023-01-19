import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import TableUsers from './components/TableUsers/TableUsers';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<TableUsers />} />
      </Routes>
    </div>
  );
}

export default App;
