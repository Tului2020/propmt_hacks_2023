import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './app/app';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
