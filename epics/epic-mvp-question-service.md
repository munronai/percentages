# Epic: Question Service (MVP)

**Epic ID**: [ID if tracked]  
**Owner**: [Product Manager]  
**Status**: [Backlog | Planned | In Progress | Done]  
**Created**: 2026-02-18  
**Target Quarter**: Q1 2026

---

## Epic Summary
This epic covers the development of a basic backend service to provide questions for the game. For the MVP, this service will retrieve questions from a pre-populated, static database, focusing on reliability and simplicity to validate the core game loop.

---

## Problem & Opportunity

### User Problem
The game needs a source of questions to function. Without a question service, there is no game. For the MVP, a static set is sufficient to test the game's appeal.

### Business Opportunity
By starting with a simple service and a static database, we can launch the MVP quickly and affordably. This de-risks the project by defering the complexity and cost of AI question generation until the core concept is proven.

### Evidence
- **PRD**: The MVP scope explicitly defines a "Basic question service with a static set of questions" as in scope, and "AI question generation" as out of scope.

---

## Goals & Success Metrics

### Primary Goal
To create a reliable backend service that can serve questions from a static database to the Game Management Service based on requested difficulty.

### Success Metrics
| Metric | Baseline | Target | Timeline |
|--------|----------|--------|----------|
| API Uptime | 0% | 99.9% | 3 months post-launch |
| API Avg. Response Time | N/A | < 200ms | 3 months post-launch |

---

## Target Users

**Primary**: This is a backend service, so the primary "user" is the Game Management Service (GMS).  
**Affected Users**: All MVP players are indirectly affected, as this service provides the game's content.  
**User Segments**: N/A

---

## Scope

### High-Level Requirements
1. The service must be able to retrieve questions from a database.
2. The service must expose an endpoint for the GMS to fetch questions.
3. The service should be able to filter questions by difficulty (percentage).

### In Scope
- Serving questions from a static, pre-populated database (e.g., PostgreSQL).
- An internal API for the Game Management Service to consume.

### Out of Scope
- AI question generation.
- Saving new questions to the database.
- The public-facing OpenAPI for question submission/retrieval.
- Dynamic ratio of existing vs. generated questions.

---

## User Stories
<!-- List of user stories that make up this epic -->

- [ ] As the Game Service, I want to retrieve a question for a specific percentage level (e.g., 5%). - US-Q1 - [Planned]

**Total Story Points**: [X] (estimated)

---

## Dependencies

### Blockers
- A static set of questions needs to be created and populated into the database.

### Required By
- **Epic: Question & Answer UI (MVP)**: The UI needs questions from this service to display.
- **Game Management Service (GMS)**: The GMS depends on this service to run the game logic.

### Depends On
- None

---

## Technical Considerations

### Architecture Impact
- This is the Question Service (QS) microservice in the proposed architecture.
- It will have its own database (Question Database - QDB).

### Key Technical Decisions
1. Choice of technology for the service (Node.js, Java, Go).
2. Schema design for the Question Database (PostgreSQL).
3. API contract between the QS and the GMS.

### Performance Requirements
- The service must respond quickly to question requests to ensure a smooth game flow.

### Security & Compliance
- The service endpoint should only be accessible by the GMS, not the public internet.

---

## Design

**Design Status**: Not Applicable (Backend Service)

**Design Links**:
- API Spec: [URL for internal spec]

**Key Design Decisions**:
- API endpoint structure (e.g., `/questions/{percentage}`).

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation | Owner |
|------|--------|-------------|------------|-------|
| Lack of quality initial questions | H | M | Dedicate time for question writing/sourcing before launch. | PM |
| Database schema is not scalable | M | L | Design schema with future needs (e.g., AI generation fields) in mind. | [Eng Lead] |

---

## Phases

### Phase 1: MVP
**Timeline**: End of Q1  
**Goal**: This entire epic is a core part of the MVP.

**Stories**:
- US-Q1

---

## Launch Plan

### Go-to-Market Strategy
- This is a backend component of the initial MVP launch.

---

## Timeline

| Milestone | Target Date | Status | Notes |
|-----------|-------------|--------|-------|
| Kickoff | [Date] | [ ] | |
| Dev Complete | [Date] | [ ] | |
| QA Complete | [Date] | [ ] | |
| GA Launch | [Date] | [ ] | Part of MVP Launch |

---

## Resources

### Team
- **PM**: NM
- **Engineering Lead**: [Name]
- **Design Lead**: [N/A]
- **QA Lead**: [Name]
- **Engineers**: [Names]

### Links
- **PRD**: @percentages-product/prds/percentages-prd-2.md

---

## Open Questions
- [ ] Where will the initial set of static questions come from?
- [ ] What will the final database schema look like?

---

## Progress Updates
[Initial state]
---

## Related Work
- Related Epics: None
- Related Features: AI-Powered Question Service
- Research: [Links to question sources]
