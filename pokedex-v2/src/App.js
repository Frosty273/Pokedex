import React from 'react';
import Pokedex from './components/pokedex';
import Pokemon from './components/pokemon';
import { Switch, Route } from 'react-router-dom';
import mockData from './mockData.js';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props}/>}/>
      <Route exact path="/:pokemonId" render={(props) => <Pokemon {...props}/>}/>
    </Switch>
  );
}

export default App;
