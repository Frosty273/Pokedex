import React, { useEffect } from 'react';
import { Typography, CircularProgress, Button } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { displayStat } from '../utils/displayStat'; 
import { determineAbility } from '../utils/determineAbility'; 
import { filterMoveType } from '../utils/filterMoveType'; 
import { capitaliseName } from '../utils/capitaliseName';


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

    const nextPreviousPokemon = (num) => {
        const { id } = pokemon;
        return id + num
    }

    const generatePokemonData = () => {
        // const { name, id, height, weight, types, sprites, abilities, stats, moves } = pokemon;
        const { name, height, weight, types, sprites, abilities, stats, moves } = pokemon;
        const { front_default, front_shiny, back_default, back_shiny } = sprites;

        let move_learn_level = {}
        let moveset = moves.map(move => {
            move.version_group_details.map(move_level => {
                // console.log(move_level.move_learn_method)
                if (move_level.move_learn_method.name === "level-up") {
                    move_learn_level[move.move.name] = move_level.level_learned_at
                }
            })
        })
        console.log(moveset)
        // filterMoveType(capitaliseName(move.move.name), move.version_group_details, "level-up"
        let items = Object.keys(move_learn_level).map(function(key) {
            return [key, move_learn_level[key]];
          });
          
          // Sort the array based on the second element
          items.sort(function(first, second) {
            return first[1] - second[1];
          });
        console.log(items)
        
        return (
            <Container className="mt=2">
            <Row>
                <Col xs={12} md={6}>
                    <Card>
                        <Card.Header>
                            <h3>{capitaliseName(name)}</h3>
                            <img src={front_default} alt={name}/>
                            <img src={front_shiny} alt={name}/>
                            <img src={back_default} alt={name}/>
                            <img src={back_shiny} alt={name}/>
                        </Card.Header>
                        <Card.Body>
                            <h5>Abilities</h5>
                            {abilities.map((ability, key) => (
                                <div key={key}>
                                    <span>{determineAbility(capitaliseName(ability.ability.name), key, abilities.length)}</span>
                                </div>
                            ))}
                            <br/>
                            <h5>Type(s)</h5>
                            {types.map((type, key) => (
                                <div key={key}>
                                    <span>{capitaliseName(type.type.name)}</span>
                                </div>
                            ))}
                            <br/>
                            <h5>Height</h5>
                            {height/10} m
                            {/* 7 = 71.1cm */}
                            {/* 5 = 50.8cm */}
                            <br/>
                            <h5>Weight</h5>
                            {weight/10} kg
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
            <br/>
            <Row>
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Header>
                            <h4>Level Up</h4>
                        </Card.Header>
                        <Card.Body>
                            {/* {moves.map((move, key) => (
                                <div key={key}>
                                    <h6>{filterMoveType(capitaliseName(move.move.name), move.version_group_details, "level-up")}</h6>
                                </div>
                            ))}; */}
                            {items.map((move, key) => (
                                <div key={key}>
                                    <h6>{"Lv " + move[1] + ": " + capitaliseName(move[0])}</h6>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Header>
                            <h4>Technical Machine</h4>
                        </Card.Header>
                        <Card.Body>
                            {moves.map((move, key) => (
                                <div key={key}>
                                    <h6>{filterMoveType(capitaliseName(move.move.name), move.version_group_details, "machine")}</h6>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Header>
                            <h4>Egg Moves</h4>
                        </Card.Header>
                        <Card.Body>
                            {moves.map((move, key) => (
                                <div key={key}>
                                    <h6>{filterMoveType(capitaliseName(move.move.name), move.version_group_details, "egg")}</h6>
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
                <Button variant="primary" onClick={() => history.push("/" + nextPreviousPokemon(-1))}>
                    Previous Pokemon
                </Button>
            )}
            {pokemon !== undefined && (
                <Button variant="primary" onClick={() => history.push("/")}>
                    Back to Pokedex
                </Button>
            )}
            {pokemon !== undefined && (
                <Button variant="primary" onClick={() => history.push("/" + nextPreviousPokemon(1))}>
                    Next Pokemon
                </Button>
            )}
            {pokemon === undefined && <CircularProgress/>}
            {!!pokemon !== undefined && pokemon && generatePokemonData()}
            {pokemon === false && <Typography>Pokemon not found</Typography>}

        </div>
        
    )
}

export default Pokemon;