<template>
  <div id="app" class="game">
    <app-start v-if="!play"></app-start>
    <app-cards v-else></app-cards>   
  </div>
</template>

<script>
  import AppStart from './components/Start-screen.vue';
  import AppCards from './components/Cards.vue';
  import {mapGetters} from 'vuex';

  export default {   
    components: {
      AppStart,
      AppCards
    },
    computed:{
      ...mapGetters(['play'])
    }
  }
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    font-family: Verdana, Geneva, sans-serif;
    line-height: 1;
    background: #ccc;
  }
</style>
