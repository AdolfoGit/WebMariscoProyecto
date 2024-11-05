import React from 'react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';
import { UserProvider } from './UserContext';
import { render } from '@testing-library/react';

jest.mock('./serviceWorkerRegistration', () => ({
  register: jest.fn(),
}));

// Configurar el contenedor 'root' para el DOM simulado
beforeAll(() => {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'root';
  document.body.appendChild(rootDiv);
});

test('registers the service worker', async () => {
    render(
      <React.StrictMode>
        <UserProvider>
          <App />
        </UserProvider>
      </React.StrictMode>
    );
  
    require('./index');

    expect(serviceWorkerRegistration.register).toHaveBeenCalledTimes(1);
  });