import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import alertReducer from './reducers/alert'
import authReducer from './reducers/authReducer'

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null)
    },
    setItem(value: string) {
      return Promise.resolve(value)
    },
    removeItem() {
      return Promise.resolve()
    },
  }
}

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['geoLocation'],
}

const rootReducer = combineReducers({
  // Add reducers here
  alert: alertReducer,
  auth: authReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
