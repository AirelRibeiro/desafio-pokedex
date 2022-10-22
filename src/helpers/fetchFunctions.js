async function getPokemonSpecies(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  const responseJson = await response.json();
  return responseJson;
}

async function getPokemonEvolucions(url) {
  const response = await fetch(url);
  const responseJson = await response.json();
  let { chain } = responseJson;
  const evolucions = [];
  try {
    do {
      evolucions.push(chain.species.name);
      if (chain.evolves_to.length > 1) {
        evolucions.push(...chain.evolves_to.map(({ species }) => species.name));
        break;
      }
      chain = chain.evolves_to[0];
    } while (chain && chain.evolves_to);
    return evolucions;
  } catch(err) {
    return { message: 'Sem hitórico de evoluções disponível!' }
  }
}

async function getPokemonInformacion(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const responseJson = await response.json();
  return responseJson;
}

function createPokemonObject(pokemonSpecies, pokemonInformation) {
  const pokemon = {
    id: pokemonInformation.id,
    name: pokemonInformation.name.toUpperCase(),
    measurements: `${pokemonInformation.height} de altura e ${pokemonInformation.weight} de peso`,
    color: pokemonSpecies.color.name,
    happiness: pokemonSpecies.base_happiness,
    captureRate: pokemonSpecies.capture_rate,
    growthRate: pokemonSpecies.growth_rate.name,
    generation: pokemonSpecies.generation.name,
    habitat: pokemonSpecies.habitat.name,
    image: pokemonInformation.sprites.front_default,
    abilities: pokemonInformation.abilities.map(({ability}) => `${ability.name[0].toUpperCase()}${ability.name.substring(1)}`),
    stats: pokemonInformation.stats.map(({base_stat, stat}) => {
      const name = `${stat.name[0].toUpperCase()}${stat.name.substring(1)}`;
      return `${name} - ${base_stat}`;
    }),
    moves: pokemonInformation.moves.map(({move}) => `${move.name[0].toUpperCase()}${move.name.substring(1)}`),
  }
  return pokemon;
}

async function createEvolutionArray(names) {
  const pokemons = await Promise.all(names.map((name) => getPokemonInformacion(name)));
  const evolutions = pokemons.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name.toUpperCase(),
    image: pokemon.sprites.front_default
  }));
  return evolutions;
}

async function fetchAllData(name) {
  try {
    const species = await getPokemonSpecies(name);
    const informations = await getPokemonInformacion(name);
    const evolucionUrl = species.evolution_chain.url;
    const evolucionsNames = await getPokemonEvolucions(evolucionUrl);
    const pokemon = createPokemonObject(species,informations);
    const evoluation = evolucionsNames.message ? evolucionsNames : await createEvolutionArray(evolucionsNames);
    return [pokemon, evoluation];
  } catch(err) {
    return { message: 'Pokemon não encontrado!' }
  }
}

export default fetchAllData;

// Referência de como colocar primeira letra maiúscula:
// https://www.freecodecamp.org/portuguese/news/como-colocar-a-primeira-letra-de-cada-palavra-em-maiuscula-em-javascript-um-tutorial-de-uppercase-em-js/#:~:text=Como%20colocar%20em%20mai%C3%BAscula%20a%20primeira%20letra%20de%20uma%20palavra&text=Em%20JavaScript%2C%20temos%20um%20m%C3%A9todo,em%20strings%20ou%20em%20palavras.
