# Product Requirements Document (PRD)

## Document Information
- **Product/Feature**: Percentages
- **Author**: NM
- **Status**: Draft
- **Last Updated**: 2026-02-18
- **Stakeholders**: [TBD]
- **Reviewers**: Agents (Engineering, Executive, User Researcher)

---

## Executive Summary
"Percentages" is a quiz app inspired by the TV show "The 1% Club," designed to challenge players with logic-based questions rather than general knowledge. It supports both solo and multiplayer (up to 100 participants) game modes. We are building this to tap into the market of users who enjoy intellectually stimulating puzzles and social gaming experiences. The expected impact is to create an engaging and scalable quiz platform with a unique, AI-driven content model.

---

## Problem Statement

### Current Situation
Many quiz apps on the market focus heavily on trivia and general knowledge. There is a gap for a mainstream, polished application that centers on "outside-the-box" thinking, logic puzzles, and wordplay, similar to what is seen in popular modern game shows.

### User Pain Points
1. **Lack of Engaging Solo Puzzle Games**: Users who want to challenge themselves with logic puzzles often have to resort to simple, repetitive mobile games that lack depth or a sense of progression.
2. **Limited Options for Group Brain-Teasers**: It's difficult to find an app that facilitates a live, competitive group session for puzzle-solving that isn't trivia-based.
3. **Stale Content in Quiz Apps**: Many apps have a finite and static question bank, leading to repetitive gameplay over time.

### Supporting Evidence
- **Quantitative Data**: Market research from 2023 shows the Puzzle genre is one of the most dominant in mobile gaming. It was the #2 genre for revenue, generated over $42 billion in the last decade, and has significantly higher user loyalty and retention than most other genres. The Trivia genre is substantially smaller, often categorized as a sub-genre of Puzzle. (See `@percentages-product/research/puzzle-vs-trivia-data.md` for full details and sources).
- **Qualitative Data**: The commercial success and positive reception of TV shows like "The 1% Club" in the UK and internationally.
- **Market Context**: A growing trend in the mobile gaming market towards "brain training" and logic-based challenges.

---

## Goals & Success Metrics

### Primary Goal
To launch a successful quiz application that provides a unique and engaging experience for both solo players and large groups, centered around logic and "outside-the-box" questions.

### Success Metrics
| Metric | Baseline | Target | Timeline | Measurement Method |
|---|---|---|---|---|
| User Engagement | 0 | 1,000 MAU | 3 months post-launch | App Analytics |
| Game Completion Rate (Solo) | 0% | 20% | 3 months post-launch | Game Server Logs |
| AI Question Generation | 0 | 1000 new questions | 3 months post-launch | Database records |
| API Usage | 0 | 10 external queries/day | 6 months post-launch | API Gateway Logs |

### Secondary Goals
- Achieve a 4.5+ star rating on app stores.
- Foster a community of players who contribute to the game's growth.

---

## Target Users

### Primary Persona
- **Name/Role**: Alex, the Puzzle Enthusiast
- **Context**: Plays mobile games during their commute or in the evenings to unwind and challenge themselves.
- **Goals**: Wants to find a game that is genuinely challenging and makes them think, rather than just testing recall of facts.
- **Pain Points**: Gets bored with trivia; finds most puzzle games too simplistic or repetitive.
- **Estimated Reach**: 25-40 year olds who enjoy escape rooms, board games, and puzzle-heavy video games.

### Secondary Personas
- **Name/Role**: Sarah, the Social Gamer
- **Context**: Organizes game nights with friends and family.
- **Goals**: Looking for a fun, interactive, and competitive game that everyone can play together, regardless of their knowledge of trivia.
- **Pain Points**: It's hard to find a game that is both intellectually stimulating and accessible to a group with diverse interests.

---

## Proposed Solution

### Overview
A mobile and web application that allows users to play a quiz game based on logic puzzles. The game can be played solo or in a live session with up to 100 players. A key feature is the dynamic question system, which uses an AI agent to generate new questions, ensuring fresh content.

