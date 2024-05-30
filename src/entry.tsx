import React from 'react';

import { createRoot } from 'react-dom/client';
import App from './app';

const rootEl = document.getElementById('root') || document.body;
const root = createRoot(rootEl);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>

);
