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
A mobile and web application that allows users to play a quiz game based on logic puzzles. The game can be played solo or in a live session with up to 100 players. The multiplayer architecture is decentralized: there is no central game server. Instead, a **Host Player** acts as the authoritative server for the session. To ensure session continuity, the system supports **Host Migration**, allowing another player to take over the "server" role if the original host disconnects.

### Key Features & Functionality

#### Feature 1: Decentralized Game Session Management
**Description**: Users can host a new game or join an existing one. Discovery occurs via a shared messaging channel (e.g., WebSockets) rather than a central database of sessions.
**User Value**: Enables low-latency multiplayer without a heavy backend, while providing resilience against host failure.
**Priority**: Must Have

**User Flow**:
1. **Discovery**: When the app starts, it listens to a global "Game Channel." It broadcasts a "Who is hosting?" message and displays a list of active games that respond.
2. **Hosting**: A user creates a room. The app broadcasts a "New Game: [Code] [Name]" message. This client now manages the game state and timer for all peers.
3. **Joining**: Players enter a Room Code to join a specific peer-hosted session.
4. **Host Migration**: If the Host's heartbeat stops, the remaining peers elect a new Host based on a shared state, ensuring the game continues without interruption.

**Acceptance Criteria**:
- [ ] A user can broadcast their game to the shared channel.
- [ ] Players can see a list of available games populated by channel messages.
- [ ] Game state (timer, active players) is synchronized across all peers via the messaging bus.
- [ ] Session persists if the original host drops (Host Migration).

#### Feature 2: Question & Answer UI (Security Enhanced)
**Description**: A clean interface for questions and answers. Answers are retrieved separately and encrypted/encoded to prevent client-side peeking in a decentralized environment.
**User Value**: Provides a fair, competitive environment where the Host doesn't have an unfair advantage.
**Priority**: Must Have

**User Flow**:
1. The Host fetches a question and its encrypted answer from the Question Service.
2. The Host broadcasts the question to all peers via the messaging channel.
3. Once the 60-second timer expires, the Host broadcasts the decryption key or encoded answer for local validation on each client.

**Acceptance Criteria**:
- [ ] Questions and answers are handled as separate entities in the API.
- [ ] Answer validation is secure even though the Host is another player's client.
- [ ] Timer is synchronized across all peers.


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

### Architecture Overview: Decentralized "Listen Server"
The system utilizes a **Decentralized Peer-to-Peer (P2P) Hybrid** model. Instead of a central Game Management Service, the "Server" logic runs inside the Host's browser/app.

- **Frontend (Client)**: Every client contains both the "Player" logic and the "Host/Server" logic (activated only if they are the current Host).
- **Messaging Channel (Relay)**: A lightweight WebSocket-based relay (e.g., Socket.io or similar) handles message passing between peers. It does not store game state; it only broadcasts messages.
- **Question Service (QS)**: A central REST API that provides logic puzzles. It is "stateless" regarding the game session.

### Component Details

#### Real-time Messaging Channel
- **Technology**: WebSocket Relay (Pub/Sub model).
- **Logic**: 
  - **Broadcasts**: "Game Created," "Who is Hosting?", "New Question," "Timer Sync," "Player Eliminated."
  - **Liveness**: Hosts send a frequent heartbeat. If the heartbeat fails, peers initiate a migration protocol.

#### Host Migration & State Synchronization
- **State Replication**: The current Host broadcasts a "State Snapshot" (active players, scores, question index) periodically. Every player maintains a local copy of the full game state.
- **Migration Protocol**: If the Host drops (heartbeat timeout), the remaining peers elect a new Host based on a deterministic rule (e.g., longest connection duration) to resume the session.

#### Secure Question Fetching
- **Separation of Concerns**: The Question Service provides a `question_payload` (visible) and an `answer_hash` or `encrypted_answer`.
- **Validation**: Answers are only decrypted locally once the timer ends, or the Host releases the key, ensuring even the Host cannot "cheat" easily during the 60s window.

#### Databases
- **Question Database (QDB)**: 
  - **Purpose**: Storage for existing and newly generated questions.
  - **Technology**: PostgreSQL.
- **Session Messaging**: 
  - **Purpose**: Signaling and message relay.
  - **Technology**: Redis or a managed WebSocket service (e.g., Ably, PubNub) to handle global message broadcasting.

### API Specification Outline (for Question Service)
The Question Service will expose the following key endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `/questions/{id}` | GET | Retrieves a question payload (text/image) |
| `/answers/{id}` | GET | Retrieves the encrypted or hashed answer |
| `/questions?percentage={p}` | GET | Retrieves questions for the specified difficulty level |
| `/questions/{p}` | GET | Retrieves a single question based on 1:3 ratio |
| `/questions` | POST | Admin: Add new questions to the database |
| `/generated-questions` | POST | Admin/Internal: Trigger AI question generation |

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

### Phase 2: Decentralized Multiplayer & AI Generation
**Target Date**: End of Q2
**Goal**: Launch the P2P multiplayer experience with resilient discovery and AI question generation.

**In Scope**:
- Global messaging channel for peer signaling.
- Room discovery via broadcast/listen protocol.
- Host Migration logic to handle host disconnects.
- Encrypted answer distribution and validation.
- AI question generation and database integration.

**Out of Scope**:
- Advanced anti-cheat (beyond basic encryption).
- Global matchmaking (simple lobby discovery instead).

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
