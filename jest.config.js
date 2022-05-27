module.exports = {
  verbose: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    "node_modules/(?!variables/.)"
  ],
  testMatch: ['<rootDir>/client/src/__tests__/?(*.)test.js'],
  setupFilesAfterEnv: [
    "<rootDir>/client/src/setupTest.js"
  ]
}