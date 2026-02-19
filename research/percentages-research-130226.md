# Research Summary: "Percentages" Quiz App (13/02/2026)

This document summarizes the initial research findings for the "Percentages" quiz app project.

## 1. "The 1% Club" TV Show Question Source

*   **Finding**: There is no official, publicly accessible API that provides questions from "The 1% Club" TV show.
*   **Nature of Questions**: The show's questions are not based on general knowledge or trivia. Instead, they are designed to test logic, common sense, and "outside-the-box" thinking.
*   **Alternative Source**: A board game version of the show has been released. The questions included in this game could serve as a valuable resource for understanding the style, format, and difficulty of the questions used in the show.

### Example Questions

*Note: Specific percentages for these questions are not consistently available in public sources.*

*   **Logic and Wordplay:**
    *   "What four-word phrase can you get if you keep everything below, but remove 'two letters' in order? T I W O A M L A W E T I N T E N R E S R." (Answer: "I AM A WINNER")
    *   "Which word in this sentence should be broken into smaller words? WHEN CAROL BOUGHT A JUMPSUIT AND A WINDBREAKER, SHE ASKED THE SHOP CLERK TOGETHER A DISCOUNT." (Answer: "TOGETHER" -> "TO GET HER") - **(50% Question)**
*   **Numerical and Pattern-based:**
    *   "Last month was not May or July. The next month couldn't be January, March, or November. Neither last nor next month could be April, August, or December. What month is it?" (Answer: April)
    *   "How many times does the letter 'A' appear in the numbers from one to ninety-nine when spelt out?"
*   **Situational and Deductive Reasoning:**
    *   "Manchester has a reputation for being rainy, but if it is dry at 12:01 am on Monday, what are the chances of it being sunny 72 hours later, on Thursday?" (Answer: 0% because it will be 12:01 am on Thursday, so it won't be sunny)
    *   "Lily is Pippa's niece but she isn't Nicola's niece even though Nicola is Pippa's sister and Pippa has no children. How is that possible?" (Answer: Lily is Nicola's daughter)

### Image-Based and Visual Questions

*   **90% Question:** "Which of these 3 tea kettles is the worst 1 to use to pour boiling water on a teabag?" (This question would be accompanied by an image of three tea kettles, one of which is clearly impractical for pouring).
*   **60% Question:** "Billy is writing out the names of different numbers using Popsicle sticks. He is using one Popsicle stick per stroke as you can see in this example, NINE. Which of the options below will use exactly nine Popsicle sticks to spell its numbers? A) ONE; B) FIVE; C) TEN." (Answer: C: TEN).
*   **40% Question:** "How many of the numbers 0-9 are not used in the images seen here?" (This question would be accompanied by various images that contain numbers).
*   **30% Question:** "5 of these six dominoes can go together to form a chain where only matching numbers can be placed next to each other. Which of these dominoes will be left out of that chain?" (This question would display six dominoes).
*   **15% Question:** A large grid of 100 squares is shown. 30% are green, the rest are yellow. Of the green squares, 20% have a tree icon. Of the yellow squares, 10% have a sun icon. What percentage of *all* the squares have an icon? (Answer: 13%).

## 2. Verifying Question Difficulty Percentage

*   **Methodology**: To accurately verify the percentage of the UK adult population that can answer a given question, a formal and statistically robust survey is required. Casual or self-selecting online polls are not reliable.
*   **Key Steps**:
    1.  **Representative Sampling**: Use established polling methodologies like **random sampling** or **quota sampling** to create a sample that accurately reflects the UK's demographics (age, gender, region, etc.).
    2.  **Sample Size**: A minimum sample size of **1,000 to 1,200 participants** is the standard for achieving a reasonably low margin of error (typically around +/- 3%) in a national survey.
    3.  **Data Weighting**: After collecting responses, the raw data must be statistically **weighted**. This process adjusts the results to correct for any demographic imbalances in the sample, ensuring the final percentage is representative of the actual UK population.
*   **Professional Standard**: This is the methodology employed by professional polling organizations and government bodies like the **Office for National Statistics (ONS)**.

## 3. AI Prompt Template for Generating Ranked Questions

*   **Core Concept**: A detailed and well-structured prompt is essential for guiding an AI to generate high-quality quiz questions with specific difficulty rankings.
*   **Recommended Prompt Structure**:
    *   **Role-play**: Instruct the AI to act as a "Quiz Master" or "Expert Educator."
    *   **Define a Clear Task**:
        *   **Topic**: Specify the subject matter for the questions (e.g., "History of Space Exploration," "Classic Literature").
        *   **Number of Questions**: State the total number of questions to generate.
        *   **Difficulty Distribution**: Provide a clear breakdown of the desired difficulty levels (e.g., 40% Easy, 40% Medium, 20% Hard).
        *   **Target Audience**: Describe the intended players (e.g., "High school students," "History buffs").
    *   **Enforce a Strict Output Format**: Require the AI to structure each question with clear fields:
        *   `Question Text:`
        *   `Difficulty:` [Easy/Medium/Hard]
        *   `Options:` (For multiple choice)
        *   `Correct Answer:`
        *   `Explanation:` (To clarify why the answer is correct).
*   **Advanced Technique**: For more sophisticated questions, the prompt can incorporate principles from **Bloom's Taxonomy**, asking for questions that test different cognitive levels (e.g., basic recall vs. analysis, synthesis, or evaluation).

## 4. Test questions generated during research

Based on the analysis of the existing questions, here are two new questions generated in the style of "The 1% Club".

*   **Generated 90% Question (Logic/Visual):**
    *   **Question:** "You are in a room in Antarctica with three possible exits. One door is made of solid steel, one is made of wood, and one is made of solid, thick ice. Which door presents the most straightforward path to exit the room?"
    *   **Answer:** The wooden door.
    *   **Reasoning:** The wooden door is the only one that functions as a typical door. The steel door would be incredibly heavy and likely frozen shut, and the ice door is just a solid block. The question is about the most straightforward exit, not which material is breakable.

*   **Generated 50% Question (Wordplay/Riddle):**
    *   **Question:** "A man is looking at a portrait. A friend asks him who he is looking at. The man replies, 'Brothers and sisters I have none, but that man's father is my father's son.' Who is the man in the portrait?"
    *   **Answer:** His son.
    *   **Reasoning:** The phrase "my father's son" refers to the speaker himself (since he has no brothers). Therefore, the statement becomes "that man's father is me," which means the man in the portrait is his son.
