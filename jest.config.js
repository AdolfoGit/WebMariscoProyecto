module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    "^.+\\.scss$": "jest-scss-transform" // Asegúrate de tener este transformador instalado

  },
  transformIgnorePatterns: [
    'node_modules/(?!gapi-script)',
    'node_modules/' // Ignora todos los módulos en node_modules
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', "<rootDir>/node_modules/",'<rootDir>/jest.setup.js'],
};