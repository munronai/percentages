# Epic: Question & Answer UI (MVP)

**Epic ID**: [ID if tracked]  
**Owner**: [Product Manager]  
**Status**: [Backlog | Planned | In Progress | Done]  
**Created**: 2026-02-18  
**Target Quarter**: Q1 2026

---

## Epic Summary
This epic covers the creation of the core user interface for the gameplay loop. It includes displaying the question and timer, handling user input for the answer, and providing immediate feedback. This is a critical component of the user-facing experience for the MVP.

---

## Problem & Opportunity

### User Problem
Players need a clear, intuitive, and responsive interface to engage with the primary game mechanic: answering logic-based questions under a time constraint. A poor UI can lead to frustration and detract from the core puzzle-solving experience.

### Business Opportunity
A polished and effective UI, even in the MVP, will significantly contribute to positive first impressions and user retention. It allows us to test the appeal of the question style effectively.

### Evidence
- **PRD**: The MVP scope explicitly includes "Timer and answer submission" and a "User interface for signing up," which precedes this game view.
- **User Persona**: "Alex, the Puzzle Enthusiast" desires a challenging experience; a clunky UI would be a major detractor.

---

## Goals & Success Metrics

### Primary Goal
To provide a functional and clear user interface where a player can read a question, see the time remaining, submit an answer, and get feedback on their submission.

### Success Metrics
| Metric | Baseline | Target | Timeline |
|--------|----------|--------|----------|
| User task success rate (answering) | 0% | 95% | 3 months post-launch |
| Reported UI/UX bugs | N/A | < 5 per month | 3 months post-launch |

---

## Target Users

**Primary**: Alex, the Puzzle Enthusiast  
**Affected Users**: All MVP users.  
**User Segments**: Any user playing the solo game mode.

---

## Scope

### High-Level Requirements
1. Display question content (text and optionally an image).
2. Display a visible 60-second countdown timer.
3. Provide a text input field for the user's answer.
4. Show immediate feedback indicating if the submitted answer was correct or incorrect.
5. Disable input when the timer expires.

### In Scope
- All elements required for the solo player question-and-answer flow.

### Out of Scope
- UI elements specific to multiplayer (e.g., seeing other players' status).
- Host control panels.
- Post-game results screens (covered in a separate epic).

---

## User Stories
<!-- List of user stories that make up this epic -->

- [ ] As a contestant, I want to see the question text and any accompanying image clearly displayed on my screen. - US-GF1 - [Planned]
- [ ] As a contestant, I want to see a 60-second countdown timer so I know how much time I have left to answer. - US-GF2 - [Planned]
- [ ] As a contestant, I want to submit my answer within the time limit using a simple input field. - US-GF3 - [Planned]
- [ ] As a player, I want to see immediate feedback on whether my answer was correct or incorrect. - US-GF6 - [Planned]

**Total Story Points**: [X] (estimated)

---

## Dependencies

### Blockers
- None

### Required By
- The entire gameplay experience.

### Depends On
- **Epic: Game Session Management (MVP)**: A session must be started to reach this screen.
- **Epic: Question Service (MVP)**: Needs to receive question data to display.

---

## Technical Considerations

### Architecture Impact
- This will be a primary view/component in the front-end application (React, Next.js, or Vue.js).
- Will require real-time communication (WebSockets) to synchronize the timer accurately if the server dictates the time.
- Will make REST API calls to submit the answer to the Game Management Service (GMS).

### Key Technical Decisions
1. Choice of front-end framework (React, Next.js, Vue.js).
2. Strategy for timer synchronization (client-side vs. server-authoritative).

### Performance Requirements
- The UI must be responsive and load quickly to not frustrate the user.
- Timer display must be smooth.

### Security & Compliance
- Input from the user should be sanitized before being sent to the backend.

---

## Design

**Design Status**: [Not Started | In Progress | Complete]

**Design Links**:
- Figma: [URL]
- Prototype: [URL]
- User Flows: [URL]

**Key Design Decisions**:
- Layout of the question, image, timer, and input field.
- Visual design for feedback on correct/incorrect answers.

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation | Owner |
|------|--------|-------------|------------|-------|
| Timer inaccuracies across devices | M | M | Use a server-authoritative timer | [Eng Lead] |
| Poor layout on different screen sizes | M | H | Adopt a mobile-first responsive design | [Design Lead] |

---

## Phases

### Phase 1: MVP
**Timeline**: End of Q1  
**Goal**: This entire epic is a core part of the MVP.

**Stories**:
- US-GF1
- US-GF2
- US-GF3
- US-GF6

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
- [ ] [Question 1] - Owner: [Name] - Due: [Date]

---

## Progress Updates
[Initial state]
---

## Related Work
- Related Epics: Epic: Scoring & Results (MVP)
- Related Features: Question & Answer UI
- Research: [Links]
