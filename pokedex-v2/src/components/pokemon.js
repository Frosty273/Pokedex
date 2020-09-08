import React from 'react';
import mockData from '../mockData.js';
import { Typography } from '@material-ui/core';
import { capitaliseFirstLetter } from '../utils/capitaliseFirstLetter';

const Pokemon = (props) => {

    const { match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = React.useState(mockData[`${pokemonId}`]);

    const generatePokemonJSX = () => {
        const { name, id, height, weight, types, sprites } = pokemon;
        const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        return (
            <div>
            <Typography variant="h1">
                {`${id}.`} {capitaliseFirstLetter(name)} <img src={front_default}/>
            </Typography>
            <img style={{ width: "300px", height: "300px"}} src={imageUrl} />
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
            {generatePokemonJSX()}
        </div>
        
    )
}

export default Pokemon;