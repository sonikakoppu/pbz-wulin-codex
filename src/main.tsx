import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { assetUrl } from './utils/assetUrl';

document.documentElement.style.setProperty(
  '--site-bg-image',
  `url("${assetUrl('/assets/site-bg.jpg')}")`
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
