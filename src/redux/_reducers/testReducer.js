import types from '../_actions/types';

const defaultState = {
   txt:'origin',
   board : [{subject : 'subject1', content : 'content1'},{subject : 'subject2', content : 'content2'}]
}

export default test = (state = defaultState, action) => {
    // For Debugger
    //console.log(state);

    switch (action.type) {
        case types.TEST_TYPE:
            return {
                txt : action.txt,
                board : [...state.board]
            };
        case types.TEST_TYPE2:
            console.log("reducer");
            return {
                txt : (state.txt).concat('',action.txt,'!'),
                board : [...state.board]
        };
        case types.ADD_PRODUCT:
            return {
                txt: [...state.txt],
                board : [
                    ...state.board,
                    action.board
                ]
            };
        case types.DEL_RPODUCT:
            return {
                txt: [...state.txt],
                board : [
                    ...state.board.slice(0,action.idx),
                    ...state.board.slice(action.idx + 1)
                ]
        };
        default:
          return state;
    }
};
