# User Story: Display Countdown Timer

## Story Title
Contestant can see the countdown timer.

## Story Statement
**As a** contestant  
**I want** to see a 60-second countdown timer  
**So that** I know how much time I have left to answer.

## Context & Background
The time limit is a core mechanic that adds excitement and challenge to the game. A clear, visible timer is essential for the player to manage their time effectively during each question. It creates a sense of urgency and is a key part of the gameplay experience.

### User Pain Point
"I had no idea how much time was left! The timer was hidden or so small I didn't notice it, and I ran out of time. It feels unfair if I can't pace myself."

### Business Value
The timer is a primary driver of engagement and tension. Ensuring it is a prominent and well-executed part of the UI is critical to delivering the intended "high-stakes" feel of the game, even in a solo session.

### Supporting Data
- **PRD**: "Feature 2: Question & Answer UI" is a "Must Have" and its second acceptance criterion is "The timer is clearly visible and counts down accurately."

## Acceptance Criteria
- [ ] Given a new question is displayed on the game screen, when the question appears, then a timer starting at 60 seconds is displayed prominently.
- [ ] Given the timer is active, when each second passes, then the displayed time decrements by 1 in a smooth, consistent manner.
- [ ] Given the timer has less than 10 seconds remaining, when the countdown continues, then the timer's appearance changes (e.g., color turns red, starts pulsing) to increase the sense of urgency.
- [ ] Given the timer reaches 0, when the countdown finishes, then a "Time's Up" event is triggered in the system.

## User Flow
1. The user is on the Question & Answer screen, and a new question has just been rendered.
2. Simultaneously, a timer element appears on the screen, initialized to "60".
3. The timer begins to count down, updating every second.
4. The user glances at the timer periodically while they think.
5. As the timer gets low, its visual treatment changes, alerting the user.
6. The timer hits "0", and the game logic for running out of time is executed.

## Design Notes
- The timer should be large and placed in a location where the user can see it without taking their eyes too far from the question and answer area (e.g., top center or top right).
- Consider a circular progress bar animating around the number for a more visual representation of time passing.
- The color change at 10 seconds should be noticeable but not overly distracting.
- Figma/Design link: [URL for Question & Answer screen with timer element]

## Technical Considerations
- **Dependencies**: None. This is a core part of the game screen.
- **APIs/Integrations**: The timer logic will be managed by the front-end client for the MVP. A future enhancement could be a server-authoritative timer to prevent cheating in multiplayer, but this is not needed for the solo MVP.
- **Performance requirements**: The timer animation must be smooth and not cause UI jank.

## Out of Scope
- Any ability for the user to pause the timer.
- Different time limits for different questions (all are 60s for now).
- Sound effects for the timer ticking down.

## Success Metrics
- **Primary metric**: High user rating on "game excitement" or "challenge" in post-launch surveys.
- **Secondary metrics**: Analysis of answer submission times to see how many users submit answers in the final 10 seconds.

## Priority & Estimation

### Priority
- [X] P0 - Critical

### Story Points
[To be estimated by team]

### Sprint/Release Target
MVP / Release 1

## Dependencies & Blockers
- **Depends on**: Part of the same screen as US-GF1.
- **Blocked by**: None.

## Questions & Assumptions
- [ ] Assumption: A client-side timer is sufficient and reliable enough for the MVP solo mode.
- [ ] Question: What is the exact visual effect for the "low time" warning?

## Related Work
- **Related stories**: US-GF1 (See question), US-GF3 (Submit answer), US-GF5 (Elimination).
- **Related epics**: Question & Answer UI (MVP)
- **Documentation**: [Link to PRD section on the timer]

---

**Created**: 2026-02-18  
**Last Updated**: 2026-02-18  
**Author**: Gemini  
**Stakeholders**: PM, Engineering Lead, Design Lead
