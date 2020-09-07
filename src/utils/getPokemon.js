const url = 'https://pokeapi.co/api/v2';
const query = {
    pokemon: 'pokemon'
}

export async function fetchPokemon(pokemon) {
    return fetch(`${url}/${query.pokemon}/${pokemon.toLowerCase()}`);
}