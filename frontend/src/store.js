import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import planReducer from './slices/planSlice';
import subscriptionReducer from './slices/subscriptionSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    plans: planReducer,
    subscriptions: subscriptionReducer,
  },
});

export { store };
export default store;
