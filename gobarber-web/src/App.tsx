import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Routes from './routes';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  </>
);

export default App;
