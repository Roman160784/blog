import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({

})

export type RootReducerType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})


