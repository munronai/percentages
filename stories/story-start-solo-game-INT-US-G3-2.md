# User Story: Start Solo Game - Integration

## Story Title
Initialize Solo Session with Optimized Question Fetching

## Story Statement
**As the** application  
**I want** to initialize a game session and fetch the first question using a single efficient API call  
**So that** the player can start without delay.

## Context & Background
This story covers the technical integration between the frontend and the Question Service. By optimizing the initial question fetch, we reduce latency and provide a smoother transition from the Home Screen to active gameplay.

### User Pain Point
"I hate waiting for loading screens. I want the first question to appear immediately after I click start."

### Business Value
Reducing time-to-first-question minimizes user churn at the beginning of the session. Using a single request simplifies the frontend logic and reduces server load.

### Supporting Data
- **PRD**: Feature 1 (Game Session Management) and Feature 3 (AI-Powered Question Service).
- **Architecture**: Decoupled frontend and Question Service.

## Acceptance Criteria
- [ ] Given I have clicked "Start Solo Game", when the request is sent, then it uses the endpoint: `GET /questions?percentage=90&next=true`.
- [ ] Given the Question Service is not yet available, when the request is made, then a mock implementation must return a valid question object:
  ```json
  {
    "questionId": "q-90-001",
    "text": "Adding what single letter to the word 'CONTACT' makes it smaller?",
    "imageUrl": null,
    "correctAnswer": "R",
    "difficulty": 90
  }
  ```
- [ ] Given the request is in flight, when the data is being fetched, then the UI displays a brief loading state.
- [ ] Given a successful response, when the question data is received, then the user is navigated to the Question view and the 60s timer starts immediately.

## User Flow
1. User clicks the "Start Solo Game" button.
2. The frontend sends a `GET /questions?percentage=90&next=true` request.
3. A loading indicator appears briefly.
4. The system receives the question object.
5. The application navigates to the gameplay screen, displaying the question and starting the timer.

## Design Notes
- The loading state should be clean and consistent with the app's aesthetic.
- The transition to the game screen should feel immediate.

## Technical Considerations
- Dependencies: Requires the API endpoint logic (or mock) from the Question Service.
- APIs/Integrations: `GET /questions?percentage={percentage}&next=true`.
- Performance requirements: Response time target < 200ms.

## Out of Scope
- Backend implementation of the Question Service (beyond the mock).
- Handling follow-up questions (covered in subsequent game loop stories).

## Success Metrics
- **Primary metric**: Average latency between clicking "Start" and the first question appearing. Target: < 500ms.
- **Secondary metrics**: Error rate for the initial question fetch.

## Priority & Estimation

### Priority
- [X] P0 - Critical

### Story Points
[To be estimated by team]

### Sprint/Release Target
MVP / Release 1

## Dependencies & Blockers
- Depends on: US-G3.1 (UI Entry Point).
- Blocked by: Agreement on the API contract for the Question Service.

## Questions & Assumptions
- [ ] Assumption: Starting difficulty for solo mode is always 90%.

## Related Work
- Related stories: US-G3.1, US-G3.3, US-Q1.
- Related epics: Game Session Management (MVP), Question Service (MVP).
- Documentation: [Link to PRD section on API Specification]

---

**Created**: Thursday, 19 February 2026  
**Last Updated**: Thursday, 19 February 2026  
**Author**: Gemini  
**Stakeholders**: PM, Engineering Lead
