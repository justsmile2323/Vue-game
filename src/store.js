import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    level:1,
    play:false,
    timer:true,
    time:0,
    moves:0,
    cards:[]
  },
  getters:{
    level(state){
      return state.level
    },
    play(state){
      return state.play
    },
    timer(state){
      return Math.floor(state.time)
    },
    moves(state){
      return state.moves
    },
    cards(state){
      return state.cards
    }
  },
  mutations: {
    openCard(state, index){
      state.cards[index].status = 'opened';      
    },
    closeCard(state, index){
      state.cards[index].status = 'closed';      
    },
    removeCards(state){
      state.cards = [];
    },
    startPlay(state){     
      state.play = true;
    },
    stopPlay(state){     
      state.play = false;
    },
    setLevel(state, newLevel){
      state.level = newLevel;
    },
    activateTimer(state){
      state.timer = true;
    },
    timerTick(state){     
      state.time=state.time+0.1;      
    },
    stopTimer(state){
      state.timer=false;
    },
    resetTimer(state){
      state.timer = false;
      state.time = 0;
    },
    addMove(state){
      state.moves++;
    },
    resetMoves(state){
      state.moves=0;
    },
    resetCards(state){
      for(let i=0; i<state.cards.length; i++){
        state.cards[i].status = 'closed';
      }
    },
    generateCards(state, amount){
      for(let i=0; i<amount; i++){
        let item = {
          value: i+1,
          status: 'closed'
        }        
        state.cards.push(item, Object.assign({}, item));       
      }      
    },
    shuffleCards(state){
      state.cards.sort(function(){return Math.random() - 0.5});
    }
  },
  actions: {
    openCard(store, index){
      store.commit('openCard', index);
    },
    closeCard(store, index){
      setTimeout(()=>{
        store.commit('closeCard', index);
      },500);      
    },
    shuffleCards(store){
      store.commit('shuffleCards');
    },
    addMove(store){
      store.commit('addMove');
    },
    resetMoves(store){
      store.commit('resetMoves');
    },
    startTimer(store){
      store.commit('activateTimer');
      let runTimer = setInterval(()=>{
        if (this.state.timer){
          store.commit('timerTick');
        } else {
          clearTimeout(runTimer);
        }
      },100);

    },
    stopTimer(store){
      store.commit('stopTimer');
    },
    resetTimer(store){
      store.dispatch('stopTimer');
      store.commit('resetTimer');           
      setTimeout(()=>{        
        store.dispatch('startTimer');
      },100);
      
    },
    resetCards(store){
      store.commit('resetCards');
    },
    setLevel(store, newLevel){
      store.commit('setLevel', newLevel);
    },
    start(store, newLevel){
      store.commit('setLevel', newLevel);
      store.commit('generateCards', newLevel);
      store.commit('shuffleCards');
      store.commit('startPlay');
      store.dispatch('startTimer');
    },
    changeLevel(store){
      store.commit('stopPlay');
      store.dispatch('stopTimer');
      store.commit('resetTimer');
      store.commit('resetMoves');
      store.commit('removeCards');
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
