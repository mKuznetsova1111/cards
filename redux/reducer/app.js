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
    listCurrent: [],
    list: [],
    listNoShuffle: [],
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
      state.listCurrent = action.payload;
      state.listNoShuffle = action.payload;
    }, 
    setFilter(state, action){
      if (state.activeWord > 0) return;
      const {isFilter, type} = action.payload;
      if (isFilter){
        state.isFilter = true;
        const newList = state.list.filter((item) => item[type] === true);
        state.list = newList;
      } else {
        state.isFilter = false;
        state.list = state.listFull;
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
    getFiltered(state, action){
      const {isShuffle, filterType} = action.payload;
      const middleList = state.listCurrent;
      console.log(filterType)
      if (!filterType){
        middleList.filter((item) => item[filterType] === true);
      }
      if (!isShuffle) {
        shuffle(middleList);
      }
      state.list = middleList;
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

// function getFiltered(filterType, filterInfo){
//   const {list, type} = filterInfo;
//   const actions = {
//     filter: () => ,
//     shuffle: () => ,
//   }

// }

// function getFiltered(list, type){
//   return list.filter((item) => item[type] === true);
// }

// function getShuffled(list){
//   return shuffle(list);
// }

const app = builder.export();

export const {useApp} = app.selectors;
export const {nextWord, getList, setFilter, restart, shuffleList, setLoaded, getFiltered} = app.actions;
export default app;
