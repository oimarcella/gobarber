import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Routes from './routes';
import SignIn from './pages/SignIn';

import Providers from './hooks/index';

const App: React.FC = () => (
  <>
    <Router>
      <Providers>
        <Routes />
      </Providers>
      <GlobalStyle />
    </Router>
  </>
);

export default App;