### Key Features & Functionality

#### Feature 1: Game Session Management
**Description**: Users can join a game session or start a new one. A host can control the start of the game.
**User Value**: Enables both solo play and multiplayer experiences.
**Priority**: Must Have

**User Flow**:
1. Users can create a new game session (becoming the host) or join an existing one.
2. Players can browse a list of active, open sessions. This list should include the session name (if provided by the host), the current number of players, and the maximum player capacity.
3. A search and filter function could allow players to quickly find sessions based on criteria like game mode or friends-only status.
4. The session is initiated by the host once the minimum player count is met and the host manually starts the game, or after a set countdown timer when the maximum player count is reached.
5. The session is closed to new joiners once the game starts. Supports 1 to 100 players.

**Acceptance Criteria**:
- [ ] A user can start and complete a solo game.
- [ ] A user can create a multiplayer game lobby.
- [ ] Multiple users can join the lobby.
- [ ] The host can start the game, preventing new users from joining.

#### Feature 2: Question & Answer UI
**Description**: A clean interface to display the question (text and/or image) and a 60-second timer.
**User Value**: Provides a clear and time-bound interface for answering questions.
**Priority**: Must Have

**User Flow**:
1. A new question is displayed.
2. The 60-second timer begins to count down.
3. The user inputs their answer.
4. If the user inputs the correct answer then, the timer stops, the answer is displayed, and the user is successful.
5. If the user inputs the incorrect answer then the timer stops, the answer is displayed, and the user has failed.
6. When the timer ends, the input is disabled, the answer is displayed, and the user has failed.



**Acceptance Criteria**:
- [ ] Questions with both text and images can be displayed correctly.
- [ ] The timer is clearly visible and counts down accurately.
- [ ] The user success is displayed if the user is correct.
- [ ] The user failure is displayed is the user in incorrect or does not answer within 60 seconds.
- [ ] Answer input is disabled after 60 seconds.


#### Feature 3: AI-Powered Question Service
**Description**: A backend service that fetches questions from a database. It can also use an AI agent to generate new questions on-the-fly. Generated questions are saved to the database.
**User Value**: Ensures a constantly evolving and fresh set of questions, providing high replayability.
**Priority**: Must Have

**User Flow**:
1. The game requests a question of a certain difficulty (e.g., 50%).
2. The service decides whether to pull from the database or generate a new question based on a configurable ratio (default 1:3 generated:existing).
3. If generated, the AI creates a new question.
4. The question is returned to the game and saved asynchronously to the database.

**Acceptance Criteria**:
- [ ] The service returns questions based on the specified difficulty.
- [ ] The service respects the configurable ratio of generated vs. existing questions.
- [ ] AI-generated questions are successfully saved to the database.

#### Feature 4: OpenAPI for Question DB
**Description**: The question database is exposed via a well-documented API using the OpenAPI Specification.
**User Value**: Allows for potential future integrations, third-party apps, or community-driven tools.
**Priority**: Should Have

**Acceptance Criteria**:
- [ ] The API documentation is available and conforms to the OpenAPI 3.0 standard.
- [ ] The API provides endpoints for fetching and submitting questions.

#### Feature 5: Elimination
**Description**: Players who fail to answer correctly or submit within the time limit are eliminated.
**User Value**: Enforces the competitive, high-stakes nature of the game.
**Priority**: Must Have

**User Flow**:
1. A player submits an incorrect answer or the timer expires.
2. The system marks the player as "eliminated".
3. Eliminated players may remain in the session as spectators but cannot answer further questions.
4. Eliminated players have the option to exit the game session at any time.

**Acceptance Criteria**:
- [ ] Players are correctly marked as eliminated upon incorrect/late answer.
- [ ] Spectator mode is functional.

#### Feature 6: Scoring & Results
**Description**: The system tracks active players and their scores, and determines a winner at the end of the game.
**User Value**: Provides clear win/loss conditions and performance tracking.
**Priority**: Must Have

