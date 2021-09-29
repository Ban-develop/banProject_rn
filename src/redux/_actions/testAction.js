import types from './types';

export function test(txt){
    return{
        type:types.TEST_TYPE,
        txt : txt,
    };
}

export function test2(txt){
    return{
        type:types.TEST_TYPE2,
        txt : txt,
    };
}

export function addProduct(board){
    return{
        type:types.ADD_PRODUCT,
        board : board,
    };
}

export function delProduct(idx){
    return{
        type:types.DEL_RPODUCT,
        idx : idx,
    };
}