import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import storage from "redux-persist/lib/storage";
import {combineReducers} from "redux";
import {persistReducer} from "redux-persist"

import tokenReducer from "./tokenSlice";

const reducers = combineReducers({
    accessToken: tokenReducer
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {serializableCheck: false}
    )
});

export const tokenDispatch = () => useDispatch();
export const tokenSelector = useSelector;