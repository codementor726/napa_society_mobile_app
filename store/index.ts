import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './rootReducer';

const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>
export default store;
