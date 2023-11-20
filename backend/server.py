from flask import Flask, request
import json
from pymongo.mongo_client import MongoClient


uri = "mongodb+srv://root:admin@cluster0.j76mx.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
user_collection = client.get_database("GraduationPlanner").get_collection("User")

app = Flask(__name__)

@app.route('/signup', methods=["POST"])
def signup():
    name = request.form.get("name", None)
    major = request.form.get("major", None)
    grad_year = request.form.get("grad_year", None)
    school = request.form.get("school", None)
    email = request.form.get("email", None)
    password = request.form.get("password", None)

    user_collection.insert_one({"name":name, "major":major, "grad_year":grad_year, "school":school, "email":email, "password":password})


    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

@app.route('/login', methods=["POST"])
def login():
    email = request.form.get("email", None)
    password = request.form.get("password", None)

    user = user_collection.find_one({"email":email})
    if user:
        if user["password"] == password:
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

    return json.dumps({'error':"No username with corresponding password."}), 400, {'ContentType':'application/json'} 

     
# Running app
if __name__ == '__main__':
    app.run(debug=True)