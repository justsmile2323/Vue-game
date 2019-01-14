<template>
    <div class="startScreen">
      <div class="startScreen-inner">
        <h2 class="startScreen-heading">Choose level and press start</h2>
        <label class="startScreen-label">
            Level: <input type="number" v-model="newLevel" min="1" max="10" class="startScreen-input">
        </label>
        <button @click="startGame" class="startScreen-button">Start</button>
      </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        data(){
            return{
                newLevel:1
            }
        },
        methods:{
            ...mapActions(['start']),    
            startGame(){
                this.start(this.newLevel);
            }
        },
        watch:{
            newLevel(val){
                if (val > 10){                    
                    this.newLevel = 10;                    
                }
            }
        }
    }
</script>

<style lang="scss">
    .startScreen{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        &-inner{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: white;
            border: 2px solid black;
            padding: 30px;
        }
        &-heading{
            font-size: 36px;
            text-transform: uppercase;
            margin-bottom: 30px;
        }
        &-label{
            font-size: 18px;
            margin-bottom: 30px;
        }
        &-input{
            width: 70px;
            font-size: inherit;
            padding: 5px 10px;
        }
        &-button{
            font-size: 18px;
            text-transform: uppercase;
            padding: 10px 20px;
            cursor: pointer;
        }
    }
</style>
