import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const Providers: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);
export default Providers;
