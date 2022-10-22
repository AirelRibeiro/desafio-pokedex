<script>
export default {
    props: ['evolutionData'],
    data(props) {
      console.log(props.evolutionData.evolucion);
      return {
        data: props.evolutionData.evolucion,
        thereAreEvolutions: !props.evolutionData.message,
        getData: props.evolutionData.getData
      }
    }
  }
</script>

<template>
  <div>
    <h2>Evoluções:</h2>
    <div id="evolutions" v-if="thereAreEvolutions">
      <div class="ev-pokemon" v-for="(pokemon) in data" v-bind:key="pokemon.id">
        <h3>{{ pokemon.name }}</h3>
        <img :src="`${pokemon.image}`" :alt="`${pokemon.name}`"/>
        <button v-on:click="`${getData(pokemon.name)}`" >Buscar</button>
      </div>
    </div>
    <h1 v-if="!thereAreEvolutions">{{ data.message }}</h1>
  </div>
</template>

<style>

h2 {
  font-family: 'Clap Hand', sans-serif;
  color: rgb(99, 52, 5);
  letter-spacing: .2rem;
  text-align: center;
  }

#evolutions {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  } 

.ev-pokemon {
  align-items: center;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  font-family: 'Poetsen One', sans-serif;
  padding: 2vh 0;
  }

.ev-pokemon button {
  background-color: rgba(99, 52, 5, 0.829);
  border: none;
  border-radius: 50px;
  color: bisque;
  font-family: 'Poetsen One', sans-serif;
  font-size: medium;
  height: 20%;
  }

.ev-pokemon * {
  margin: 0;
  }

@media screen and (max-width: 599px) {
  #evolutions {
    margin: 5vh auto;
    width: 95%;
  }

  .ev-pokemon {
    background-color: rgba(205, 134, 63, 0.568);
    height: 35vh;
    margin-bottom: 5vh;
    width: 35%;
  }

  
  .ev-pokemon h3 {
  color: rgb(99, 52, 5);
  }

}

@media screen and (min-width: 600px) and (max-width: 900px) {
  #evolutions {
    flex-direction: column;
  }

  #evolutions h2 {
    font-family: 'Poetsen One', sans-serif;
    color: rgb(99, 52, 5);
    letter-spacing: .2rem;
  }

  .ev-pokemon {
    background-color: rgba(255, 228, 196, 0.644);
    color: rgb(99, 52, 5);
    margin-bottom: 4vh;
  }
}

  @media screen and (min-width: 901px) {
    h2 {
      font-family: 'Poetsen One', sans-serif;
      color: rgb(99, 52, 5);
      letter-spacing: .2rem;
      text-align: center;
    }

    #evolutions {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      flex-wrap: wrap;
    }

    .ev-pokemon {
      background-color: rgba(255, 228, 196, 0.644);
      border-radius: 50px;
      color: rgb(99, 52, 5);
      display: flex;
      flex-direction: column;
      font-family: 'Poetsen One', sans-serif;
      margin-bottom: 4vh;
      align-items: center;
      padding: 2vh 0;
      width: 15vw;
    } 
  }
</style>