# User Story: See Final Score

## Story Title
Player sees their final score at the end of the game.

## Story Statement
**As a** player  
**I want** to see my final score when the game ends  
**So that** I know how well I performed.

## Context & Background
This story describes the conclusion of the game loop. The Results screen provides the player with a quantitative summary of their performance. This score becomes a benchmark for the player, encouraging them to play again to beat their own high score. This is a powerful driver for replayability.

### User Pain Point
"The game just ended and dumped me back to the main menu. I have no idea what my score was. What was the point?"

### Business Value
The results screen provides a sense of closure and accomplishment. It's a key part of making the game feel complete and rewarding. By giving players a score to beat, we create an intrinsic motivation to play again, which directly impacts user retention and engagement metrics.

### Supporting Data
- **PRD**: "Feature 6: Scoring & Results" is a "Must Have" and requires a results display.
- **Epic**: The "Scoring & Results (MVP)" epic lists "Display a results screen showing the final score" as a high-level requirement.

## Acceptance Criteria
- [ ] Given my solo game session has just ended (either by elimination or completion), when the game transitions, then I am navigated to the Results screen.
- [ ] Given I am on the Results screen, when the screen loads, then my final score is displayed as the most prominent element on the screen.
- [ ] Given the backend calculates the score based on question difficulty (1 point >= 50%, 2 points < 50%), when the score is displayed, then it correctly reflects the sum of points from all my correctly answered questions.
- [ ] Given I am on the Results screen, when the screen loads, then a "Play Again" button and a "Review Game" button are clearly visible.

## User Flow
1. A player's game ends.
2. The application automatically navigates to the Results screen.
3. The screen displays a large score (e.g., "Final Score: 12").
4. Below the score, the user sees two options: "Play Again" and "Review Game".
5. The user can choose their next action.

## Design Notes
- The score should be the hero element of this screen—large, bold, and centered.
- The "Play Again" button should be a primary call-to-action to encourage re-engagement.
- The "Review Game" button should be a secondary action.
- Figma/Design link: [URL for Results screen]

## Technical Considerations
- **Dependencies**: The Game Management Service (GMS) must calculate the final score and pass it to the front-end when the game ends.
- **APIs/Integrations**: The payload from the GMS that ends the game should include the final score (e.g., `{ "gameState": "ended", "finalScore": 12, "sessionHistory": [...] }`).
- **State Management**: The score and session history must be passed from the game screen to the results screen.

## Out of Scope
- High score lists or leaderboards.
- Any detailed stats beyond the single score (e.g., time taken, best category).
- Sharing the score on social media.

## Success Metrics
- **Primary metric**: Click-through rate on the "Play Again" button. A high rate indicates players are motivated to re-engage. Target: >50%.
- **Secondary metrics**: Number of games played per user per day.

## Priority & Estimation

### Priority
- [X] P0 - Critical

### Story Points
[To be estimated by team]

### Sprint/Release Target
MVP / Release 1

## Dependencies & Blockers
- **Depends on**: US-GF5 (Player Elimination), as this is the trigger for showing the results.
- **Blocked by**: The scoring logic must be implemented in the Game Management Service.

## Questions & Assumptions
- [ ] Assumption: The scoring logic from the PRD (1 point for >=50%, 2 points for <50%) is final for the MVP.
- [ ] Question: What happens if a user wins the game (answers the 1% question)? Is there a special "You Won!" message on the results screen? (For MVP, we can treat it the same as any other end-of-game score screen).

## Related Work
- **Related stories**: US-GF7 (Review Game) is accessed from this screen. US-G3 (Start Solo Game) is the destination for the "Play Again" button.
- **Related epics**: Scoring & Results (MVP)
- **Documentation**: [Link to PRD section on Scoring]

---

**Created**: 2026-02-18  
**Last Updated**: 2026-02-18  
**Author**: Gemini  
**Stakeholders**: PM, Engineering Lead, Design Lead
