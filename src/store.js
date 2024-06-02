import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false,
      serializableCheck: {
        // Ignore these action paths in the serializability check
        ignoredActions: ['posts/LIST_POSTS_SUCCESS'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.headers'],
      },
     }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export default store;
