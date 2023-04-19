import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist';
import usersReducer from './User';
import {
    TypedUseSelectorHook,
    useDispatch as _useDispatch,
    useSelector as _useSelector
} from "react-redux";
import logger from "redux-logger";

// 리덕스에서 타입 가져오기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// useDispatch, useSelector에 타입 추가하여 타입 설정
export const useDispatch: () => AppDispatch = _useDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

const reducers = combineReducers({
    users: usersReducer,
});

const persistConfig = {
    key: 'root',
    storage
};

// redux-persist 사용
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
