<script>
import SinglePokemn from './SinglePokemn.vue';
import fetchAllData from '../helpers/fetchFunctions';
import EvolutionList from './EvolutionList.vue';

  export default {
    data() {
      return {
        pokemonName: '',
        pokemonData: false,
        evolutionData: false,
        pokemonNotFound: false
      }
    },
    methods: {
      async getData(name = this.pokemonName) {
        this.pokemonData = false;
        this.pokemonNotFound = false;
        const data = await fetchAllData(name.toLowerCase());
        if(data.message) {
          this.pokemonNotFound = true;
          return;
        }
        this.pokemonData = data[0];
        this.evolutionData = { evolucion: data[1], getData: this.getData };
      }
    },
    name: 'PokeDex',
    components: {
    SinglePokemn,
    EvolutionList
}
  }
</script>

<template>
  <div id="search">
    <input type="text" v-model="pokemonName" />
    <button v-on:click="`${getData()}`" >Buscar</button>
  </div>
  <div id="pokemon-informations">
    <SinglePokemn v-if="pokemonData" v-bind:pokemonData="pokemonData"/>
    <EvolutionList v-if="pokemonData" v-bind:evolutionData="evolutionData"/>
    <h1 v-if="!pokemonData && !pokemonNotFound" >Busque seu Pokemon!</h1>
    <h1 id="not-found" v-if="pokemonNotFound" >Pokemon não encontrado!!</h1>
  </div>
</template>

