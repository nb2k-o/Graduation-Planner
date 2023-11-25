from bson.json_util import dumps
from bson.json_util import loads

def serialize_cursor_response(cursor):
    data = list(cursor)
    json_data = []
    for el in data:
        to_add = loads(dumps(el))
        to_add["_id"] = str(el["_id"])
        json_data.append(to_add)
    
    return json_data

def serialize_object_response(obj):
    obj["_id"] = str(obj["_id"])

    return obj