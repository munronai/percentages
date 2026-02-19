# User Story: Display Answer Feedback

## Story Title
Player sees feedback on their answer.

## Story Statement
**As a** player  
**I want** to see immediate feedback on whether my answer was correct or incorrect  
**So that** I know the result of my attempt and can learn from it.

## Context & Background
This story closes the loop on the primary game interaction. After a player submits an answer, they are in a state of suspense. Providing immediate, clear feedback is critical for maintaining engagement and making the game feel responsive and fair. It's also a learning opportunity for the player if they were incorrect.

### User Pain Point
"I submitted my answer, but then nothing happened for a few seconds. I wasn't sure if it went through. Then it just moved to the next question without telling me if I was right or wrong. I feel disconnected from the game."

### Business Value
A tight feedback loop is a core principle of good game design. It makes the experience more satisfying and addictive. By showing the player the outcome of their action right away, we increase their investment in the game and their desire to continue playing.

### Supporting Data
- **PRD**: "Feature 2: Question & Answer UI" user flow specifies displaying success or failure to the user.
- **Game Design Principles**: Immediate feedback is a well-established tenet of creating engaging interactive experiences.

## Acceptance Criteria
- [ ] Given I have submitted a correct answer, when the backend validation is complete, then the UI displays a clear "Correct" message or visual indicator.
- [ ] Given I have submitted an incorrect answer, when the backend validation is complete, then the UI displays a clear "Incorrect" message and also shows the correct answer for comparison.
- [ ] Given I failed to submit an answer before the timer reached 0, when the "Time's Up" event occurs, then the UI displays a "Time's Up" message and shows the correct answer.
- [ ] Given any feedback is displayed (Correct, Incorrect, Time's Up), when 3 seconds have passed, then the game automatically transitions to the next question or the final results screen.

## User Flow
1. The player has just tapped the "Submit" button.
2. The UI enters a brief "validating" state (e.g., a spinner).
3. The front-end receives a response from the Game Management Service (e.g., `{ "result": "correct" }` or `{ "result": "incorrect", "correctAnswer": "The actual answer" }`).
4. The UI updates to show a large, clear "Correct" or "Incorrect" overlay.
5. If incorrect, the correct answer is displayed on the screen as well.
6. After a fixed delay (e.g., 3 seconds), the UI automatically navigates to the next state (next question or end-of-game screen).

## Design Notes
- The feedback should be a very clear, screen-level overlay. Use color (green for correct, red for incorrect) and large text.
- The presentation of the correct answer should be clear but visually distinct from the player's incorrect answer.
- The 3-second pause is important to give the player time to register the result before moving on.
- Figma/Design link: [URL for Correct/Incorrect feedback overlays]

## Technical Considerations
- **Dependencies**: The Game Management Service must provide a response that includes the validation result and the correct answer.
- **APIs/Integrations**: The front-end will handle the response from the answer submission API.
- **Performance requirements**: The feedback should appear instantly after the backend responds.

## Out of Scope
- Complex animations for the feedback (a simple fade in/out is sufficient for MVP).
- Any scoring-related display on this screen (scoring is shown on the final results screen).

## Success Metrics
- **Primary metric**: High user satisfaction with the game's responsiveness in surveys.
- **Secondary metrics**: Time spent on the feedback screen (should be consistent, as it's a fixed delay).

## Priority & Estimation

### Priority
- [X] P0 - Critical

### Story Points
[To be estimated by team]

### Sprint/Release Target
MVP / Release 1

## Dependencies & Blockers
- **Depends on**: US-GF3 (Submit Answer).
- **Blocked by**: The backend answer validation logic must be complete.

## Questions & Assumptions
- [ ] Assumption: A 3-second delay is the right amount of time to show feedback before moving on. This may need user testing.
- [ ] Question: Should there be a button to continue immediately, or is the automatic transition preferred? (For MVP, automatic is simpler).

## Related Work
- **Related stories**: US-GF5 (Elimination), Story for showing final results.
- **Related epics**: Question & Answer UI (MVP)
- **Documentation**: [Link to PRD section on User Flow]

---

**Created**: 2026-02-18  
**Last Updated**: 2026-02-18  
**Author**: Gemini  
**Stakeholders**: PM, Engineering Lead, Design Lead
