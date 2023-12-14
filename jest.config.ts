import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  moduleNameMapper: {
    "@modules/(.*)": "<rootDir>/src/modules/$1",
    "@shared/(.*)": "<rootDir>/src/shared/$1",
  },
  preset: "ts-jest",
  rootDir: ".",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts", "**/*.spec.tsx", "**/*.test.ts", "**/*.test.tsx"],
  testPathIgnorePatterns: ["node_modules", "dist"],
  testTimeout: 10000,
  transform: {
    "^.+\\.(t|j)s$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  verbose: false,
};

export default config;
