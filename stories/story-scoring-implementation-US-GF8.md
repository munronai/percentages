# User Story: Scoring and Results Implementation

## Story Title
Implement score calculation, progression, and enhanced results.

## Story Statement
**As a** player  
**I want** the system to calculate my score based on question difficulty and show my final results with the option to play again  
**So that** I can track my progress and easily start a new challenge.

## Context & Background
While the basic game loop (fetching a question, submitting an answer, and receiving feedback) is in place, the "game" lacks a sense of progression and a final accounting of performance. This story bridges the gap between the immediate feedback (US-GF6) and the final results (US-GF8), implementing the scoring rules and the "Play Again" loop.

### User Pain Point
"I got the question right, but nothing happened next. I also don't know how many points I've earned or how to start a new game without refreshing the whole page."

### Business Value
A complete scoring loop and an easy way to restart the game are essential for replayability and user satisfaction. It transforms a single-question demo into a functional game experience.

### Supporting Data
- **PRD**: "Feature 6: Scoring & Results" is a "Must Have."
- **Status Report (18 Mar 2026)**: Identifies scoring logic and results enhancement as the top priority for completing the Phase 1 MVP.

## Acceptance Criteria
- [ ] Given a correct answer is validated by the system, when the score is updated, then 1 point is awarded for questions with difficulty ≥ 50% and 2 points for questions < 50%.
- [ ] Given I have correctly answered a question, when the 3-second feedback period (US-GF6) ends, then the system fetches and displays the next question at a higher difficulty level (e.g., moving from 90% to 80%).
- [ ] Given the game has ended (due to elimination or reaching the final question), when I am on the results screen, then the total accumulated score for the session is displayed prominently.
- [ ] Given I am on the results screen, when I click the "Play Again" button, then the current session is cleared and I am navigated to the start of a new solo game.
- [ ] Given I am on the results screen, when I click the "Review Game" button, then I am navigated to the review screen (US-GF7).

## User Flow
1. Player correctly answers a 90% difficulty question.
2. System calculates 1 point and updates the session score.
3. After 3 seconds of "Correct!" feedback, the UI loads an 80% difficulty question.
4. Player eventually fails a question.
5. System redirects to the Results screen.
6. Results screen displays: "Eliminated!", "Final Score: X", and buttons for "Play Again" and "Review Game".
7. Player clicks "Play Again" and is returned to the 90% question.

## Design Notes
- The score on the results screen should use the same high-contrast, bold styling as the "Correct!" feedback.
- The "Play Again" button should be the primary action (CTA) on the results screen.
- Figma/Design link: [URL for Results screen]

## Technical Considerations
- **Dependencies**: Requires US-GF6 (Feedback) and US-GF5 (Elimination) to be functional.
- **State Management**: The `GameSession` interface in `src/lib/session.ts` must be updated to include a `score` field.
- **APIs/Integrations**: 
    - `POST /api/game/answer` should return the points earned for the current question or the frontend must calculate it based on the `difficulty` returned by the question object.
    - `GET /api/questions` must be called with the next difficulty tier (e.g., `percentage=80`) after a correct answer.
- **Persistence**: The updated score must be saved to `localStorage` via `saveSession` to survive refreshes.

## Out of Scope
- Global leaderboards.
- Complex level-up animations (beyond simple question transitions).

## Success Metrics
- **Primary metric**: 100% accuracy in score calculation according to the rules.
- **Secondary metrics**: High usage of the "Play Again" button (Target >50% of sessions).

## Priority & Estimation

### Priority
- [X] P0 - Critical

### Story Points
[To be estimated by team]

### Sprint/Release Target
MVP / Release 1

## Dependencies & Blockers
- **Depends on**: US-GF6 (Answer Feedback), US-GF5 (Elimination).
- **Blocked by**: Backend support for multiple difficulty levels in `/api/questions`.

## Questions & Assumptions
- [ ] Assumption: The solo game follows a linear progression of difficulty (90% -> 80% -> 70% ...).
- [ ] Question: Should the "Play Again" button instantly start the game or take the user back to the lobby? (For MVP, starting immediately is faster).

## Related Work
- Related stories: US-GF7 (Review Game), US-GF5 (Elimination), US-GF6 (Feedback).
- Related epics: Scoring & Results (MVP).

---

**Created**: 2026-03-18  
**Last Updated**: 2026-03-18  
**Author**: Gemini  
**Stakeholders**: PM, Engineering Lead
