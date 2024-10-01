import Builder from "../../utils/redux/builder";

/**
 * slice name
 * @type {string}
 */

function random(n) {
  return Math.floor(Math.random() * Math.floor(n));
}

function shuffle(arr) {
  for (var i = 0; i < arr.length; i++) {
    var j = random(arr.length);
    var k = random(arr.length);
    var t = arr[j];
    arr[j] = arr[k];
    arr[k] = t;
  }
  return arr;
}

const builder = new Builder({
  name: "app", 
  initialState: {
    listFull: [],
    list: [],
    again: [],
    page: "cards",
    activeWord: 0, 
    isFilter: true, 
    isShuffle: false, 
  }, 
  reducers: {
    nextWord(state) {
      state.activeWord = state.activeWord + 1 < state.list.length ? state.activeWord + 1 : state.activeWord;
    }, 
    getList(state, action){
      state.list = action.payload;
      state.listFull = action.payload;
    }, 
    setFilter(state, action){
      if (action.payload){
        state.isFilter = true;
        state.list = state.list.filter(({isHSK5}) => isHSK5 === true)
      } else {
        state.isFilter = false;
        state.list = state.listFull
      }
    }, 
    restart(state){
      state.again = [];
      state.activeWord = 0;
    }, 
    shuffleList(state, action){
      if (action.payload){
        state.isShuffle = true;
        state.list = shuffle(state.list)
      } else {
        state.isShuffle = false;
        if (state.isFilter){
          state.list = state.listFull.filter(({isHSK5}) => isHSK5 === true)
        } else {
          state.list = state.listFull;
        }
      }
    }
  }
})

builder.create();

const app = builder.export();

export const {useApp} = app.selectors;
export const {nextWord, getList, setFilter, restart, shuffleList} = app.actions;
export default app;
