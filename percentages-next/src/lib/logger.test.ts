import fs from 'fs';
import path from 'path';
import { logActivity } from './logger';

// Mock fs.promises to avoid actual file system writes during tests
jest.mock('fs', () => ({
    ...jest.requireActual('fs'),
    promises: {
        appendFile: jest.fn().mockResolvedValue(undefined),
        mkdir: jest.fn().mockResolvedValue(undefined),
        access: jest.fn().mockRejectedValue(new Error('File not found')), // Mock file not found by default
    }
}));

describe('Logger Utility', () => {
    const appendFileSpy = fs.promises.appendFile as jest.Mock;
    const mkdirSpy = fs.promises.mkdir as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('appends a formatted message to the log file', async () => {
        const message = 'Test activity';
        const metadata = { user: 'Alex', event: 'LOGIN' };
        
        await logActivity(message, metadata);

        expect(appendFileSpy).toHaveBeenCalledWith(
            expect.stringContaining('activity.log'),
            expect.stringMatching(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z\] INFO: Test activity {"user":"Alex","event":"LOGIN"}\n/)
        );
    });

    it('ensures the logs directory exists before writing', async () => {
        await logActivity('Test');
        expect(mkdirSpy).toHaveBeenCalled();
    });
});
