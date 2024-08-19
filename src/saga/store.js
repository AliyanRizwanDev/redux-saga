import {call,put,takeEvery} from 'redux-saga/effects';
import axios from 'axios';      
import {configureStore, createSlice} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'

export const todoSlice = createSlice({
    name:"todo",
    initialState:{
        data:[],
        loading: false,
        error:null

    },
    reducers:{
        fetchDataRequest:(state)=>{
            state.loading = true;
        },
        fetchDataSuccess:(state,action)=>{
            state.loading = false;
            state.data = action.payload;
        },
        fetchDataFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        }
        
    }
})


function* fetchTodo(){
    try {
        const response = yield call(axios.get,"https://jsonplaceholder.typicode.com/todos");

        yield put(todoSlice.actions.fetchDataSuccess(response.data));
        
    } catch (error) {
        yield put(todoSlice.actions.fetchDataFailure(error.message));
        
    }
}

function* rootSaga(){
    yield takeEvery(todoSlice.actions.fetchDataRequest.type,fetchTodo);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer:{
        todo: todoSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    
})

sagaMiddleware.run(rootSaga);