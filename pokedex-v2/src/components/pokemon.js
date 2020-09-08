import React, { useEffect } from 'react';
import { Typography, CircularProgress, Button } from '@material-ui/core';
import { capitaliseFirstLetter } from '../utils/capitaliseFirstLetter';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { displayStat } from '../utils/displayStat'; 
import { determineAbility } from '../utils/determineAbility'; 

const useStyles = makeStyles(() => ({
    spinnerStyle: {
        width: '10rem',
        height: '10rem',
        borderWidth: '1rem',
    },
    spinnerWrapperStyle: {
        textAlign: 'center',
        marginTop: '50px',
    },
    returnToPokedex: {
        align: 'flex',
        marginBottom: '10px',
    }
}))

const Pokemon = (props) => {

    const { match, history } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = React.useState(undefined);
    const classes = useStyles();

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(function (response) {
            const { data } = response;
            setPokemon(data);
        })
        .catch(function (error) {
            setPokemon(false);
        })
    }, [pokemonId]);

    // const generatePokemonJSX = () => {
    //     console.log(pokemon);
    //     const { name, id, height, weight, types, sprites } = pokemon;
    //     const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    //     const { front_default, front_shiny, back_default, back_shiny } = sprites;
    //     return (
    //         <div>
    //         <Typography variant="h1">
    //             {`${id}.`} {capitaliseFirstLetter(name)} 
    //             <img src={front_default} alt="Front Pokemon sprite"/>
    //             <img src={front_shiny} alt="Front Pokemon sprite"/>
    //             <img src={back_default} alt="Front Pokemon sprite"/>
    //             <img src={back_shiny} alt="Front Pokemon sprite"/>
    //         </Typography>
    //         <img style={{ width: "300px", height: "300px"}} src={imageUrl} alt="Pokemon"/>
    //         <Typography variant="h3">
    //             Pokemon Info
    //         </Typography>
    //         <Typography>
    //             Height: {height}
    //         </Typography>
    //         <Typography>
    //             Weight: {weight}
    //         </Typography>
    //         <Typography variant="h6">
    //             Types
    //         </Typography>
    //         {types.map((typeInfo) => {
    //             const { type } = typeInfo;
    //             const { name } = type;
    //         return <Typography key={name}> {`${capitaliseFirstLetter(name)}`}</Typography>
    //         })}
    //         </div>
    //     )
    // }

    const generatePokemonData = () => {
        const { name, id, height, weight, types, sprites, abilities, stats } = pokemon;
        const { front_default, front_shiny, back_default, back_shiny } = sprites;
        
        return (
            <Container className="mt=2">
            <Row>
                <Col xs={12} md={6}>
                    <Card>
                        <Card.Header>
                            <h5>{capitaliseFirstLetter(name)}</h5>
                            <img src={front_default} alt={name}/>
                            <img src={front_shiny} alt={name}/>
                            <img src={back_default} alt={name}/>
                            <img src={back_shiny} alt={name}/>
                        </Card.Header>
                        <Card.Body>
                            <h5>Abilities</h5>
                            {abilities.map((ability, key) => (
                                <div key={key}>
                                    <span>{determineAbility(ability.ability.name, key, abilities.length)}</span>
                                </div>
                            ))}
                            <br/>
                            <h5>Types</h5>
                            {types.map((type, key) => (
                                <div key={key}>
                                    <span>{capitaliseFirstLetter(type.type.name)}</span>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <Card>
                        <Card.Body>
                            <h4>Base Stats</h4>
                            {stats.map((stat,key) => (
                                <div key={key}>
                                    <strong>{displayStat(stat.stat.name)}</strong>
                                    <ProgressBar now={stat.base_stat} max={255} label={stat.base_stat}/> 
                                    {/* Max is 255 because it is the highest stat across all Pokemon */}
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        )
    }

    return (
        <div>
            {pokemon !== undefined && (
                <Button className={classes.returnToPokedex} variant="contained" onClick={() => history.push("/")}>
                    Back to Pokedex
                </Button>
            )}
            {pokemon === undefined && <CircularProgress/>}
            {!!pokemon !== undefined && pokemon && generatePokemonData()}
            {pokemon === false && <Typography>Pokemon not found</Typography>}

        </div>
        
    )
}

export default Pokemon;