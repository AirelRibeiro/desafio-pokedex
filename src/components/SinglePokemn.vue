<script>
export default {
    props: ['pokemonData'],
    data(props) {
      return {
        data: props.pokemonData
      }
    }
  }
</script>

<template>
  <div id="single-pokemon">
    <div id="name-image">
      <h2>{{ data.name }}</h2>
      <img :src="`${data.image}`" :alt="`${data.name}`"/>
    </div>
    <ul id="informations">
      <p>{{ `Id:  ${data.id};` }}</p>
      <p>{{ `${data.measurements};` }}</p>
      <p>{{ `Cor:  ${data.color};` }}</p>
      <p>{{ `Felicidade básica:  ${data.happiness};` }}</p>
      <p>{{ `Taxa de captura:  ${data.captureRate};` }}</p>
      <p>{{ `Taxa de crescimento:  ${data.growthRate};` }}</p>
      <p>{{ `Geração:  ${data.generation};` }}</p>
      <p>{{ `Habitat: ${data.habitat};` }}</p>
      <p>Habilidades:
        <ul v-for="(h, i) in data.abilities" v-bind:key="i">
        <li>{{h}}</li>
      </ul>
      </p>
      <p>Estatísticas:
        <ul v-for="(e, i) in data.stats" v-bind:key="i">
        <li>{{e}}</li>
      </ul>
      </p>
      <p>Movimentos:
        <ul v-for="(m, i) in data.moves" v-bind:key="i">
        <li>{{m}}</li>
      </ul>
      </p>
    </ul>
  </div>
</template>
