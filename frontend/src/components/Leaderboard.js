import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        setScores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // NOT FINISHED
  const addScore = async (name, score) => {
    try {
      const response = await fetch('http://localhost:5000/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, score }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add score');
      }
      
      // Refresh leaderboard after adding new score
      const updatedResponse = await fetch('http://localhost:5000/api/leaderboard');
      const updatedData = await updatedResponse.json();
      setScores(updatedData);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error: {error}</div>;

  // Display
  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
            <th>RANK</th>
            <th>NAME</th>
            <th>SCORE</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score._id}>
              <td>{index + 1}</td>
              <td>{score.name}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;