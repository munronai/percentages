# User Story: Start Solo Game - Persistence

## Story Title
Session Persistence & Auto-Resume

## Story Statement
**As a** player  
**I want** my game progress to be saved locally  
**So that** I can resume my session if I accidentally refresh the page or navigate away.

## Context & Background
Puzzle games can require intense focus. Losing progress due to an accidental refresh or a browser crash is a major source of user frustration. This story ensures that the game session is robust and user-friendly by maintaining state across browser refreshes.

### User Pain Point
"I was halfway through a great run and accidentally swiped back or refreshed my browser. Now my score is gone and I have to start over. It's so annoying!"

### Business Value
State persistence significantly improves the perceived quality and reliability of the application. It increases user retention by preventing "rage quits" caused by technical mishaps.

### Supporting Data
- **PRD**: Implicit in "Game Session Management" and the desire for a "polished application."

## Acceptance Criteria
- [ ] Given a solo session has started, when the first question is received, then the session ID and current question state are saved to `localStorage`.
- [ ] Given I am loading the application, when the app initializes, then the system checks for a valid, non-expired session in `localStorage`.
- [ ] Given an active session is found, when the app is ready, then the user is automatically navigated to the Question view for their current question, bypassing the Home Screen.
- [ ] Given I have finished a game, when I reach the Results screen, then the session data is removed from `localStorage`.
- [ ] Given I am in a game, when I explicitly click a "Quit Game" button, then the session is cleared from storage and I am returned to the Home Screen.

## User Flow
1. User starts a game (US-G3.2).
2. User refreshes the browser.
3. The app loads and sees the session in `localStorage`.
4. The app restores the game state and displays the current question.
5. User completes the game.
6. The app clears `localStorage`.

## Design Notes
- The resume process should be seamless and transparent to the user.
- If resuming, the timer should ideally pick up where it left off (if possible within MVP constraints).

## Technical Considerations
- Dependencies: Requires the session data structure from US-G3.2.
- Security considerations: Do not store sensitive data in `localStorage`. Only transient session state.

## Out of Scope
- Server-side session persistence (for now, local only).
- Resuming sessions across different devices.

## Success Metrics
- **Primary metric**: Percentage of users who successfully resume a session after a refresh.
- **Secondary metrics**: Reduction in "abandoned" sessions.

## Priority & Estimation

### Priority
- [ ] P1 - High

### Story Points
[To be estimated by team]

### Sprint/Release Target
MVP / Release 1

## Dependencies & Blockers
- Depends on: US-G3.2 (Session Initialization).
- Blocked by: None.

## Questions & Assumptions
- [ ] Assumption: A simple `localStorage` approach is sufficient for the web-based MVP.
- [ ] Question: How do we handle timer expiration while the page is closed? (For MVP, we may just reset the current question timer).

## Related Work
- Related stories: US-G3.1, US-G3.2.
- Related epics: Game Session Management (MVP).
- Documentation: [Link to PRD section on Technical Considerations]

---

**Created**: Thursday, 19 February 2026  
**Last Updated**: Thursday, 19 February 2026  
**Author**: Gemini  
**Stakeholders**: PM, Engineering Lead
