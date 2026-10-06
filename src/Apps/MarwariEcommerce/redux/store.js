import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Purge any legacy cart data cached in AsyncStorage from earlier sessions
AsyncStorage.getItem('persist:root')
  .then((raw) => {
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.cart) {
          delete parsed.cart;
          AsyncStorage.setItem('persist:root', JSON.stringify(parsed));
        }
      } catch {
        // ignore parse error
      }
    }
  })
  .catch(() => { });

AsyncStorage.removeItem('persist:cart').catch(() => { });
AsyncStorage.removeItem('cart').catch(() => { });

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['profile'], // persist only profile reducer
  blacklist: ['cart', 'auth'], // explicitly prevent cart or auth from ever persisting
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // suppress redux-persist warnings
    }),
});

export const persistor = persistStore(store);
export default store;
