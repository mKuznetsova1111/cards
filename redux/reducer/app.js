import Builder from "../../utils/redux/builder";
import {useDispatch} from "react-redux";

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
    isLoaded: false, 
    filterStartType: "isHSK5",
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
      if (state.activeWord > 0) return;
      const {isFilter, type} = action.payload;
      if (isFilter){
        state.isFilter = true;
        state.list = state.list.filter((item) => item[type] === true)
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
      if (state.activeWord > 0) return;
      if (action.payload){
        state.isShuffle = true;
        state.list = shuffle(state.list)
      } else {
        state.isShuffle = false;
        state.list = state.list;
      }
    }, 
    setLoaded(state, action){
      state.isLoaded = true;
    }
  }
})

builder.create();

export function initApp(){
  const dispatch = useDispatch();
  const {isFilter, isShuffle, filterStartType} = useApp();
}

const app = builder.export();

export const {useApp} = app.selectors;
export const {nextWord, getList, setFilter, restart, shuffleList, setLoaded} = app.actions;
export default app;
