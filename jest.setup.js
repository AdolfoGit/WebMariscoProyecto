// jest.setup.js
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
global.paypal = {
    Buttons: {
      driver: jest.fn().mockReturnValue(() => <div>Mocked PayPal Button</div>),
    },
  };

  
global.TextDecoder = global.TextDecoder || require('util').TextDecoder;
global.TextEncoder = global.TextEncoder || require('util').TextEncoder;
