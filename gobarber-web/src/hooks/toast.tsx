import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  title: string;
  description: string;
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, type, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        title,
        type,
        description,
      };

      setMessages([...messages, toast]);
    },
    [messages],
  );
  const removeToast = useCallback(
    (id: string) => {
      const messagesUpdated = messages.filter(message => message.id !== id);
      setMessages(messagesUpdated);
    },
    [messages],
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
        title: 'Title',
        description: 'description',
      }}
    >
      {children}

      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export { ToastProvider, useToast };
