# User Story: Start Solo Game

## Story Title
Player can start a solo game session.

## Story Statement
**As a** single player  
**I want** to be able to start a game session by myself  
**So that** I can practice or test my skills without needing other players.

## Context & Background
This is a foundational story for the Minimum Viable Product (MVP). It enables the core single-player game loop, which is the primary goal of the initial launch.

### User Pain Point
"I want to play a fun puzzle game, but I don't want to wait for other people or deal with setting up a multiplayer lobby. I just want to jump in and challenge myself."

### Business Value
By focusing on a simple, instant-start solo mode, we can quickly validate the core appeal of our game's concept and question style. This provides the fastest path to user feedback and de-risks further investment in more complex features like multiplayer.

### Supporting Data
- **User Persona**: Aligns directly with "Alex, the Puzzle Enthusiast," who is motivated by intrinsic challenge.
- **PRD Goal**: Supports the MVP goal to "validate the core single-player game loop."

## Acceptance Criteria
- [ ] Given I am on the application's home screen, when I select the "Start Solo Game" option, then a new game session is created and the game's UI loads with the first question.
- [ ] Given a new solo game has started, when the first question is displayed, then the 60-second game timer immediately begins to count down.
- [ ] Given I have started a solo game, when I navigate away from the app and return, then I am returned to my active game session (TBD: session persistence rules).

## User Flow
1. User opens the application and lands on the home screen.
2. User clicks a prominent "Play Solo" or "Start Game" button.
3. The system initiates a new session with the Game Management Service.
4. The user is immediately taken to the Question & Answer screen, where the first question and the countdown timer are displayed.

## Design Notes
- The "Start Solo Game" button should be the primary call-to-action on the main screen for the MVP.
- The transition from the home screen to the game screen should be fast to give a feeling of immediacy.
- Figma/Design link: [URL for Home Screen and Game Screen]

## Technical Considerations
- **Dependencies**: Requires the user to be signed in or have a temporary guest identity (see US-G1).
- **APIs/Integrations**: The client will make a request to the Game Management Service (GMS) to create a new solo session.
- **Performance requirements**: The time between clicking "Start" and seeing the first question should be minimal (<2 seconds).

## Out of Scope
- Any form of multiplayer or group session creation.
- Options to configure the game (e.g., difficulty, question categories).
- Joining an already existing game.

## Success Metrics
- **Primary metric**: Number of successful solo game starts per day. Target: 100/day in first month.
- **Secondary metrics**: Funnel conversion rate from home screen to game start.

## Priority & Estimation

### Priority
- [X] P0 - Critical

### Story Points
[To be estimated by team]

### Sprint/Release Target
MVP / Release 1

## Dependencies & Blockers
- **Depends on**: US-G1 (User Sign-up/Identity) must be implemented to associate the session with a player.
- **Blocked by**: None.

## Questions & Assumptions
- [ ] Assumption: Users will understand that "Solo Game" is the primary mode for the MVP.
- [ ] Question: What is the desired behavior if a user has an unfinished game and tries to start a new one? For MVP, we can assume we overwrite the old one.

## Related Work
- **Related stories**: US-G1 (Sign up)
- **Related epics**: Game Session Management (MVP)
- **Documentation**: [Link to PRD section on Solo Mode]

---

**Created**: 2026-02-18  
**Last Updated**: 2026-02-18  
**Author**: Gemini  
**Stakeholders**: PM, Engineering Lead
