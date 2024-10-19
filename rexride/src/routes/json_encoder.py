import json
from google.cloud import firestore
from datetime import datetime
 
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()  # Convert datetime to string
        if isinstance(obj, firestore.GeoPoint):
            return {'latitude': obj.latitude, 'longitude': obj.longitude}  # Convert GeoPoint to dict
        return super().default(obj)