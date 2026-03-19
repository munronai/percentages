# Percentages

Percentages is a project based around creating an online game inspired by the UK TV gameshow "The 1% Club".


## The Problem

The game is a vehicle for me to experiment with Claude Code and Gemini CLI for both "product management" documentation e.g. PRD, user stories, research
It is also an opportunity for me to build something with the tools iteratively, with more complex challenges as it proceeds (e.g. from single player to a decentralised multiplayer experience).
The core of the product assistance is based on the Claude Code project https://ccforpms.com/ although I have adapted it for Gemini CLI and I am changing things over time.


## The Solution

The solution is a work in progress and you can find the game in the percentages-next directory.

### Current Status

Currently
- the single player works with only 3 questions (note that these are not good questions, Gemini has created these as test questions)
- there is a multiplayer lobby operating on a websockets messsaging strategy. This is using a relay server but ultimately the game shall be peer-to-peer. 


## How to Use

If you wish to try the game follow the instructions below

### Setup
```bash
git clone https://github.com/munronai/percentages.git
cd percentages
npm install
```

### Run

To start the game server on localhost:3000
```bash
npm run dev
```

To start the relay server 
```bash
npm run relay
```

## How It Works

Enter your name to start - note that this will be stored in browser local storage (use the browser developer tools to inspect)
Select single or multiplayer game
Single player:
- the game begins and starts with a 90% question. This is the only question that make sense (to a human!)
- There is 60 seconds to answer otherwise you lose
- After the first question there are questions for 80% and 70%. These are placeholders for development tests (don't expect too much!). Take a look at the code to see the answers required
- The game ends when you answer all of the questions or fail to answer a question. At that point you can review the questions (and answers) for that game.

Multiplayer:
- This is not yet fully functional; you can create and join a game lobby but that is all.
- To test, open two browser tabs (preferably one of these as an incognito window)
- In one of the tabs, choose to host a public game. This new game should show in the window of the second player and allow you to join the game
- Upon joining, the game lobby should show both players. 

## Tradeoffs and Decisions


- **Delaying the implementation of AI-generated questions:**

The intention was (and still is) to have AI-generated questions however there are multiple challenges that would have delayed the building of the app.
- AI does not seem to be good at generating the puzzle/logic type of questions, never mind getting the level correct (90%, 80% and so on). The percentage is supposed to be based on the percentage of the population that can answer the question. This is difficult to test without extensive survey and therefore more difficult to do on the fly
- To generate questions on the fly, we need to be confident in the question logic and difficulty and currently generating images on the fly for questions would be too slow
- The (financial) cost of generating questions through an API needs to be evaluated

- **What I'd do differently:**

It's not so much a question of doing things differently. The intention to get something working remains. However, I think it would be easier to have AI-generated logic puzzles especially based on wordplay and drop the "strict" comparison/requirement with the percentage difficulty.

- **Multiplayer using a relay:**

A temporary decision to get something up and running. This resulted in a more "agile" iterative approach to the message design and how things should work. It has been a build-test-fix cycle. The relay server is a limiting factor for scalability. The ultimate goal is to use a pub/sub acrhitecture on a platform like Ably.

- **What I'd do differently:**

Take more time to design the architecture and the message content/intention before launching into the multiplayer build.

- **Reliance on PRD and user stories to drive the build:**

The approach has been to create the PRD (including iterations) and the user stories with AI assistance before asking the agent to develop a user story. This works but as the app gets more complex it is becoming difficult to easily know if I'm on the right track.

- **What I'd do differently:**

The next step (I think) will be a refactor. The codebase and the architecture requires better guidance, therefore there is a need to work on this and document how things should be structured (e.g. the aforementioned message use cases, the scalability).


- **Why Gemini CLI over Claude Code:**

I think Claude is more powerful/advanced but I wanted to see how Gemini coped with the same tasks and, I managed to get a reduced price for a few months of Google AI Pro!

- **What I'd do differently:**

For me this will ultimately come down to cost and how this changes in future but if prices are comparable I would choose the service that offers the more comprehensive function (Claude). 
I can see this changing if Gemini catches up and/or surpasses Claude. 
I have also been using jules.google.com because jules finds issues (example: typescript linting issues) that Gemini CLI did not. 
While Jules could be used on any repo (and therefore code created by Claude), the use of jules is included in the cost of Google AI Pro.

## What I Learned

- There is more depth required for my approach. There is a great experience in requesting that the agent ask you questions - even if you know the answers, it helps to make sure the agent knows the answers. It is useful to use the scripted personas (e.g. Engineering Lead) to drive out concerns that can be forgotten during the process. Further depth would be in the use of sub agents to be more efficient - at the moment this is a single person with technology assistant approach; there are more effective ways to use the agent(s) as a team.
- Gemini is currently (Mar 2026) not as capable (as Claude) when it comes to sub-agents that run in the background
- When it comes to asking for development, I find that I am repeating some instructions (mainly around TDD). A skill is a next step for this to avoid repetition.
- I have seen suggestions that PRDs and other documentation is less important in the context of the use of these CLI tools. I understand where that thinking comes from but I think the exercise of documenting and having the AI critique withn different personas remains a useful way of understanding the problem and what you intend to do.
- I noticed that it is easy to continue to prompt when in build mode instead of returning to documentation and user stories first. While it is faster to continue to develop, and it's ok for a personal project like this, the auditability of changes would be necessary in any context where the software would be used by customers (paying or otherwise).

## Next Steps

Read the PRD percentages-prd-2.md and the user stories. The focus is on the multiplayer aspects before the question content is improved.

---
