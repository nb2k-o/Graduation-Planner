from flask import Flask, request
import json
from pymongo.mongo_client import MongoClient


uri = "mongodb+srv://root:admin@cluster0.j76mx.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
user_collection = client.get_database("GraduationPlanner").get_collection("User")

app = Flask(__name__)

@app.route('/signup', methods=["POST"])
def signup():
    payload = request.get_json()

    name = payload["name"]
    major = payload["major"]
    grad_year = payload["grad_year"]
    school = payload["school"]
    email = payload["email"]
    password = payload["password"]

    try:
        user = user_collection.find_one({"email":email})

        if user:
            return json.dumps({'error':"user already exists"}), 200, {'ContentType':'application/json'} 

        user_collection.insert_one({"name":name, "major":major, "grad_year":grad_year, "school":school, "email":email, "password":password})
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

    except Exception as e:
        return json.dumps({'error': str(e)})


@app.route('/login', methods=["POST"])
def login():
    payload = request.get_json()
    
    email = payload["email"]
    password = payload["password"]

    user = user_collection.find_one({"email":email})

    try:
        if user:
            if user["password"] == password:
                return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

        return json.dumps({'error':"No user with corresponding password."}), 200, {'ContentType':'application/json'} 
    
    except Exception as e:
        return json.dumps({'error': str(e)})

     
# Running app
if __name__ == '__main__':
    app.run(debug=True)