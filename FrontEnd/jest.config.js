module.exports = {
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest"
    },
    testEnvironment: "jsdom"
  };
  

  module.exports = {
    transformIgnorePatterns: [
      "/node_modules/(?!your-es6-package)"
    ]
  };
  