**Details**:
- **Scoring System**: Scoring is based on question difficulty. 
  - 1 point is allocated for correctly answered questions at or above the 50% threshold.
  - 2 points are allocated for correctly answered questions below the 50% threshold.
- **Game Conclusion**: The game ends when either the 1% question is attempted or all players are eliminated.
- **Winner Determination**:
    - If the 1% question is answered correctly, the player(s) who answered it are the winner(s).
    - If the 1% question is answered incorrectly or if all players are eliminated before then, the winner is the player(s) with the highest total points.
- **Results Display**: Upon conclusion, an overall results display is shown, presenting the winner(s) and the total points for every player. A "Review Game" option will allow players to recap all questions and answers.

**Acceptance Criteria**:
- [ ] Scoring is calculated correctly based on question difficulty.
- [ ] Winner is determined correctly based on the game's conclusion scenario.
- [ ] Results screen displays all required information.
- [ ] Post-game review is accessible.

---

## Technical Considerations

### Architecture Overview
The system will employ a decoupled, microservice architecture, separating the front-end UI from the back-end Game Management Service (GMS) and the Question Service (QS).

- **Frontend (UI)**: A single-page application handling all user-facing views and interactions.
- **Game Management Service (GMS)**: Handles player sessions, game state, timer logic, answer validation, and elimination.
- **Question Service (QS)**: Acts as a facade for question retrieval, abstracting the source (database vs. AI generation).

### Component Details

#### Front-end (UI)
- **Technology**: React, Next.js or Vue.js for a responsive single-page application experience.
- **Communication**: 
  - **WebSockets** for real-time game updates and scalability (timer countdown, question reveals, elimination status).
  - **REST API** calls to the GMS for control actions (e.g., signing up, submitting an answer).
- **Views**: Sign-up/Lobby View, Contestant Game View, Host Control Panel View.

#### Game Management Service (GMS)
- **Technology**: Node.js or Python for rapid prototyping and handling asynchronous I/O. Consider conversion to golang or Rust for performance and scale following successful prototyping.
- **Dependencies**: Player/Session Database (PSD) and Question Service (QS).
- **Key Logic**: Manages the 60-second timer per question, validates answers retrieved from QS, and updates player status in the PSD.

#### Question Service (QS)
- **Technology**: Node.js, Java, or Go (focus on fast API response).
- **API Specification**: Must adhere to the OpenAPI Specification (OAS).
- **Key Logic**: Implements the 1:3 (Database:AI) retrieval logic. If an AI question is generated, it is first persisted to the Question Database (QDB) before being returned to the GMS.
- **AI Question generation**: Model selection to be balanced with cost.

#### Databases
- **Question Database (QDB)**: 
  - **Purpose**: Storage for existing and newly generated questions.
  - **Technology**: PostgreSQL (for structured question data and reliability).
- **Player/Session Database (PSD)**: 
  - **Purpose**: Storage for user profiles, current game sessions, and player status (active/eliminated).
  - **Technology**: MongoDB (for flexible session tracking) or Redis (for high-speed session state).

### API Specification Outline (for Question Service)
The Question Service will expose the following key endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `/questions/{question-id}` | GET | Retrieves a specific question for the specified `question-id` |
| `/questions` | GET | Retrieves all questions in the database (pagination support required.) |
| `/questions?percentage={percentage}` | GET | Retrieves all questions for the specified `percentage` difficulty (pagination support required.) |
| `/questions/{percentage}` | GET | Retrieves a question for the specified percentage difficulty, selected based on the 1:3 (DB:AI) ratio. |
| `/questions/{question-id}/validation` | POST | Validates a player's submitted answer against the correct answer for a given `question_id`. |
| `/questions` | POST | Used internally or by an admin tool to add new questions to the QDB. Request body specifies the question and answer being added|
| `/generated-questions` | POST | Used internally or by an admin tool to request a new AI-generated question|

