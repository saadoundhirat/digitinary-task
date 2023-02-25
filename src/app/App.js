import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';
import HomePage from './main/pages/Home/HomePage';
import SignInPage from './main/pages/auth/sign-in/SignInPage';
import PostsPage from './main/pages/posts/PostsPage';
import { AuthProvider, useAuth } from './auth/AuthContext';
import axios from 'axios';

// /**
//  * Axios HTTP Request defaults
//  */
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Accept-Language'] = 'en-US,en;q=0.9';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

function App() {
  return (
    <AuthProvider>
      <ChildComponent />
    </AuthProvider>
  );
}

function ChildComponent() {
  const { isAuthenticated, user, error } = useAuth();

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/sign-in"
            element={isAuthenticated ? <Navigate to="/posts" /> : <SignInPage />}
          />
          <Route
            path="/posts"
            element={isAuthenticated ? <PostsPage /> : <Navigate to="/sign-in" />}
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}
export default App;
