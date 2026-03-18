# User Story: Decentralized Room Discovery & Creation

## Story Title
Players can create and discover peer-hosted game rooms.

## Story Statement
**As a** player  
**I want** to create or find a game room using a human-readable code  
**So that** I can easily play with friends or join public sessions without a central server.

## Acceptance Criteria
- [ ] Given I am on the main menu, when I click "Host Game," then a unique, human-readable Room Code (e.g., "SILVER-FALCON") is generated.
- [ ] Given I am the host, when I create a room, then I can set the game to "Public" or "Private."
- [ ] Given I am a joiner, when I open the Multiplayer menu, then I see a list of all "Public" games currently broadcasting on the global channel.
- [ ] Given I have a Room Code, when I enter it manually, then I am connected directly to that peer-hosted session regardless of its public/private status.

## Technical Notes
- Room Codes should be generated from two word lists to ensure they are easy to share verbally.
- The app must broadcast a "HEARTBEAT" or "GAME_ANNOUNCEMENT" message on the global WebSocket channel to be discoverable.
- Private games will not include the "GAME_ANNOUNCEMENT" broadcast in the public discovery list.
