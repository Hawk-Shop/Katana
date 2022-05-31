module.exports = {
  verbose: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
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