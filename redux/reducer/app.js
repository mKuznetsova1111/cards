import Builder from "../../utils/redux/builder";

/**
 * slice name
 * @type {string}
 */

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
    restart(state, action){
      state.again = [];
      state.activeWord = 0;
    }
  }
})

builder.create();

const app = builder.export();

export const {useApp} = app.selectors;
export const {nextWord, getList, setFilter, restart} = app.actions;
export default app;
