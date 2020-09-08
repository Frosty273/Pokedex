import React, { useEffect } from 'react';
import { Typography, CircularProgress, Button } from '@material-ui/core';
import { capitaliseFirstLetter } from '../utils/capitaliseFirstLetter';
import axios from 'axios';

const Pokemon = (props) => {

    const { match, history } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = React.useState(undefined);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(function (response) {
            const { data } = response;
            setPokemon(data);
        })
        .catch(function (error) {
            setPokemon(false);
        })
    }, [pokemonId]);

    const generatePokemonJSX = () => {
        const { name, id, height, weight, types, sprites } = pokemon;
        const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        return (
            <div>
            <Typography variant="h1">
                {`${id}.`} {capitaliseFirstLetter(name)} <img src={front_default} alt="Front Pokemon sprite"/>
            </Typography>
            <img style={{ width: "300px", height: "300px"}} src={imageUrl} alt="Pokemon"/>
            <Typography variant="h3">
                Pokemon Info
            </Typography>
            <Typography>
                Height: {height}
            </Typography>
            <Typography>
                Weight: {weight}
            </Typography>
            <Typography variant="h6">
                Types
            </Typography>
            {types.map((typeInfo) => {
                const { type } = typeInfo;
                const { name } = type;
            return <Typography key={name}> {`${capitaliseFirstLetter(name)}`}</Typography>
            })}
            </div>
        )
    }

    return (
        <div>
            {pokemon === undefined && <CircularProgress />}
            {!!pokemon !== undefined && pokemon && generatePokemonJSX()}
            {pokemon === false && <Typography>Pokemon not found</Typography>}
            {pokemon !== undefined && (
                <Button variant="contained" onClick={() => history.push("/")}>
                    Back to Pokedex
                </Button>
            )}
        </div>
        
    )
}

export default Pokemon;