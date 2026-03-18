# User Story: Multiplayer Lobby & Chat

## Story Title
Players can interact and see participants in a game lobby.

## Story Statement
**As a** participant  
**I want** to see a list of players and use a chat function in the lobby  
**So that** I can communicate and track who has joined before the game starts.

## Acceptance Criteria
- [ ] Given I am in a game room, when I look at the sidebar, then I see a live list of all connected players' names.
- [ ] Given I am the host, when I configure the lobby, then I can set a player limit (e.g., max 50 players) that is lower than the default 100.
- [ ] Given I am any player, when I send a message in the lobby chat, then all other players in the room see the message in real-time.
- [ ] Given a game has started, when a late joiner attempts to enter, then they are restricted to "Spectator" mode and cannot submit answers.

## Technical Notes
- Player counts must be synchronized; every join/leave message should update the local `playerCount` for all peers.
- Chat messages should be broadcasted using the room-specific messaging sub-channel.
- The "Spectator" flag should be part of the `Player` state for anyone joining after the `GAME_STARTED` event.
