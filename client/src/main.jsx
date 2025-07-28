import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import Providers from './contexts/Providers.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <App />
    </Providers>
  </StrictMode>,
)
