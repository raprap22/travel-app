import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import AuthRedirect from './components/authRedirect';
import { Layout } from './components/Layout';

const App: React.FC = () => {
  const tokenJWT = localStorage.getItem('jwt');

  return (
    <Router>
      <AuthRedirect />
      <Routes>
        {tokenJWT
          ? routes
              .filter((route) => route.type === 'auth')
              .map((route, index) => (
                <Route key={index} path={route.path} element={<Layout>{route.element}</Layout>} />
              ))
          : routes
              .filter((route) => route.type === 'noAuth')
              .map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
      </Routes>
    </Router>
  );
};

export default App;
