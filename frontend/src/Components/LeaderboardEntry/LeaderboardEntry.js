import React, { useState } from 'react';
import './LeaderboardEntry.css'; 

function LeaderboardEntry({score, onSubmit}) {
    const [name, setName] = useState(""); 

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (name.trim() === "") {
            alert("Please enter your name.");
            return;
        }
        onSubmit(name, score);
    };
    
    return (
        <div className="leaderboard-entry">
            <h1>Game Over</h1>
            <p>Your final score: {score}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Enter your name to be added to the leaderboard!</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Update the name state
                    placeholder="Your name"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LeaderboardEntry;