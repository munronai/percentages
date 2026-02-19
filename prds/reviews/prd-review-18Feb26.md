# PRD Review: "Percentages" - 18 Feb 2026

This document contains feedback on the "Percentages" PRD (dated 2026-02-13) from three different perspectives: Engineering, Executive, and User Research.

---

## 1. (@_@) Engineer - Technical Review

### Overall Assessment
The PRD is detailed and provides a solid technical direction. The proposed microservice architecture is appropriate for the feature set, and the technology choices are standard and feasible. The biggest risks and complexities are related to the AI integration and real-time state management at scale.

### Technical Feasibility & Complexity
- **Core Gameplay (Solo/Multiplayer)**: **Medium Complexity**. Building a reliable, real-time session manager for 100 concurrent players with WebSockets is non-trivial. State synchronization, latency, and graceful handling of disconnects/reconnects will be the main challenges.
- **AI Question Generation**: **High Complexity**. The proposal to generate questions on-the-fly with a specific difficulty percentage is a major technical hurdle. The document correctly identifies "estimating difficulty" as an open question, but this is a critical risk that could block the feature. The initial implementation may require a human-in-the-loop or a separate ML model for ranking, which is not scoped.
- **Database/API**: **Low-to-Medium Complexity**. The proposed database schema and API endpoints are straightforward. The recommendation for asynchronous writes of new AI questions to the QDB is a good one to avoid bottlenecks during live games.

### Key Challenges & Risks
1.  **AI Difficulty Estimation**: This is the primary technical risk. Without a reliable way to assign a percentage score to a brand new question, the core premise of the game is weakened. A bad estimation model will feel unfair to users and damage trust.
2.  **Scalability**: While one game of 100 players is manageable, the architecture must support many concurrent games. The use of Redis for session state is a good choice, but load testing will be critical to ensure the GMS and database can handle the traffic.
3.  **API Security**: The PRD mentions a "Secure API" but provides no details. The public-facing question API, in particular, could be a target for abuse (e.g., scraping all questions). We will need robust authentication (e.g., JWT) and aggressive rate-limiting.

### Recommendations
1.  **De-risk AI Generation for MVP**: For the initial launch, I strongly recommend that AI-generated questions go into a moderation queue for human review and ranking before being added to the live question pool. On-the-fly generation with accurate, real-time ranking is a "v2" feature.
2.  **Define Reconnection Logic**: The PRD needs to specify how player disconnections/reconnections are handled. Can a player rejoin a game in progress if they drop for a few seconds? What is the timeout?
3.  **Specify `UserService`**: The architecture diagram includes a `UserService`, but the PRD features do not detail user profiles or authentication. This needs to be defined as part of the Phase 1 scope.

### Open Questions
- What is the proposed technical solution for estimating the difficulty of AI-generated questions?
- What is the precise reconnection and state-synchronization strategy for players who drop and rejoin a game?
- What are the target latency and performance benchmarks for the real-time components (e.g., answer submission and reveal)?

---

## 2. (ಠ_ಠ) Executive - Strategic Review

### Overall Assessment
This PRD presents a compelling vision for a product that targets a clear market gap. The connection to a successful existing format ("The 1% Club") provides a strong strategic foundation. The key risks are not technical but commercial: user acquisition costs, monetization strategy, and the operational cost of the AI model.

### Business Impact & Metrics
- The goal of **1,000 MAU** in 3 months is ambitious but reasonable for a well-executed launch. The go-to-market plan needs to be clearly defined to support this.
- The **API Usage** metric is intriguing but lacks strategic clarity. Is the public API a feature for community building, or is it a future revenue stream (e.g., tiered access)? This should be clarified.
- The lack of any monetization features in the initial phases is a strategic risk. While focusing on the core loop is wise, a clear hypothesis for future monetization should be included in the "Future Considerations" section.

### Strategic Context
- The AI-powered question generation is a key differentiator that directly addresses the "stale content" pain point of competitors. This is a strong competitive advantage if executed well.
- The brand identity is clear and leverages the mental model of a popular TV show, which can reduce marketing friction.

### Risks & Mitigation
1.  **Cost of AI at Scale**: This is the most significant business risk. The cost per-question generated must be modeled carefully. A high cost could make the core value proposition economically unviable, especially without a clear monetization strategy in place.
2.  **User Acquisition**: The success of a multiplayer social game depends on network effects. The plan needs to address how we will acquire the initial critical mass of users to make multiplayer sessions viable and fun. A viral loop (e.g., sharing results) should be prioritized.
3.  **Intellectual Property**: While "inspired by" a TV show is acceptable, we need to ensure we are not infringing on any trademarks or copyrighted material from "The 1% Club." A legal review is recommended.

### Recommendations
1.  **Model AI Costs Immediately**: Before committing to Phase 2, we need a detailed cost analysis of the AI question generation at various scales.
2.  **Develop a Go-to-Market Plan**: The PRD should be paired with a marketing plan detailing how we will reach our first 1,000 users.
3.  **Add Monetization Hypotheses**: Add a section under "Future Considerations" to outline potential monetization strategies (e.g., in-app purchases for hints/extra lives, cosmetic items, private lobby hosting fees).

---

## 3. (^◡^) User Researcher - User-Centric Review

### Overall Assessment
The PRD is well-aligned with the identified user pain points. The personas are a good start, but they could be enriched with more specific behavioral details. The user flow for joining a game presents the biggest usability risk.

### Personas & Pain Points
- The primary persona, "Alex, the Puzzle Enthusiast," is strong. To improve it, we should add insights about his current frustrations: Are other apps too ad-heavy? Is the "challenge" artificial? This will help us focus on what "quality" means to him.
- The secondary persona, "Sarah, the Social Gamer," is also relevant. The PRD assumes a purely competitive format. We should explore if a "team mode" or collaborative play could also meet her needs for a group activity.

### User Flow & Feature Feedback
1.  **Onboarding & Game Discovery**: The proposed flow of dropping a new user into a lobby list ("Game Session Management") can create high cognitive load. For a first-time user, a single, prominent **"Quick Play"** button that automatically places them in a suitable game (solo or public) would significantly reduce friction. The lobby browser should be a secondary option for experienced users.
2.  **Host Dependency**: The reliance on a single host is a significant user experience risk. What happens if the host's connection drops or they go idle? The game could stall. The system should include logic for **host migration** or an automatic "continue" after a host timeout.
3.  **Post-Game Experience**: The "Review Game" feature is excellent for user engagement and learning. To maximize its impact, this review screen should be **easily shareable**. Allowing users to post a clever question or their final score to social media is a powerful, low-cost viral marketing loop.
4.  **AI Question Quality**: From a user trust perspective, the quality and perceived fairness of the AI-generated questions are paramount. If a question is nonsensical, grammatically incorrect, or its difficulty feels arbitrary, it will quickly erode user trust. A human review process is essential, at least initially.

### Recommended Next Steps
1.  **Usability Testing**: Conduct usability tests on a simple prototype of the game joining flow. Compare the proposed "lobby browser" against a "quick play" model.
2.  **Survey**: Run a survey to validate the core concept and gather quantitative data on the logic vs. trivia preference.
3.  **Concept Testing for AI Questions**: Before full integration, test a batch of AI-generated questions with a small user panel to validate their quality, clarity, and perceived difficulty.
