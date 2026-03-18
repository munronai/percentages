# User Story: Host Migration Logic

## Story Title
Game session continues seamlessly if the host disconnects.

## Story Statement
**As a** player  
**I want** the game to automatically elect a new host if the current host leaves  
**So that** my current game session is not interrupted or lost.

## Acceptance Criteria
- [ ] Given a game is in progress between questions, when the host disconnects, then a "Host Disconnected - Migrating..." message is displayed.
- [ ] Given a host migration is triggered, when the first peer responds to the "HOST_TIMEOUT" event, then that peer becomes the new authoritative host.
- [ ] Given a question is in progress, when the host disconnects, then the game will wait for the question to complete locally before initiating the migration.
- [ ] Given a new host has been elected, when migration finishes, then the new host resumes the timer and broadcasts the next question.

## Technical Notes
- Implement a heartbeat monitor; if a Host heartbeat is missed for 5 seconds, peers broadcast a "MIGRATION_REQUIRED" event.
- Migration Strategy: The client that receives the "Question Completed" signal first (or simply the first to claim the role on the channel) will take over the server duties.
- All clients must maintain a full copy of the `GameSession` state to ensure any of them can resume hosting immediately.
