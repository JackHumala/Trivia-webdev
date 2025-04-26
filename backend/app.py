import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import datetime

# Load variables from .env file
load_dotenv()

app = Flask(__name__)

# === CORS Setup ===
# Only allow your React dev server origin on /api/* endpoints
CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:3000"}},
    supports_credentials=True
)

# Connect to MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client.triviatime
leaderboard_collection = db.scores


@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    # Fetch top 50 scores, sorted descending
    scores = list(
        leaderboard_collection
        .find()
        .sort("score", -1)
        .limit(50)
    )

    # Convert ObjectId and datetime to strings
    for score in scores:
        score["_id"] = str(score["_id"])
        if "date" in score and isinstance(score["date"], datetime.datetime):
            score["date"] = score["date"].isoformat()

    return jsonify(scores), 200


@app.route('/api/leaderboard', methods=['POST'])
def add_score():
    data = request.get_json(force=True)
    name = data.get("name")
    score_val = data.get("score")

    if not name or score_val is None:
        return jsonify({"error": "Missing name or score"}), 400

    result = leaderboard_collection.insert_one({
        "name": name,
        "score": score_val,
        "date": datetime.datetime.utcnow()
    })

    return jsonify({"success": True, "id": str(result.inserted_id)}), 201


if __name__ == '__main__':
    # If you still see other services on 5000, switch to 5001 here and adjust your React proxy
    app.run(port=5000, debug=True)
