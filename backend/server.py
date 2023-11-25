from flask import Flask, request
import json
from pymongo.mongo_client import MongoClient
from utils import serialize_object_response, serialize_cursor_response



uri = "mongodb+srv://root:admin@cluster0.j76mx.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
user_collection = client.get_database("GraduationPlanner").get_collection("User")
plan_collection = client.get_database("GraduationPlanner").get_collection("Plan")
comment_collection = client.get_database("GraduationPlanner").get_collection("Comment")


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

@app.route('/user_profile', methods=["GET"])
def user_profile():
    email = request.args['email']
    user = serialize_object_response(user_collection.find_one({"email":email}))

    return json.dumps({'success':True, 'data': user}), 200, {'ContentType':'application/json'}

@app.route('/created_plans', methods=["GET"])
def created_plans():
    email = request.args['email']
    data = serialize_cursor_response(plan_collection.find({"author_email":email}))

    return json.dumps({'success':True, 'data': data}), 200, {'ContentType':'application/json'}

     
# Running app
if __name__ == '__main__':
    app.run(debug=True)