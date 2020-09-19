import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
  Typography,
  TextField,
  Paper,
  Switch,
} from "@material-ui/core";
import {
  makeStyles,
  fade,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { capitaliseName } from "../utils/capitaliseName";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
  themeToggleContainer: {
    align: "center",
  },
  darkModeToggle: {
    display: "flex",
  },
  darkModeToggleText: {
    align: "center",
    color: "black",
  },
}));

const Pokedex = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [pokemonData, setPokemonData] = React.useState({});
  const [filter, setFilter] = React.useState("");
  const [darkMode, setDarkMode] = React.useState(false);

  const handleSearchChange = (event) => {
    setFilter(event.target.value);
  };

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=893`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    return (
      <Grid item xs={12} sm={3} key={pokemonId}>
        <Card onClick={() => history.push(`/${pokemonId}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${capitaliseName(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100%" }}>
        <div>
          <AppBar position="static">
            <Toolbar>
              <div className={classes.searchContainer}>
                <SearchIcon className={classes.searchIcon} />
                <TextField
                  className={classes.searchInput}
                  label="Pokemon"
                  variant="standard"
                  onChange={handleSearchChange}
                />
              </div>
              <div className={classes.themeToggleContainer}>
                <Switch
                  className={classes.darkModeToggle}
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <Typography className={classes.darkModeToggleText}>
                  Dark Theme
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
          {pokemonData ? (
            <Grid container spacing={2} className={classes.pokedexContainer}>
              {Object.keys(pokemonData).map(
                (pokemonId) =>
                  pokemonData[pokemonId].name.includes(filter) &&
                  getPokemonCard(pokemonId)
              )}
            </Grid>
          ) : (
            <CircularProgress />
          )}
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default Pokedex;
