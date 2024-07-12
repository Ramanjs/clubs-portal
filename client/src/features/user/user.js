import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../utils/baseUrl';
import Cookies from 'js-cookie';

// Initial state for the user slice
const initialState = {
  loggedIn: false,        // Indicates if the user is logged in
  profileLoaded: false,   // Indicates if user profile has been loaded
  token: Cookies.get('club_token'),   // User authentication token stored in cookies
  handle: Cookies.get('club_handle'), // User handle stored in cookies
};

// If token and handle exist, set loggedIn to true
if (initialState.token && initialState.handle) {
  initialState.loggedIn = true;
}

// Async thunk for user login
export const login = createAsyncThunk('user', async (data, thunkAPI) => {
  fetch(apiBaseUrl + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      handle: data.username,
      password: data.password
    })
  })
  .then(async res => {
    if (!res.ok) {
      res = await res.json()
      throw new Error(res.message)
    }
    return res.json()
  })
  .then(res=> {
    thunkAPI.dispatch(loadToken(res.token))
    thunkAPI.dispatch(loggedIn(true))
    thunkAPI.dispatch(setHandle(res.handle))
  })
  .catch(err => {
    data.setError(err.message)
  })
  .finally(() => {
    data.setLoading(false)
  })
});

// Redux slice for user state management
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    loadToken: (state, action) => {
      state.token = action.payload;
      Cookies.set('club_token', action.payload); // Save token to cookies
    },
    setHandle: (state, action) => {
      state.handle = action.payload;
      Cookies.set('club_handle', action.payload); // Save user handle to cookies
    },
    logout: (state) => {
      state.loggedIn= false
      state.token = undefined
      state.handle = undefined
    }
  },
})

// Export actions from the slice
export const { loggedIn, loadToken, setHandle, logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
