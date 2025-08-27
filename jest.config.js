require('dotenv').config({ path: '.env.test' });

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/**/*.test.ts'],
	moduleDirectories: ['node_modules', 'src'],
	testTimeout: 30000,
	setupFilesAfterEnv: ['./jest.setup.ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@config/(.*)$': '<rootDir>/src/config/$1',
		'^@routes/(.*)$': '<rootDir>/src/routes/$1',
		'^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
		'^@types/(.*)$': '<rootDir>/src/types/$1',
		'^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
		'^@loaders/(.*)$': '<rootDir>/src/loaders/$1',
		'^@services/(.*)$': '<rootDir>/src/services/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
	},
	verbose: true,
	forceExit: true,
};
