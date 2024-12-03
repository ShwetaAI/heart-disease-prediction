import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS

# Load the dataset
file_path = 'sample_data/heart.csv'  # Adjust the file path as necessary
data = pd.read_csv(file_path)

# Split the data into features and target
X = data.drop('target', axis=1)  # Features
y = data['target']  # Target variable

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature scaling (important for logistic regression)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Initialize and train the logistic regression model with class weights to handle class imbalance
model = LogisticRegression(max_iter=1000, class_weight='balanced')
model.fit(X_train_scaled, y_train)

# Evaluate the model on the test data
y_pred = model.predict(X_test_scaled)
print("Classification Report:")
from sklearn.metrics import classification_report, confusion_matrix
print(classification_report(y_test, y_pred))

print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Initialize Flask app
app = Flask(__name__)

CORS(app)

# Define the prediction route with custom threshold
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data from the request (in JSON format)
        data = request.get_json()
        print(f"Received data: {data}")  # Debugging: print the incoming data

        # Ensure all features are provided (check if the number of features is correct)
        if len(data) != X.shape[1]:
            print(f"Error: Expected {X.shape[1]} features, got {len(data)}")
            return jsonify({"error": f"Invalid number of features. Expected {X.shape[1]}, got {len(data)}"}), 400

        # Convert the data into the required format (list of values)
        features = [list(data.values())]
        print(f"Features for prediction: {features}")  # Debugging: print features being passed to model

        # Scale the input features (same scaler used for training)
        features_scaled = scaler.transform(features)
        print(f"Scaled features for prediction: {features_scaled}")  # Debugging: print scaled features

        # Get prediction probabilities for both classes (0 and 1)
        probs = model.predict_proba(features_scaled)
        print(f"Prediction probabilities: {probs}")  # Debugging: print the prediction probabilities

        # Get the predicted class (0 or 1)
        prediction = model.predict(features_scaled)
        print(f"Prediction structure: {prediction}, Type: {type(prediction)}")

        # Get the probability for class 1 (Heart Disease)
        prob_heart_disease = probs[0][1]  # The probability of class 1
        print(f"Probability of Heart Disease: {prob_heart_disease}")

        # Adjust the message based on probability
        if prob_heart_disease > 0.7:
            result = {
                "prediction": f"You could have Heart Disease. Probability: {prob_heart_disease:.2f}"
            }
        elif prob_heart_disease > 0.4:
            result = {
                "prediction": f"The chances are moderate. Probability: {prob_heart_disease:.2f}"
            }
        else:
            result = {
                "prediction": f"The chances are very less that you have heart disease. Probability: {prob_heart_disease:.2f}"
            }

        return jsonify(result)  # Always return a response in JSON format

    except Exception as e:
        print(f"Error: {e}")  # Debugging: print the error if something goes wrong
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500



# Run the app
if __name__ == '__main__':
    app.run(port=8000, host='0.0.0.0', debug=True)
