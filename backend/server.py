from flask import Flask, request, render_template
import json
import re
import time
from pymongo.mongo_client import MongoClient
from bson.objectid import ObjectId
from utils import serialize_object_response, serialize_cursor_response
from flask_cors import CORS, cross_origin
from bson import json_util


uri = "mongodb+srv://root:admin@cluster0.j76mx.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
user_collection = client.get_database("GraduationPlanner").get_collection("User")
plan_collection = client.get_database("GraduationPlanner").get_collection("Plan")
comment_collection = client.get_database("GraduationPlanner").get_collection("Comment")
liked_plan_collection = client.get_database("GraduationPlanner").get_collection(
    "LikedPlan"
)


app = Flask(__name__, static_url_path='/static')
cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

##LANDING PAGE FRONTEND
@app.route('/')
def home():
   return render_template('landingpage.html')


@app.route('/pages/<path>')
def template_route(path):
    return render_template(path + '.html')


##AUTHENTICATION

@app.route("/signup", methods=["POST"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def signup():
    payload = request.get_json()

    name = payload["name"]
    major = payload["major"]
    grad_year = payload["grad_year"]
    school = payload["school"]
    email = payload["email"]
    password = payload["password"]

    try:
        user = user_collection.find_one({"email": email})

        if user:
            return (
                json.dumps({"error": "user already exists"}),
                200,
                {"ContentType": "application/json"},
            )

        user_collection.insert_one(
            {
                "name": name,
                "major": major,
                "grad_year": grad_year,
                "school": school,
                "email": email,
                "password": password,
            }
        )
        return json.dumps({"success": True}), 200, {"ContentType": "application/json"}

    except Exception as e:
        return json.dumps({"error": str(e)})


@app.route("/login", methods=["POST"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def login():
    payload = request.get_json()

    email = payload["email"]
    password = payload["password"]

    user = user_collection.find_one({"email": email})

    try:
        if user:
            if user["password"] == password:
                return (
                    json.dumps({"success": True}),
                    200,
                    {"ContentType": "application/json"},
                )

        return (
            json.dumps({"error": "No user with corresponding password."}),
            200,
            {"ContentType": "application/json"},
        )

    except Exception as e:
        return json.dumps({"error": str(e)})


##PROFILE


@app.route("/user_profile", methods=["GET", "OPTIONS"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def user_profile():
    email = request.args["email"]
    user = serialize_object_response(user_collection.find_one({"email": email}))

    return (
        json.dumps({"success": True, "data": user}),
        200,
        {"ContentType": "application/json"},
    )


@app.route("/created_plans", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def created_plans():
    email = request.args["email"]
    data = serialize_cursor_response(plan_collection.find({"author_email": email}))

    return (
        json.dumps({"success": True, "data": data}),
        200,
        {"ContentType": "application/json"},
    )


@app.route("/liked_plans", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def liked_plans():
    email = request.args["email"]
    liked_plan_ids = serialize_cursor_response(
        liked_plan_collection.find({"liker_email": email})
    )
    liked_plans = [
        serialize_object_response(
            plan_collection.find_one({"_id": ObjectId(plan_id["plan_id"])})
        )
        for plan_id in liked_plan_ids
    ]

    return (
        json.dumps({"success": True, "data": liked_plans}),
        200,
        {"ContentType": "application/json"},
    )


##PLANS


@app.route("/make_plan", methods=["POST"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def make_plan():
    payload = request.get_json()
    print(payload["school"])
    timestamp = int(time.time())
    title = payload["title"]
    school = payload["school"]
    major = payload["major"]
    semesters = payload["semesters"]
    description = payload["description"]
    author_name = payload["author_name"]
    author_email = payload["author_email"]
    tags = payload["tags"]
    semester_classes = payload["semester_classes"]

    plan_id = plan_collection.insert_one(
        {
            "timestamp": timestamp,
            "title": title,
            "school": school,
            "major": major,
            "semesters": semesters,
            "description": description,
            "author_name": author_name,
            "author_email": author_email,
            "tags": tags,
            "likes": 0,
            "comments": 0,
            "semester_classes": semester_classes
        }
    ).inserted_id
    return json.dumps({"success": True, "data": json.loads(json_util.dumps(plan_id)) }), 200, {"ContentType": "application/json"}



@app.route("/get_plan", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_plan():
    email = request.args["email"]
    plan_id = request.args["plan_id"]
    plan = serialize_object_response(
        plan_collection.find_one({"_id": ObjectId(plan_id)})
    )
    plan["liked"] = False
    if liked_plan_collection.find_one({"liker_email": email, "plan_id": plan_id}):
        plan["liked"] = True

    return (
        json.dumps({"success": True, "data": plan}),
        200,
        {"ContentType": "application/json"},
    )


@app.route("/toggle_like_plan", methods=["POST"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def toggle_like_plan():
    payload = request.get_json()

    email = payload["email"]
    plan_id = payload["plan_id"]

    liked = liked_plan_collection.find_one(
        {
            "plan_id": plan_id,
            "liker_email": email,
        }
    )

    if liked:
        liked_plan_collection.find_one_and_delete(
            {
                "plan_id": plan_id,
                "liker_email": email,
            }
        )
        plan_collection.find_one_and_update(
        {'_id': ObjectId(plan_id)},
        {'$inc': {'likes': -1}}
    )
    else:
        liked_plan_collection.insert_one(
            {
                "plan_id": plan_id,
                "liker_email": email,
            }
        )
        plan_collection.find_one_and_update(
        {'_id': ObjectId(plan_id)},
        {'$inc': {'likes': 1}}
        )

    return json.dumps({"success": True}), 200, {"ContentType": "application/json"}


@app.route("/comment_plan", methods=["POST"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def comment_plan():
    payload = request.get_json()

    email = payload["email"]
    plan_id = payload["plan_id"]
    text = payload["text"]

    comment_collection.insert_one(
        {"plan_id": plan_id, "author_email": email, "text": text}
    )
    
    plan_collection.find_one_and_update(
        {'_id': ObjectId(plan_id)},
        {'$inc': {'comments': 1}}
    )

    return json.dumps({"success": True}), 200, {"ContentType": "application/json"}


@app.route("/get_comments", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_comments():
    email = request.args["plan_id"]
    data = serialize_cursor_response(comment_collection.find({"plan_id": email}))

    return (
        json.dumps({"success": True, "data": data}),
        200,
        {"ContentType": "application/json"},
    )

##HOMEPAGE ENDPOINTS

@app.route("/primary_suggested_plans", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def primary_suggested_plans():
    email = request.args["email"]
    response_data = {}
    user = serialize_object_response(user_collection.find_one({"email": email}))
    response_data["plan_type"] = user["major"]
    data = serialize_cursor_response(plan_collection.find({"major": user["major"], "school": user["school"]}).limit(5))
    response_data["plans"] = data

    if len(data) == 0:
        response_data = {}
        user = serialize_object_response(user_collection.find_one({"email": email}))
        response_data["plan_type"] = user["school"]
        data = serialize_cursor_response(plan_collection.find({"school": user["school"]}).limit(3))
        response_data["plans"] = data

    return (
        json.dumps({"success": True, "data": response_data}),
        200,
        {"ContentType": "application/json"},
    )

@app.route("/secondary_suggested_plans", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def secondary_suggested_plans():
    email = request.args["email"]
    response_data = {}
    user = serialize_object_response(user_collection.find_one({"email": email}))
    response_data["plan_type"] = user["school"]
    data = serialize_cursor_response(plan_collection.find({"school": user["school"]}))
    response_data["plans"] = data

    return (
        json.dumps({"success": True, "data": response_data}),
        200,
        {"ContentType": "application/json"},
    )

@app.route("/popular_plans", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def popular_plans():
    response_data = {}
    data = serialize_cursor_response(plan_collection.find().sort({"likes": -1, "comments": -1}))
    response_data["plans"] = data

    return (
        json.dumps({"success": True, "data": response_data}),
        200,
        {"ContentType": "application/json"},
    )

## SEARCH
@app.route("/search_plans", methods=["GET"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def search_plans():
    regex_term = {"$regex" : request.args["query_term"], "$options": 'i'}
    sort_by = request.args.get("sort_by", "popular")
    school_filter = request.args.get("school", None)
    major_filter = request.args.get("major", None)
    print(school_filter, major_filter)

    if school_filter and major_filter:
        mongo_query = {"school": school_filter, "major": major_filter, "$or":[{"title": regex_term}, {"school": school_filter}, {"major": major_filter}, {"description": regex_term}, {"author_name": regex_term}, {"tags": regex_term}]}
    elif school_filter:
        mongo_query = {"school": school_filter, "$or":[{"title": regex_term}, {"major": regex_term}, {"description": regex_term}, {"author_name": regex_term}, {"tags": regex_term}]}
    elif major_filter:
        mongo_query = {"major": major_filter, "$or":[{"title": regex_term}, {"school": regex_term}, {"description": regex_term}, {"author_name": regex_term}, {"tags": regex_term}]}
    else:
        mongo_query = {"$or":[{"title": regex_term}, {"school": regex_term}, {"major": regex_term}, {"description": regex_term}, {"author_name": regex_term}, {"tags": regex_term}]}
    
    if sort_by == "date_added_new":
        data = serialize_cursor_response(plan_collection.find(mongo_query).sort([("timestamp",-1)]))
    elif sort_by == "date_added_old":
        data = serialize_cursor_response(plan_collection.find(mongo_query).sort([("timestamp")]))
    else:
        data = serialize_cursor_response(plan_collection.find(mongo_query).sort([("popular",-1)]))

    return (
        json.dumps({"success": True, "data": data}),
        200,
        {"ContentType": "application/json"},
    )

## Delete
@app.route("/remove_plan/<id>", methods=["DELETE"])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def remove_plan(id):

    try:
        result = plan_collection.find_one_and_delete({"_id": ObjectId(id)})

        return (
            json.dumps({"success": True}),
            200,
            {"ContentType": "application/json"},
        )
    except Exception as e:
        return json.dumps({"error": str(e)})


# Running app
if __name__ == "__main__":
    app.run(debug=True)
