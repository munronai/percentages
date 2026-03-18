import { generateRoomCode } from './roomCodes';

describe('Room Code Utility', () => {
    it('generates a string with two words separated by a hyphen', () => {
        const code = generateRoomCode();
        expect(code).toMatch(/^[A-Z]+-[A-Z]+$/);
    });

    it('generates different codes on subsequent calls', () => {
        const code1 = generateRoomCode();
        const code2 = generateRoomCode();
        expect(code1).not.toBe(code2);
    });
});
