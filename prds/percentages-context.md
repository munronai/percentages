I am building a quiz app. It shall be named “Percentages”
The app is styled on the TV show “the 1% club” from the UK. In this quiz 100 people answer questions where each question is graded according to the % of the UK population that can answer the question. The reasoning being that if you answer the final 1% question then you are in the 1% of the population that can answer correctly. If you fail to answer or answer correctly any question leading to the final then you are out of the game.
The questions are less general knowledge but more of a “thinking outside of the box”, for example there may be some logic to work out or a play on words (e.g. an image is displayed with the numbers 1 to 30 but the numbers are placed randomly and in different font sizes. The question is something like “in the image shown there are 30 numbers, one is missing. Which number is missing? The answer is in the question: “...one is missing.” because the number 1 is the number not in the image).
There are questions for 90,80,70,60,50,30,20,10,5,1%

The app I wish to build may support 100 people but should also be playable by as few as a single person if they wish to test their skills/knowledge.

The app will require:
A user interface for signing up to a game session
A trigger for the game to start if all players are present
The game session is closed to new joiners after it starts
The UI should be able to show the questions including a space for an image where the question needs an image
A timer and timer UI that allows 60 seconds for contestants to answer the question. When the timer ends a contestant cannot enter an answer
Controls for a host player (that may or may not also be a contestant) to show the answers and move to the next question
The UI should show the answer and then identify the players that did not answer correctly (and also keep score per player)

The app also requires:
A service for the questions
The questions can be taken from a database of existing questions
The questions should also be able to be created on-the-fly by an AI agent both during the game and as a training mode (e.g. I may wish to repeatedly answer 1% questions)
After a question has been generated it should be added to the database for later use.
The percentage of previous questions vs generated questions should be split on a ratio of 1:3 and, the ratio should be configurable
The database should have an API specified using OpenAPI Specification. The API must be used by the game UI but may also be available on its own
