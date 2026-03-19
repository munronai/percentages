import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'activity.log');

export async function logActivity(message: string, metadata: Record<string, unknown> = {}): Promise<void> {
    try {
        // Ensure logs directory exists
        if (!fs.existsSync(LOG_DIR)) {
            await fs.promises.mkdir(LOG_DIR, { recursive: true });
        }

        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] INFO: ${message} ${JSON.stringify(metadata)}\n`;

        await fs.promises.appendFile(LOG_FILE, logEntry);
    } catch (error) {
        // Silent fail for logging to avoid breaking application flow
        console.error('Failed to write to log file:', error);
    }
}
