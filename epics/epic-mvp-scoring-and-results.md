# Epic: Scoring & Results (MVP)

**Epic ID**: [ID if tracked]  
**Owner**: [Product Manager]  
**Status**: [Backlog | Planned | In Progress | Done]  
**Created**: 2026-02-18  
**Target Quarter**: Q1 2026

---

## Epic Summary
This epic covers the functionality for calculating a solo player's score and displaying a final results screen at the conclusion of their game. It also includes the ability for the player to review the questions and answers from their session.

---

## Problem & Opportunity

### User Problem
Players need feedback on their performance. A simple "you win" or "you lose" is not enough. A scoring system provides a measure of success, and a results screen offers closure and an opportunity to learn from mistakes.

### Business Opportunity
A good scoring and results loop encourages replayability. Players will be motivated to beat their previous high scores, which increases engagement and retention, key success metrics for the MVP.

### Evidence
- **PRD**: Feature 6, "Scoring & Results," is a "Must Have." The ability to review the game is explicitly mentioned in the user stories.
- **User Persona**: "Alex, the Puzzle Enthusiast," is driven by challenge. A score provides a tangible measure of that challenge.

---

## Goals & Success Metrics

### Primary Goal
To provide a solo player with a clear, accurate score at the end of their game and allow them to review their performance.

### Success Metrics
| Metric | Baseline | Target | Timeline |
|--------|----------|--------|----------|
| User navigates to review screen | 0% | 30% of completed games | 3 months post-launch |
| Scoring accuracy | N/A | 100% | 3 months post-launch |

---

## Target Users

**Primary**: Alex, the Puzzle Enthusiast  
**Affected Users**: All MVP users.  
**User Segments**: Any user who completes a solo game session.

---

## Scope

### High-Level Requirements
1. Calculate a player's score based on the difficulty of correctly answered questions.
2. Display a results screen showing the final score upon game conclusion.
3. Provide an option to navigate to a "Game Review" screen.
4. The Game Review screen should list all questions from the session and the player's answers.

### In Scope
- Scoring logic for a single player.
- A final results UI view.
- A post-game review UI view.

### Out of Scope
- Leaderboards.
- Displaying scores or results for other players.
- Determining a "winner" (as there's only one player).

---

## User Stories
<!-- List of user stories that make up this epic -->

- [ ] As a player, after a game has ended, I want to review all the questions and answers to see what I got right and wrong. - US-GF7 - [Planned]
- [ ] As a player, I want to see my final score so I know how well I performed. - (Implied by Feature 6) - [Planned]


**Total Story Points**: [X] (estimated)

---

## Dependencies

### Blockers
- None

### Required By
- This epic provides the final screen for the MVP's core game loop.

### Depends On
- **Epic: Player Elimination (MVP)**: Elimination is one of the triggers for the game to end and for this epic's functionality to begin.
- **Epic: Question & Answer UI (MVP)**: The results screen is a new UI view in the front-end application.

---

## Technical Considerations

### Architecture Impact
- The Game Management Service (GMS) needs to track the score throughout the session.
- The front-end application will have new views for the Results and Game Review screens.
- The GMS will need to provide an endpoint that the front-end can call to get the data for the game review.

### Key Technical Decisions
1. How and where to store the results of a game session for the review feature.
2. The UI design for the results and review screens to be clear and engaging.

### Performance Requirements
- The results screen should load instantly after the game ends.

### Security & Compliance
- [Relevant considerations]

---

## Design

**Design Status**: [Not Started | In Progress | Complete]

**Design Links**:
- Figma: [URL for Results & Review screens]

**Key Design Decisions**:
- Visual representation of the score.
- Layout of the question and answer review list.

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation | Owner |
|------|--------|-------------|------------|-------|
| Users don't understand the scoring system | L | M | Keep the scoring logic simple and explain it clearly in the UI if needed. | [Design Lead] |
| Game review data is lost | M | L | Ensure game session data is reliably passed to the results view before being discarded. | [Eng Lead] |

---

## Phases

### Phase 1: MVP
**Timeline**: End of Q1  
**Goal**: This entire epic is a core part of the MVP.

**Stories**:
- US-GF7
- Implied story for viewing final score.

---

## Launch Plan

### Go-to-Market Strategy
- This feature is part of the initial MVP launch.

---

## Timeline

| Milestone | Target Date | Status | Notes |
|-----------|-------------|--------|-------|
| Kickoff | [Date] | [ ] | |
| Design Complete | [Date] | [ ] | |
| Dev Complete | [Date] | [ ] | |
| QA Complete | [Date] | [ ] | |
| GA Launch | [Date] | [ ] | Part of MVP Launch |

---

## Resources

### Team
- **PM**: NM
- **Engineering Lead**: [Name]
- **Design Lead**: [Name]
- **QA Lead**: [Name]
- **Engineers**: [Names]

### Links
- **PRD**: @percentages-product/prds/percentages-prd-2.md

---

## Open Questions
- [ ] How long should game review data be available for? Is it only for the moments after the game, or can a user see a history? (For MVP, assume immediate review only).

---

## Progress Updates
[Initial state]
---

## Related Work
- Related Epics: Epic: Player Elimination (MVP)
- Related Features: Scoring & Results
- Research: [Links]
