<template>
  <div class="card" @click="cardClicked" :class="card.status">
    <div class="front">{{ card.value }}</div>
    <div class="back"></div>
  </div>
</template>

<script>
  export default {
    props:[
      'card'
    ],
    methods:{
      cardClicked(){
        if(this.card.status === 'closed'){
          this.$emit('cardClicked');
        }        
      }
    }
  }
</script>

<style lang="scss">
  .card{
    width: calc(20% - 10px);
    position: relative;
    padding-top: 20%;   
    margin: 5px;
    perspective: 1000px;
    cursor: pointer;
    .front, .back{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: .5s linear;
      transform-style: preserve-3d;
      backface-visibility: hidden;
    }
    .front{
      z-index: 2;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 36px;
      font-weight: 700;
      line-height: 1;          
    }
    .back{     
      background: black;
    }
    &.closed{
      .front{
        transform: rotateY(180deg);
      }
      .back{
        transform: rotateY(0deg);
      }      
    }
    &.opened{
      .front{
        transform: rotateY(360deg);
      }
      .back{
        transform: rotateY(180deg);
      }
    }
  }
</style>
