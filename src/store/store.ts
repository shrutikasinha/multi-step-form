import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';
import { suggestionsApi } from './slices/suggestionsSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    [suggestionsApi.reducerPath]: suggestionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      suggestionsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
