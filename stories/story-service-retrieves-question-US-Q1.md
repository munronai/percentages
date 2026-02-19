# User Story: Service Retrieves Question

## Story Title
Game Service can retrieve a question by difficulty.

## Story Statement
**As the** Game Service  
**I want** to retrieve a question for a specific percentage level (e.g., 5%)  
**So that** I can provide the correct question to the player for the current stage of the game.

## Context & Background
This is a technical story that defines a critical interaction between two backend microservices: the Game Management Service (GMS) and the Question Service (QS). The GMS runs the game logic, and it needs a reliable way to fetch content from the QS to drive the game forward. For the MVP, this involves fetching from a static database.

### User Pain Point
(N/A - This is a system-to-system interaction, so there is no direct user pain point. The "user" is the GMS). The pain point for the *developer* of the GMS would be an unreliable or poorly designed API from the QS.

### Business Value
This API is the backbone of the game's content delivery system. A clean, fast, and reliable API enables the entire game loop to function. It allows the game logic to remain separate from the question content, which is a core architectural principle of the application.

### Supporting Data
- **PRD**: "Feature 3: AI-Powered Question Service" requires the service to return questions based on difficulty. This is the MVP version of that requirement.
- **Architecture Diagram**: Shows the GMS depending on the QS.

## Acceptance Criteria
- [ ] Given the Question Service is running with a populated database, when a `GET` request is made to `/questions/{percentage}` (e.g., `/questions/50`), then the service returns a `200 OK` status and a JSON payload for a single, valid question object from that percentage level.
- [ ] Given a `GET` request is made for a percentage level that does not exist in the database, when the service responds, then it returns a `404 Not Found` status.
- [ ] Given a question is returned, when the JSON payload is inspected, then it contains at a minimum: `questionId`, `text`, `imageUrl` (can be null), and the `correctAnswer`.
- [ ] Given multiple questions exist for a percentage level, when multiple `GET` requests are made, then the service should ideally return different questions to avoid repetition (random selection is acceptable).

## User Flow
(This is a service-to-service flow)
1. The Game Management Service (GMS) needs a question for the 80% level.
2. The GMS sends an HTTP `GET` request to `[QuestionServiceBaseUrl]/questions/80`.
3. The Question Service (QS) receives the request.
4. The QS connects to its Question Database (QDB) and runs a query like `SELECT * FROM questions WHERE percentage = 80 ORDER BY RANDOM() LIMIT 1;`.
5. The QS formats the database row into a JSON object.
6. The QS sends the JSON object back to the GMS in an HTTP `200 OK` response.

## Design Notes
- This is a backend story, so there are no UI/UX design notes.
- The API contract (the shape of the JSON object) should be clearly documented and agreed upon by the engineers working on the GMS and QS.
- API Documentation (internal): [Link to internal API spec or README]

## Technical Considerations
- **Dependencies**: A PostgreSQL database (the QDB) must be running and accessible by the Question Service.
- **APIs/Integrations**: This story defines the primary API for the Question Service.
- **Performance requirements**: The API response time should be very fast (<100ms) to ensure the game doesn't lag between questions.
- **Security considerations**: This service should not be exposed to the public internet. It should only be accessible from within the cluster or by the GMS. The response payload **must** include the `correctAnswer` for the GMS to perform validation.

## Out of Scope
- Any form of AI question generation.
- Endpoints for submitting new questions (`POST /questions`).
- Public API documentation (OpenAPI). This is a purely internal API for the MVP.
- Any logic for ensuring a player doesn't see the same question twice in a short period (can be a future enhancement).

## Success Metrics
- **Primary metric**: API uptime of 99.9%+.
- **Secondary metrics**: Average API response time under 100ms.

## Priority & Estimation

### Priority
- [X] P0 - Critical

### Story Points
[To be estimated by team]

### Sprint/Release Target
MVP / Release 1

## Dependencies & Blockers
- **Depends on**: A database schema for the Question Database must be defined and created. A static set of questions must be written and inserted into the database.
- **Blocked by**: None.

## Questions & Assumptions
- [ ] Assumption: The Game Management Service knows which percentage level to request at each stage of the game.
- [ ] Question: What is the full, agreed-upon structure of the Question JSON object?

## Related Work
- **Related stories**: US-GF1 (Display Question) consumes the data from this story.
- **Related epics**: Question Service (MVP)
- **Documentation**: [Link to PRD section on Question Service]

---

**Created**: 2026-02-18  
**Last Updated**: 2026-02-18  
**Author**: Gemini  
**Stakeholders**: Engineering Lead
