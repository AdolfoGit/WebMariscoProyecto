module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    "^.+\\.scss$": "jest-scss-transform" // Eliminar si no usas scss
  },
  transformIgnorePatterns: [
    'node_modules/(?!gapi-script)', // Mantén solo la excepción de gapi-script
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Solo una referencia a jest.setup.js
};
