# User Story: Player Logout

## Story Title
Player can log out and clear all local data.

## Story Statement
**As a** player  
**I want** to be able to log out of the application  
**So that** my name and game session data are removed from the device.

## Context & Background
Privacy and data control are important for users. Currently, the application persists the player's name and game state in `localStorage` indefinitely. A logout feature allows users to "leave" the game completely, clearing their identity and any active or ended game sessions. This is also useful if multiple people use the same device.

### User Pain Point
"I want to change my name or let my friend play on my phone, but the app always remembers me and my old scores. There's no way to start fresh with a different name."

### Business Value
Providing a clear way to reset state improves user trust and usability in shared-device scenarios. It also simplifies the "reset" flow for users who want to start their experience over from the beginning.

### Supporting Data
- **General UX Principles**: "Control and freedom" (Heuristic #3) - users should be able to exit or reset states easily.

## Acceptance Criteria
- [ ] Given I am on the Home screen, when I click the "Logout" button, then I am prompted to confirm my action (optional but recommended for MVP, or just immediate for speed).
- [ ] Given I have initiated a logout, when the process completes, then the `playerName` and `game_session` keys are removed from `localStorage`.
- [ ] Given the logout is successful, when the screen transitions, then I am navigated back to the Initial Signup screen (`/`).
- [ ] Given I have logged out and am back on the Signup screen, when I enter a new name, then I should be treated as a fresh user with no previous session data.

## User Flow
1. Player is on the Home screen.
2. Player taps a "Logout" or "Sign Out" button (e.g., in the top right corner).
3. System clears all application data from `localStorage`.
4. System redirects the user to the root path (`/`).
5. User sees the Signup form again.

## Design Notes
- The Logout button should be clearly visible but not as prominent as the "Start Game" button.
- A simple text link or a secondary-style button in the header area is appropriate.

## Technical Considerations
- **Dependencies**: Relies on the `session.ts` utility for clearing game state.
- **APIs/Integrations**: None (Client-side only for MVP).
- **Persistence**: Must explicitly call `localStorage.removeItem('playerName')` and `clearSession()`.

## Out of Scope
- Account deletion from a remote server (no server-side accounts yet).
- Clearing browser cache or cookies (only `localStorage` is targeted).

## Success Metrics
- **Primary metric**: Task completion rate for users attempting to reset their identity.
- **Secondary metrics**: Decrease in support requests related to "changing my name."

## Priority & Estimation

### Priority
- [ ] P2 - Medium

### Story Points
[To be estimated by team]

### Sprint/Release Target
MVP / Release 1

## Dependencies & Blockers
- **Depends on**: US-G1 (Player Sign-up).
- **Blocked by**: None.

## Related Work
- Related stories: US-G1 (Sign-up), US-G3.3 (Persistence).
- Related epics: Game Session Management (MVP).

---

**Created**: 2026-03-18  
**Last Updated**: 2026-03-18  
**Author**: Gemini  
**Stakeholders**: PM, Engineering Lead
