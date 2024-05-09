import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './components/layout';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/appRoutes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Layout>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Layout>
  </React.StrictMode>
);

