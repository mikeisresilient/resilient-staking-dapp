globalThis.global = globalThis;
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './styles/theme.css';
import "./styles/variables.css";
import "./styles/layout.css";
import "./styles/cards.css";
import "./styles/buttons.css";
import "./styles/forms.css";
import "./styles/staking.css";
import "./styles/dashboard.css";

import App from './components/App';
import { BlockchainProvider } from './contexts/BlockchainContext';

createRoot(document.getElementById('root')).render(
  <BlockchainProvider>
    <App />
</BlockchainProvider>
);