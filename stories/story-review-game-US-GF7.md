# User Story: Review Game

## Story Title
Player can review questions and answers after a game.

## Story Statement
**As a** player  
**I want** to review all the questions and answers after a game has ended  
**So that** I can see what I got right and wrong and learn from my mistakes.

## Context & Background
The "aha!" moment of seeing the correct answer to a tricky puzzle is a key part of the user experience. This feature provides that closure and learning opportunity. It allows players to satisfy their curiosity about the questions they failed and reinforces their knowledge on the ones they passed, increasing overall engagement.

### User Pain Point
"I got a question wrong, and I have no idea what the right answer was. I want to know what the trick was, but the game just moved on. Now I'll never know."

### Business Value
Providing a game review feature encourages learning and mastery, which can motivate players to try again. This increases session length and long-term retention, as players feel they are improving their skills rather than just winning or losing.

### Supporting Data
- **PRD**: This feature is explicitly called out as a user story (US-GF7) in the PRD's appendix.
- **Epic**: The "Scoring & Results (MVP)" epic includes "The Game Review screen should list all questions from the session" as a high-level requirement.

## Acceptance Criteria
- [ ] Given I am on the final Results screen, when a "Review Game" button is displayed, then I can tap it to navigate to the Game Review screen.
- [ ] Given I am on the Game Review screen, when the screen loads, then it displays a list of every question from my completed session.
- [ ] Given I am viewing the list of questions, when I look at a single item, then it clearly displays the question text, my submitted answer (or indicates if I ran out of time), the correct answer, and a visual indicator of whether I was right or wrong.
- [ ] Given I have finished reviewing, when I tap the "Done" or "Back" button, then I am returned to the application's home screen.

## User Flow
1. The player's game ends and they are on the Results screen.
2. The player taps the "Review Game" button.
3. The application navigates to a new, scrollable "Game Review" screen.
4. The screen is populated with a list of all questions from the session. For each question, the player's answer and the correct answer are shown.
5. The player scrolls through the list.
6. The player taps a "Done" button at the end of the list or a "Back" button in the header and is returned to the main menu.

## Design Notes
- The list should be easy to scan. Each item should be clearly separated.
- Use iconography (e.g., a green checkmark, a red 'X') to quickly show if an answer was correct or incorrect.
- The player's answer and the correct answer should be clearly labeled to avoid confusion.
- Figma/Design link: [URL for Game Review screen]

## Technical Considerations
- **Dependencies**: The front-end needs a way to receive the full list of questions and answers from the completed session. This data must be passed from the game screen to the results screen.
- **APIs/Integrations**: This is likely a front-end-only feature. The Game Management Service provides the results payload at the end of the game, and the front-end holds onto that data for the review screen. No new API call should be necessary if designed correctly.
- **State Management**: The application state needs to hold the entire session history (questions, answers submitted, correct answers) until the user leaves the review screen.

## Out of Scope
- Any ability to re-answer questions.
- Explanations for *why* an answer is correct.
- Sharing results or specific questions from the review screen.
- Viewing the history of past games (only the most recently completed game can be reviewed).

## Success Metrics
- **Primary metric**: Percentage of users who enter the Game Review screen after completing a game. Target: 30%.
- **Secondary metrics**: Average time spent on the review screen.

## Priority & Estimation

### Priority
- [ ] P1 - High

### Story Points
[To be estimated by team]

### Sprint/Release Target
MVP / Release 1

## Dependencies & Blockers
- **Depends on**: The "See Final Score" story, as the button to access this screen is on the Results screen.
- **Blocked by**: None.

## Questions & Assumptions
- [ ] Assumption: For the MVP, the session history is only held in memory and is discarded once the user returns to the home screen. It is not saved permanently.
- [ ] Question: How should a question be displayed if the user ran out of time and submitted no answer?

## Related Work
- **Related stories**: See Final Score story.
- **Related epics**: Scoring & Results (MVP)
- **Documentation**: [Link to PRD section on Results Display]

---

**Created**: 2026-02-18  
**Last Updated**: 2026-02-18  
**Author**: Gemini  
**Stakeholders**: PM, Engineering Lead, Design Lead
