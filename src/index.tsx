import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { store } from './store';
import { Toaster } from 'react-hot-toast';
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Poppins, sans-serif',
            colorPrimary: '#315771',
            colorPrimaryActive: '#315771',
            colorText: '#315771',
          },
        }}
      >
        <>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{ style: { maxWidth: 500 } }}
          />
          <App />
        </>
      </ConfigProvider>
    </QueryClientProvider>
  </Provider>
);
