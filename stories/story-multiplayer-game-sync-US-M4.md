# User Story: Decentralized Game Sync

## Story Title
Game state and timer are synchronized across all peers.

## Story Statement
**As a** player  
**I want** to see the same question, timer, and results as all other participants  
**So that** the game is fair and competitive.

## Acceptance Criteria
- [ ] Given a game is starting, when the host initiates the session, then all connected players see the same question simultaneously.
- [ ] Given a timer is running, when the host broadcasts a "TIMER_SYNC" message, then all players' local timers stay within a 1-second margin of error.
- [ ] Given multiple players answer the final 1% question correctly, when the game ends, then all of them are shown as Winners on the results screen.
- [ ] Given any player answers a question, when the local validation occurs, then a result message is sent to the game channel for all participants to receive.

## Technical Notes
- Timer sync should use a reference timestamp from the host, with each client calculating its local offset.
- Final winner broadcast should be a signed or at least a room-unique message to prevent spoofed winning claims.
- The 1% question scenario requires the results display to support an array of winners.
