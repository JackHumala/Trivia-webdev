import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import datetime

# Load variables from .env file
load_dotenv() 
app = Flask(__name__)
CORS(app) 

# Connects to online MongoDB database
client = MongoClient(os.getenv("MONGO_URI"))
db = client.triviatime
leaderboard_collection = db.scores


# GET Method. Fetches the top 50 scores
@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    scores = list(leaderboard_collection.find().sort("score", -1).limit(50))
    
    # Convert ObjectId to string for JSON
    for score in scores:
        score["_id"] = str(score["_id"])
    
    return jsonify(scores)

# POST Method. To add scores to database.
@app.route('/api/leaderboard', methods=['POST'])
def add_score():
    data = request.get_json()
    if not data or 'name' not in data or 'score' not in data:
        return jsonify({"error": "Missing name or score"}), 400
    
    # Insertss new score
    result = leaderboard_collection.insert_one({
        "name": data["name"],
        "score": data["score"],
        "date": datetime.datetime.now()
    })
    
    return jsonify({"success": True, "id": str(result.inserted_id)}), 201

if __name__ == '__main__':
    app.run(port=5000, debug=True)