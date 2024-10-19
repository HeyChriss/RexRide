from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore, auth
import os
import json
from dotenv import load_dotenv
from json_encoder import CustomJSONEncoder  # Import the custom encoder from the separate file
from flask_cors import CORS
from firebase_admin import auth
import requests
 
load_dotenv()
cred = credentials.Certificate(os.getenv('FIREBASE_CERTIFICATE_PATH'))
API_KEY = os.getenv("FIREBASE_API_KEY")
 
app = Flask(__name__)
CORS(app)
 
# Initialize Firebase Admin SDK
firebase_admin.initialize_app(cred)

 
# Firestore client
db = firestore.client()
 
# POST method to add a new User
@app.route("/api/add_user", methods=["POST"])
def add_user():
    try:
        # Parse the request JSON body
        data = request.get_json()
 
        # Validate required fields
        required_fields = ["phone_number", "email", "first_name", "last_name", "current_location","password"] # Added for authentication
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Field {field} is missing"}), 400
 
        # Extract user data from the request
        phone_number = data.get("phone_number")
        email = data.get("email")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        current_location = data.get("current_location")  # Should include latitude and longitude
        password = data.get("password") # Added for authentication
 
        # Validate that current_location is in the correct format
        if not isinstance(current_location, dict) or "latitude" not in current_location or "longitude" not in current_location:
            return jsonify({"error": "Invalid current_location format. Expected: {latitude: x, longitude: y}"}), 400
 
        # Create a GeoPoint object for the current location
        location = firestore.GeoPoint(current_location["latitude"], current_location["longitude"])
 
        # Prepare user data to store in Firestore
        user_data = {
            "phone_number": phone_number,
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "current_location": location
        }

        # Create the user in Firebase Authentication
        new_auth_user = auth.create_user(
            email = email,
            password = password 
        )
 
        # When adding a user, use email as the document ID
        db.collection('user').document(email).set(user_data)

        return jsonify({"message": "User account created successfully!"}), 201
    # Catch for auth.EmailAlreadyExistsError to provide a more informative error message if the email is already in use
    except auth.EmailAlreadyExistsError:
        return jsonify({"error": "The email address is already in use by another account."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Core function to add a ride to Firestore
def add_ride_to_db(plate, seats, pickup, destination, price, from_location, to_location, date_and_time, status, vehicle, driver):
    try:
        # Validate required fields
        if not (plate and seats and pickup and destination and price and from_location and to_location and date_and_time and vehicle and driver):
            return {"error": "Some required fields are missing"}, 400
 
        # Prepare ride data to store in Firestore
        ride_data = {
            "plate": plate,
            "seats": seats,
            "pickup": pickup,
            "from": from_location,
            "to": to_location,
            "destination": destination,
            "price": price,
            "date_and_time": date_and_time,
            "status": status,
            "vehicle": vehicle,
            "driver": driver  # Add the driver name to the ride data
        }
 
        # Add the new ride to the Firestore 'rides' collection
        db.collection("ride").add(ride_data)
 
        return {"message": "Ride added successfully!"}, 201
 
    except Exception as e:
        return {"error": str(e)}, 500


# POST method to add a new Ride via HTTP request
@app.route("/api/add_ride", methods=["POST"])
def add_ride():
    try:
        # Parse the request JSON body
        data = request.get_json()
 
        # Validate required fields (include "driver" in the required fields)
        required_fields = ["plate", "seats", "pickup", "destination", "price", "from", "to", "date_and_time", "status", "vehicle", "driver"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Field {field} is missing"}), 400
 
        # Call the internal function to add the ride
        response, status_code = add_ride_to_db(
            plate=data.get("plate"),
            seats=data.get("seats"),
            pickup=data.get("pickup"),
            destination=data.get("destination"),
            price=data.get("price"),
            from_location=data.get("from"),
            to_location=data.get("to"),
            date_and_time=data.get("date_and_time"),
            status=data.get("status"),
            vehicle=data.get("vehicle"),
            driver=data.get("driver")  # Pass the driver name to the internal function
        )
 
        return jsonify(response), status_code
 
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# GET method to retrieve rides based on search parameters
@app.route("/api/get_active_rides", methods=["GET"])
def get_active_rides():
    try:
        rides = []
     
        rides_ref = db.collection("ride")
        query = rides_ref.where("status","==", True) # potentially might be a false truth since db values are 'true'
        ride_docs = query.stream()
 
        for doc in ride_docs:
            rides.append(doc.to_dict())  # Convert Firestore doc to dictionary
 
        # If no rides are found, return a helpful message
        if not rides:
            return jsonify({"message": "No rides found"}), 404
 
        # Return the matching rides
        return jsonify(rides), 200
 
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/users/email/<email>", methods=["GET"])
def get_user_by_email(email):
    try:
        # Get the user document using the email as the document ID
        user_ref = db.collection('user').document(email)
        user_doc = user_ref.get()

        # Check if the document exists
        if user_doc.exists:
            user_data = user_doc.to_dict()

            # Convert the GeoPoint to a serializable format
            if "current_location" in user_data and isinstance(user_data["current_location"], firestore.GeoPoint):
                user_data["current_location"] = {
                    "latitude": user_data["current_location"].latitude,
                    "longitude": user_data["current_location"].longitude
                }

            return jsonify(user_data), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        # Log the exception for debugging
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    # Firebase login URL
    login_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}"
    payload = {
        'email': email,
        'password': password,
        'returnSecureToken': True
    }

    try:
        # Send the request to Firebase Authentication
        response = requests.post(login_url, json=payload)
        response.raise_for_status()  # Raises an error for non-2xx responses

        # Parse the response to get the ID token
        id_token = response.json().get('idToken')

        if id_token:
            # Login successful
            return jsonify({'message': 'Login successful', 'id_token': id_token}), 200
        else:
            # Login failed without a specific error message
            return jsonify({'error': 'Login failed. Please try again.'}), 401

    except requests.exceptions.HTTPError as http_err:
        # Handle known HTTP errors from Firebase response
        error_message = response.json().get('error', {}).get('message', str(http_err))
        if 'EMAIL_NOT_FOUND' in error_message:
            return jsonify({'error': 'Email not found. Please check your email address.'}), 401
        elif 'INVALID_PASSWORD' in error_message:
            return jsonify({'error': 'Incorrect password. Please try again.'}), 401
        elif 'USER_DISABLED' in error_message:
            return jsonify({'error': 'This user account has been disabled.'}), 403
        elif 'TOO_MANY_ATTEMPTS_TRY_LATER' in error_message:
            return jsonify({'error': 'Too many unsuccessful login attempts. Please try again later.'}), 429
        else:
            # Generic error message for any other HTTP errors
            return jsonify({'error': error_message}), 401
    except Exception as err:
        # Handle any other exceptions
        return jsonify({'error': str(err)}), 500

if __name__ == '__main__':
    app.run(debug=True)