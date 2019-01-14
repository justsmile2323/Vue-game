<template>
    <div class="cards">
        <div class="cards-results">
            <div class="cards-results-info">
                <span>Level: {{ level }}</span>
                <span>Time: {{ timer }}s</span>
                <span>Moves: {{ moves }} </span>
            </div>
            <div class="cards-results-controls">
                <button @click="changeLevel" class="cards-results-controls-gameControl">Change level</button>
                <button @click="resetGame" :disabled="!resetReady" class="cards-results-controls-gameControl">Reset</button>
                <button @click="shuffle" :disabled="!resetReady" class="cards-results-controls-gameControl">Shuffle Cards</button>
            </div>            
        </div>
        <app-card v-for="(card, index) in cards" :card="card" :key="index" @cardClicked="onCardClicked(index)"></app-card>
    </div>
</template>

<script>
    import AppCard from './Card.vue';
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        data(){
            return {
                firstCard:undefined,
                secondCard:undefined,
                resetReady:true
            }
        },
        components: {
            AppCard
        },
        computed:{
            ...mapGetters(['cards', 'timer', 'moves','level']),
            lastOpened(){
                let openedCarts = 0;
                for(let i=0; i<this.cards.length; i++){
                    if(this.cards[i].status == 'opened'){
                        openedCarts++;
                    }
                }
                return openedCarts == this.cards.length
            }            
        },
        methods:{
            ...mapActions(['openCard', 'closeCard', 'addMove', 'resetMoves','resetTimer', 'stopTimer', 'resetCards', 'shuffleCards', 'changeLevel',]),
            onCardClicked(index){
                
                this.openCard(index);

                if (this.firstCard === undefined){
                    this.firstCard = index;
                } else if (this.secondCard === undefined){
                    this.secondCard = index;
                    this.addMove();
                    if(this.match()){
                        this.firstCard = undefined;
                        this.secondCard = undefined;
                    } else {
                        this.closeCard(this.firstCard);                        
                        this.closeCard(this.secondCard);                        
                        this.firstCard = undefined;
                        this.secondCard = undefined;
                    }
                    if(this.lastOpened){
                        this.stopTimer();
                    }
                }
                
            },
            match(){
                return this.cards[this.firstCard].value == this.cards[this.secondCard].value            
            },
            resetGame(){
                this.firstCard = undefined;
                this.secondCard = undefined;
                this.resetReady = false;
                this.resetMoves();
                this.resetTimer();
                this.resetCards();
                setTimeout(()=>{
                    this.resetReady = true;
                },100);
            },
            shuffle(){
                this.resetGame();
                this.shuffleCards();
            }
        }
    }
</script>

<style lang="scss">
    .cards{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        &-results{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 30px 0;
            &-info{
                width: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                margin-bottom: 30px;
            }
            &-controls{
                width: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                &-gameControl{
                    text-transform: uppercase;
                    padding: 5px 10px;
                    cursor: pointer;
                }
            }
        }
    }    
</style>
