import React, { useEffect } from 'react';
import { Typography, CircularProgress, Button } from '@material-ui/core';
import { capitaliseFirstLetter } from '../utils/capitaliseFirstLetter';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { displayStat } from '../utils/displayStat'; 
import { determineAbility } from '../utils/determineAbility'; 
import { filterMoveType } from '../utils/filterMoveType'; 


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

    const generatePokemonData = () => {
        console.log(pokemon)
        // const { name, id, height, weight, types, sprites, abilities, stats, moves } = pokemon;
        const { name, height, weight, types, sprites, abilities, stats, moves } = pokemon;
        const { front_default, front_shiny, back_default, back_shiny } = sprites;
        
        return (
            <Container className="mt=2">
            <Row>
                <Col xs={12} md={6}>
                    <Card>
                        <Card.Header>
                            <h3>{capitaliseFirstLetter(name)}</h3>
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
                            <h5>Type(s)</h5>
                            {types.map((type, key) => (
                                <div key={key}>
                                    <span>{capitaliseFirstLetter(type.type.name)}</span>
                                </div>
                            ))}
                            <br/>
                            <h5>Height</h5>
                            {height}
                            <br/>
                            <h5>Weight</h5>
                            {weight}
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
            <Row>
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Header>
                            <h3>Learnset</h3>
                        </Card.Header>
                        <Card.Body>
                        <h4>Level Up</h4>
                            {moves.map((move, key) => (
                                <div key={key}>
                                    <h6>{filterMoveType(capitaliseFirstLetter(move.move.name), move.version_group_details, "level-up")}</h6>
                                </div>
                            ))};
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Body>
                        <br/>
                        <br/>
                        <br/>
                        <h4>Technical Machine</h4>
                            {moves.map((move, key) => (
                                <div key={key}>
                                    <h6>{filterMoveType(capitaliseFirstLetter(move.move.name), move.version_group_details, "machine")}</h6>
                                </div>
                            ))};
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Body>
                        <br/>
                        <br/>
                        <br/>
                        <h4>Egg Moves</h4>
                            {moves.map((move, key) => (
                                <div key={key}>
                                    <h6>{filterMoveType(capitaliseFirstLetter(move.move.name), move.version_group_details, "egg")}</h6>
                                </div>
                            ))};
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