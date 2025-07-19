import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { NuqsAdapter } from 'nuqs/adapters/react'

createRoot(
    document.getElementById('root')!
).render(
    <StrictMode>
        <NuqsAdapter fullPageNavigationOnShallowFalseUpdates>
            <App />
        </NuqsAdapter>
    </StrictMode>
);