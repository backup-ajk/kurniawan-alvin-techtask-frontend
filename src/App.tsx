import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './routes/Router';
import sceneList from './routes/routeList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Lunch Suggester</h1>
        <Router sceneList={sceneList} />
      </div>
    </BrowserRouter>
  );
}

export default App;
