import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './app/AppRouter';
import './styles/global.css';  
import 'antd/dist/reset.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

