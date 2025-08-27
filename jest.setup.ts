jest.mock('redis', () => ({
	createClient: jest.fn(() => ({
		connect: jest.fn().mockResolvedValue(undefined),
		quit: jest.fn().mockResolvedValue(undefined),
		on: jest.fn(),
		get: jest.fn().mockResolvedValue(null),
		set: jest.fn().mockResolvedValue('OK'),
	})),
}));
