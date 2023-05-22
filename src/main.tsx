// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';
import './main.scss';

if (process.env.DEV && process.env.MODE === 'dev-mock-api') {
  const { worker } = await import('./mocks/browser');
  worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// dev 環境時，StrictMode 會導致 App render 兩次，會影響 Spotify 登入功能
// https://vitejs.dev/guide/env-and-mode.html
root.render(
  import.meta.env.DEV ? (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ) : (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )
);
