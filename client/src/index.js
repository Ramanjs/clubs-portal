import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Clubs from './pages/Clubs'
import Club from './pages/Club'
import Profile from './pages/Profile'
import Event from './pages/Event'
import LoginSuccess from './pages/LoginSuccess'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Create a root for React rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main application component
root.render(
  <React.StrictMode>
    {/* Provide the Redux store to the application */}
    <Provider store={store}>
      {/* Set up routing using BrowserRouter */}
      <BrowserRouter>
        {/* Define route configurations */}
        <Routes>
          {/* Route for user login */}
          <Route path='/login' element={<Login />} />

          {/* Route for successful login */}
          <Route path='/login/success' element={<LoginSuccess />} />

          {/* Route for displaying clubs, requires authentication */}
          <Route
            path='/clubs'
            element={
              <RequireAuth>
                <Navbar />
                <Clubs />
              </RequireAuth>
            }
          />

          {/* Route for displaying a specific club, requires authentication */}
          <Route
            path='/clubs/:handle'
            element={
              <RequireAuth>
                <Navbar />
                <Club />
              </RequireAuth>
            } />

          {/* Route for displaying user profile, requires authentication */}
          <Route
            path='/users/:handle'
            element={
              <RequireAuth>
                <Navbar />
                <Profile />
              </RequireAuth>
            } />

          {/* Route for displaying event details, requires authentication */}
          <Route
            path='/events/:handle'
            element={
              <RequireAuth>
                <Navbar />
                <Event />
              </RequireAuth>
            } />

          {/* Default route for displaying the home page, requires authentication */}
          <Route
            path='/'
            element={
              <RequireAuth>
                <Navbar />
                <Home />
              </RequireAuth>
            } />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
