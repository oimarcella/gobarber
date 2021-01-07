import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';
// import Routes from './routes';

import SignIn from './pages/SignIn';

import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router>
      <AuthContext.Provider value={{ name: 'Marcella' }}>
        <SignIn />
      </AuthContext.Provider>
    </Router>
  </>
);

export default App;
