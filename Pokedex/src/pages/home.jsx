import React from 'react';
import Search from '../components/search';
import { fetchPokemon } from '../utils/getPokemon';
import PokemonData from '../components/pokemonData';
import { Spinner, Alert } from 'react-bootstrap';

const spinnerStyle = {
    width: '10rem',
    height: '10rem',
    borderWidth: '1rem',
}

const spinnerWrapperStyle = {
    textAlign: 'center',
    marginTop: '50px',
}

export default function HomePage() {

    const [pokemon, setPokemon] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const getPokemon = async (query) => {
        if (!query) {
            setErrorMessage('You must enter a Pokemon name')
            return setError(true);
        }
        setError(false);
        setLoading(true);
        setTimeout(async () => {
            try {
                const response = await fetchPokemon(query);
                const results = await response.json();
                setPokemon(results);
                setLoading(false);
                setError(false)
            } catch (err) {
                setLoading(false);
                setError(true)
                setErrorMessage('Pokemon not found')
            }

        }, 1500);
    }

    return (
        <div>
            {error ? (
                <Alert variant='danger'>
                    {errorMessage}
                </Alert>
            ) : null}
            <Search getPokemon={getPokemon}/>
                {loading ? (
                    <div style={spinnerWrapperStyle}>
                        <Spinner style={spinnerStyle} animation="border"/>
                    </div>
                  )  : null}
                {!loading && pokemon ? (
                    <PokemonData name={pokemon.name} 
                    sprite={pokemon.sprites.front_default} 
                    spriteShiny={pokemon.sprites.front_shiny} 
                    spriteBack={pokemon.sprites.back_default}
                    spriteShinyBack={pokemon.sprites.back_shiny}
                    abilities={pokemon.abilities} 
                    stats={pokemon.stats} 
                    types={pokemon.types}/>
                ) : null}
        </div>
    )
}