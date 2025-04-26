import React, { useState } from 'react';
import './Card.css';

function Card({ onGameOver }) { 
    
    //Mock database for questions
    const questionsDatabase = [
        [
            "What is the capital of France?", // Question
            ["Paris", "London", "Berlin", "Madrid"], // Answer choices
            "Paris" // Correct answer
        ],
        [
            "Which planet is known as the Red Planet?",
            ["Earth", "Mars", "Jupiter", "Venus"],
            "Mars"
        ],
        [
            "What is the largest mammal in the world?",
            ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
            "Blue Whale"
        ],
        [
            "Who wrote 'To Kill a Mockingbird'?",
            ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
            "Harper Lee"
        ],
        [
            "What is the chemical symbol for water?",
            ["H2O", "O2", "CO2", "NaCl"],
            "H2O"
        ]
    ];

    // State variables
    const [answer, setAnswer] = useState(null); // State for user's answer
    const [correct, setCorrect] = useState(false); // State for correctness of answer
    const [question, setQuestion] = useState(""); // State for trivia question
    const [choices, setChoices] = useState([]); // State for answer choices
    const [correctAnswer, setCorrectAnswer] = useState(""); // State for the correct answer

    const newQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questionsDatabase.length); //Get a new random question
        setQuestion(questionsDatabase[randomIndex][0]); //Set the new question
        setChoices(questionsDatabase[randomIndex][1]); //Set the new choices
        setCorrectAnswer(questionsDatabase[randomIndex][2]); //Set the new correct answer
        setAnswer(null); //Reset the answer state
        setCorrect(false); //Reset the correctness state
    };

    // Load the first question when the component mounts
    React.useEffect(() => {
        newQuestion();
    }, []);

    const handleAnswerClick = (choice) => {
        if (answer) return;

        setAnswer(choice);
        if (choice === correctAnswer) {
            setCorrect(true);
            // Load a new question after 2 seconds if the answer is correct
            setTimeout(() => {
                newQuestion();
            }, 2000); 
        } else {
            setCorrect(false);
            setTimeout(() => {
                onGameOver(); // Return to menu when it's wrong
            }, 2000);
        }
        //console.log(`You clicked ${choice} -- The correct answer was ${correctAnswer}, meaning you were ${correct}`); //Logging
    };

    return (
        <div className="card">
        <h2 className="card-title">Question</h2>
        <p className="card-content">{question}</p>
        <button 
                onClick={() => handleAnswerClick(choices[0])}
                disabled={answer !== null} // Disable the button after an answer is selected
            >{choices[0]}
        </button>
        <button 
                onClick={() => handleAnswerClick(choices[1])}
                disabled={answer !== null}
            >{choices[1]}
        </button>
        <button 
                onClick={() => handleAnswerClick(choices[2])}
                disabled={answer !== null}
            >{choices[2]}
        </button>
        <button 
                onClick={() => handleAnswerClick(choices[3])}
                disabled={answer !== null}
            >{choices[3]}
        </button>

        {answer && ( // If answer is true, the user has answered, so render the feedback. Else, render nothing.
            <p className="feedback">
                {correct ? "Correct! Get ready for the next question..." : "Wrong answer! Game over!"}
            </p>
        )}

        </div>
    );
}

export default Card;