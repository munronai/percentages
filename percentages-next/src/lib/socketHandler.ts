import { logActivity } from './logger';

export async function handleSocketEvent(event: string, data: any, socketId: string): Promise<void> {
    const metadata = {
        ...data,
        sender: socketId,
        timestamp: new Date().toISOString()
    };

    await logActivity(`WebSocket Message: ${event}`, metadata);
}
