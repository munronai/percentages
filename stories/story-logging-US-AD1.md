# User Story: Server-Side Activity Logging

## Story Title
Log player logins and WebSocket communication.

## Story Statement
**As an** administrator/developer  
**I want** the system to record player logins and WebSocket communication in a log file  
**So that** I can monitor application usage, debug messaging issues, and analyze game activity.

## Context & Background
As we move into multiplayer, understanding the flow of messages between peers is critical for debugging synchronization issues and host migration failures. Additionally, tracking when users "log in" (set their display name) provides basic usage metrics. Even in a decentralized game, the central WebSocket relay acts as the perfect vantage point for logging this activity.

### User Pain Point
"When a multiplayer game fails to start or a host migration glitches, I have no way to see what messages were actually sent or who was involved in the session."

### Business Value
Operational visibility is essential for maintaining a stable multiplayer experience. Logging provides the audit trail needed to improve the "North Star" metric of game completion rates.

## Acceptance Criteria
- [ ] Given a user submits their name on the Signup screen, when the client notifies the server, then a log entry is created containing the `playerName`, `timestamp`, and `IP/session ID`.
- [ ] Given the WebSocket relay is active, when any message (e.g., `GAME_ANNOUNCEMENT`, `JOIN_ROOM`, `HEARTBEAT`, `CHAT`) is received for broadcast, then a log entry is written containing the `messageType`, `roomCode`, `sender`, and `timestamp`.
- [ ] Given logs are being generated, when an event is recorded, then it is appended to a persistent file (e.g., `logs/activity.log`) on the server.
- [ ] Given the log file exists, when multiple events occur, then they are recorded in chronological order.

## User Flow
1. User enters name and clicks "Continue".
2. Frontend sends a one-time "ping" to a logging endpoint or via WebSocket.
3. Server writes login event to `activity.log`.
4. User starts/joins a multiplayer game.
5. Every message the user sends to the relay is intercepted by the server-side logger.
6. Server writes message metadata to `activity.log`.

## Technical Considerations
- **Environment**: Next.js API routes or a custom server wrapper will need to handle the file system (fs) writes.
- **Performance**: Use asynchronous file appending (`fs.promises.appendFile`) or a lightweight logging library (like `pino` or `winston`) to avoid blocking the main thread.
- **Log Rotation**: (Out of scope for MVP) We should eventually consider rotating logs to prevent the file from growing indefinitely.

## Out of Scope
- Logging solo game answers (these are already validated via API, but full question/answer logging is not required here).
- Real-time log streaming to a UI dashboard.

## Priority & Estimation
- **Priority**: P2 - Medium
- **Effort**: Low (Simple file append)

---

**Created**: 2026-03-18  
**Author**: Gemini  
