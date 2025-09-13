import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  plans: [],
  loading: false,
  error: null,
};

const planSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    setPlans(state, action) {
      state.plans = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setPlans, setLoading, setError } = planSlice.actions;
export default planSlice.reducer;
