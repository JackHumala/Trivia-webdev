import os
from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from flask_cors import CORS
import datetime
#from pytz import timezone
#EST = timezone('America/New_York') 

load_dotenv()

app = Flask(__name__)
CORS(app)

# Connects to online MongoDb database
client = MongoClient(os.getenv("MONGODB_URI"))
db = client.triviatime
scores_collection = db.scores


@app.route('/api/scores', methods=['GET', 'POST'])
def handle_scores():
    # Method to get the top 50 scores 
    if request.method == 'GET':
        # sorts and gets the top 50
        top_scores = list(scores_collection.find().sort("score", -1).limit(50))
        # Convert ObjectId to string
        for score in top_scores:
            score['_id'] = str(score['_id'])
        return jsonify(top_scores)
    
    # Method to add new score to the daatabase
    elif request.method == 'POST':
        data = request.get_json()
        # checks to make sure required fields are included
        if not data or 'name' not in data or 'score' not in data:
            return jsonify({"error": "Missing name or score"}), 400
        
        # Inserts new score
        result = scores_collection.insert_one({
            "name": data['name'],
            "score": int(data['score']),
            "date": datetime.datetime.now()
        })
        
        return jsonify({"success": True, "id": str(result.inserted_id)}), 201

if __name__ == '__main__':
    app.run(debug=True)