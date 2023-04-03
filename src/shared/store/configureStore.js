import prodStore from './configureStore.prod.js';
import devStore from './configureStore.dev.js';

// eslint-disable-next-line import/no-mutable-exports
let store;

if (import.meta.env.PROD) {
  store = prodStore;
} else {
  store = devStore;
}

export default store;
