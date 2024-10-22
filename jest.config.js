module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!gapi-script)'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Para manejar importaciones de estilos
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Ajusta según tu proyecto
  };
  