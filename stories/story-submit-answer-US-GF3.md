# User Story: Submit Answer

## Story Title
Contestant can submit an answer.

## Story Statement
**As a** contestant  
**I want** to submit my answer within the time limit using a simple input field  
**So that** I can attempt to solve the question.

## Context & Background
This story covers the primary user interaction within the game loop. After reading the question and managing their time, the user needs a clear and simple mechanism to input and confirm their answer. The input method should be straightforward to not add unnecessary cognitive load.

### User Pain Point
"I knew the answer, but the input field was buggy, or the submit button was hard to press, and I couldn't get my answer in on time. It's incredibly frustrating to fail because of a bad interface."

### Business Value
A reliable and easy-to-use answer submission process is fundamental to the game's playability. It is the main point of interaction and must be seamless. A frustrating submission experience will directly lead to user churn.

### Supporting Data
- **PRD**: "Feature 2: Question & Answer UI" is a "Must Have," and the user flow explicitly details the process of the user inputting their answer.

## Acceptance Criteria
- [ ] Given a question is active, when the game screen is displayed, then a text input field and a "Submit" button are clearly visible and enabled.
- [ ] Given I have typed an answer into the input field, when I tap the "Submit" button, then the answer string is captured and sent to the Game Management Service for validation.
- [ ] Given I have submitted an answer, when the validation process is pending, then the input field and submit button become disabled to prevent multiple submissions.
- [ ] Given the timer has reached 0, when the "Time's Up" event occurs, then the input field and submit button are disabled immediately.

## User Flow
1. The user is on the Question & Answer screen and has an answer in mind.
2. The user taps the text input field, which brings up the device's keyboard.
3. The user types their answer.
4. The user taps the "Submit" button.
5. The UI immediately disables the input field and button.
6. The answer is sent as an API request to the backend.

## Design Notes
- The answer input area should be large and easy to tap.
- The "Submit" button should be prominent and have a clear "pressed" state.
- The keyboard type should be optimized for text entry.
- Consider how the keyboard appearing on mobile devices will affect the layout. The input field should remain visible.
- Figma/Design link: [URL for Question & Answer screen with input field]

## Technical Considerations
- **Dependencies**: The Game Management Service must have an endpoint ready to receive the answer for validation.
- **APIs/Integrations**: A `POST` request to an endpoint like `/game/{sessionId}/answer` containing the `questionId` and `submittedAnswer`.
- **Security considerations**: All user-submitted text must be sanitized on the backend before being processed or stored to prevent XSS and other injection attacks.

## Out of Scope
- The logic for validating the answer (this is a backend concern).
- Feedback on whether the answer was correct (covered in US-GF6).
- Handling different answer types (e.g., multiple choice, numeric). For now, all answers are text.

## Success Metrics
- **Primary metric**: High task completion rate for submitting an answer.
- **Secondary metrics**: Low number of reported bugs related to the input field or submit button.

## Priority & Estimation

### Priority
- [X] P0 - Critical

### Story Points
[To be estimated by team]

### Sprint/Release Target
MVP / Release 1

## Dependencies & Blockers
- **Depends on**: US-GF1 (See question), US-GF2 (See timer). This story is part of the same UI.
- **Blocked by**: The backend Game Management Service needs an endpoint to receive the answer.

## Questions & Assumptions
- [ ] Assumption: A simple text input is sufficient for all question types in the MVP.
- [ ] Question: Should the answer be case-insensitive? (This is a backend validation decision, but affects user perception).
- [ ] Question: Should we trim whitespace from the beginning and end of the answer? (Also a backend decision).

## Related Work
- **Related stories**: US-GF6 (See feedback), US-GF5 (Elimination).
- **Related epics**: Question & Answer UI (MVP)
- **Documentation**: [Link to PRD section on Answer Submission]

---

**Created**: 2026-02-18  
**Last Updated**: 2026-02-18  
**Author**: Gemini  
**Stakeholders**: PM, Engineering Lead, Design Lead
