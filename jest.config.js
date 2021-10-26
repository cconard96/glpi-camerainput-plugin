module.exports = {
   setupFilesAfterEnv: [],
   setupFiles: ['<rootDir>/tests/js/bootstrap.js'],
   transform: {
      '^.+\\.js$': 'babel-jest',
   },
   testEnvironment: 'jsdom',
   slowTestThreshold: 10,
};