### Dependencies
| Dependency | Owner | Status | Risk Level |
|---|---|---|---|
| AI Model API | 3rd Party | TBD | Med |

---

## Scope & Phases

### Phase 1: MVP (Minimum Viable Product)
**Target Date**: End of Q1
**Goal**: Validate the core single-player game loop and the appeal of the question style.

**In Scope**:
- User interface for signing up.
- Solo game mode.
- Basic question service with a static set of questions.
- Timer and answer submission.

**Out of Scope**:
- Multiplayer mode.
- AI question generation.
- Public API for the question database.

### Phase 2: Multiplayer and Host Controls
**Target Date**: End of Q2
**Goal**: Enable the social and competitive aspect of the game.

**Planned Features**:
- Game lobby and session management.
- Host controls.
- Scoring and results screen.

---

## Open Questions
- [ ] Which AI model provides the best results for question generation?
- [ ] What is the cost of the AI model API at scale?

---

## Assumptions
1. There is a market for a logic-based quiz game.
2. An AI model can generate high-quality questions that fit the game's style.

---

## Appendix: User Stories

### Game Session Management
| ID | User Story | Priority | Feature ID |
|---|---|---|---|
| US-G1 | As a player, I want to sign up for a new game session so I can participate in the quiz. | High | G-01, UI-01 |
| US-G2 | As a host, I want to trigger the game start once all intended players are present so the quiz can begin. | High | G-01, UI-05 |
| US-G3.1 | As a single player, I want a clear "Start Solo Game" button on the home screen so I can quickly begin my quiz. | High | G-01 |
| US-G3.2 | As the application, I want to initialize a game session and fetch the first question using a single efficient API call so the player can start without delay. | High | G-01 |
| US-G3.3 | As a player, I want my game progress to be saved locally so that I can resume my session if I accidentally refresh the page or navigate away. | High | G-01 |
| US-G4 | As a player, I want to browse a list of public games so I can join one that is in progress. | Medium | UI-01 |

### Gameplay Flow
| ID | User Story | Priority | Feature ID |
|---|---|---|---|
| US-GF1 | As a contestant, I want to see the question text and any accompanying image clearly displayed on my screen. | High | UI-02 |
| US-GF2 | As a contestant, I want to see a 60-second countdown timer so I know how much time I have left to answer. | High | G-03, UI-03 |
| US-GF3 | As a contestant, I want to submit my answer within the time limit using a simple input field. | High | G-03, UI-04 |
| US-GF4 | As a host, I want controls to show the correct answer after the timer expires. | High | UI-05, UI-06 |
| US-GF5 | As a player, I want the system to identify if my answer was incorrect and eliminate me from the current game session. | High | G-04, G-05 |
| US-GF6 | As a player, I want to see immediate feedback on whether my answer was correct or incorrect. | High | UI-02, UI-06 |
| US-GF7 | As a player, after a game has ended, I want to review all the questions and answers to see what I got right and wrong. | Medium | UI-06 |
| US-GF8 | As an eliminated player, I want to stay in the game as a spectator so I can see how the remaining players do. | Medium | G-04 |

### Question Generation and Content
| ID | User Story | Priority | Feature ID |
|---|---|---|---|
| US-Q1 | As the Game Service, I want to retrieve a question for a specific percentage level (e.g., 5%). | High | G-02, QS-01 |
| US-Q2 | As the Game Service, I want the system to generate a new question using the AI agent when the existing database content is insufficient, based on the 1:3 ratio. | High | QS-02, QS-04 |
| US-Q3 | As the Question Service, I want to store any newly generated AI questions in the database for future use. | High | QS-03 |
| US-Q4 | As a developer, I want the Question Database API to be described using OpenAPI Specification so I can easily integrate the UI and GMS. | High | QS-05 |
| US-Q5 | As an admin, I want to use an API to retrieve all questions, with pagination, so that I can manage the question database. | Medium | QS-05 |
| US-Q6 | As an admin, I want to use an API to trigger the generation of a new question to test the AI model or seed the database. | Low | QS-05 |
