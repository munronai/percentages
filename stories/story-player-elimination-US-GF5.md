# User Story: Player Elimination

## Story Title
Player is eliminated upon failure.

## Story Statement
**As a** player  
**I want** the system to identify if my answer was incorrect and eliminate me from the current game session  
**So that** there are clear stakes and consequences for my performance.

## Context & Background
Elimination is the core mechanic that creates challenge and tension. In the context of the solo MVP, "elimination" means the end of the current game run. This story defines the event that transitions the game from an "active" state to an "ended" state upon player failure.

### User Pain Point
"If I can just keep guessing on every question with no penalty, it doesn't feel like a real game. There's no challenge and no reason to try again to do better."

### Business Value
Implementing a clear failure and end-state is fundamental to creating an engaging game loop. It establishes the "rules" of the world and provides the motivation for players to improve and replay, which is a key driver of retention.

### Supporting Data
- **PRD**: "Feature 5: Elimination" is a "Must Have" and is the core competitive mechanic of the game concept.
- **Epic**: The Player Elimination (MVP) epic states the primary goal is to "successfully end a solo player's game session when they fail."

## Acceptance Criteria
- [ ] Given I have submitted an answer that the Game Management Service validates as incorrect, when the answer feedback is displayed, then the game session state is updated to "ended".
- [ ] Given I have not submitted an answer and the 60-second timer expires, when the "Time's Up" feedback is displayed, then the game session state is updated to "ended".
- [ ] Given the game session state has ended due to elimination, when the 3-second feedback display is complete, then the application navigates me to the Results screen.

## User Flow
1. A player is in an active game.
2. The player either submits an incorrect answer or runs out of time.
3. The UI displays the relevant feedback (e.g., "Incorrect!"). This is handled by story US-GF6.
4. In the background, the Game Management Service marks the current session as "complete" or "ended" due to elimination.
5. After the feedback timer elapses, the UI, knowing the game session is over, transitions the player to the final "Results" screen.

## Design Notes
- The transition from the "Incorrect" feedback screen to the "Results" screen should feel like a natural conclusion, not an abrupt error.
- Figma/Design link: [URL for Results screen]

## Technical Considerations
- **Dependencies**: This story's logic is the trigger for the "Scoring & Results" epic. The Game Management Service (GMS) is the source of truth for the game state.
- **APIs/Integrations**: The client UI will learn that the game is over from the response to the answer submission, or via a state update from the GMS. For instance, the response to a wrong answer could be `{ "result": "incorrect", "correctAnswer": "...", "gameState": "ended" }`.
- **State Management**: The front-end application needs to manage a `gameState` variable (e.g., 'playing', 'ended') to know when to transition to the results screen.

## Out of Scope
- Spectator mode.
- Any UI elements related to other players being eliminated.
- The content of the Results screen itself (this is covered in the Scoring & Results epic).

## Success Metrics
- **Primary metric**: A clear and understandable game flow, measured by user feedback and reviews.
- **Secondary metrics**: Tracking the number of games ended by elimination vs. games completed successfully.

## Priority & Estimation

### Priority
- [X] P0 - Critical

### Story Points
[To be estimated by team]

### Sprint/Release Target
MVP / Release 1

## Dependencies & Blockers
- **Depends on**: US-GF6 (See answer feedback). The elimination flow happens immediately after feedback is given.
- **Blocked by**: Backend logic for answer validation must be complete.

## Questions & Assumptions
- [ ] Assumption: For the MVP, any single incorrect answer results in immediate elimination. There are no "lives".
- [ ] Question: Does the "eliminated" state need to be persisted in the database, or is it a transient session state? For MVP, session state is likely sufficient.

## Related Work
- **Related stories**: Story for seeing the final score.
- **Related epics**: Player Elimination (MVP), Scoring & Results (MVP).
- **Documentation**: [Link to PRD section on Elimination]

---

**Created**: 2026-02-18  
**Last Updated**: 2026-02-18  
**Author**: Gemini  
**Stakeholders**: PM, Engineering Lead
