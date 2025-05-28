// module.exports = {
//   testEnvironment: "jest-environment-jsdom",
//   testEnvironment: ["./jest.setup.js"],
// };
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  // ... otras configuraciones
  transformIgnorePatterns: [
    "node_modules/(?!query-string|decode-uri-component|split-on-first|filter-obj)",
  ],
};
