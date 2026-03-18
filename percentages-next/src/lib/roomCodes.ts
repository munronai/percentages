const ADJECTIVES = [
    'SILVER', 'GOLDEN', 'CRYSTAL', 'SHINING', 'MYSTIC', 'GENTLE', 'BRAVE', 'SWIFT', 'CLEVER', 'BRIGHT',
    'PURPLE', 'AZURE', 'CRIMSON', 'EMERALD', 'INDIGO', 'AMBER', 'SCARLET', 'VIOLET', 'OBSIDIAN', 'IVORY'
];

const NOUNS = [
    'FALCON', 'TIGER', 'PHOENIX', 'DRAGON', 'WOLF', 'EAGLE', 'LION', 'PANTHER', 'COYOTE', 'RAVEN',
    'STORM', 'RIVER', 'MOUNTAIN', 'VALLEY', 'FOREST', 'DESERT', 'OCEAN', 'GLACIER', 'CANYON', 'ISLAND'
];

export function generateRoomCode(): string {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    return `${adj}-${noun}`;
}
