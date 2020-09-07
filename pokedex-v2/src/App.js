import React from 'react';
import Pokedex from "/components/pokedex";
import Pokemon from "/components/pokemon";
function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props}></Pokedex>}></Route>
      <Route exact path="/:pokemonId" render={(props) => <Pokemon {...props}></Pokemon>}></Route>
    </Switch>
  );
}

export default App;
