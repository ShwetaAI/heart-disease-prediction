# ML Fullstack Web Application

## Overview
This project is a full-stack web application that integrates a **Flask** backend with a **React** frontend. The goal of the application is to predict the likelihood of heart disease using **Logistic Regression**, a machine learning model. The frontend allows users to input data, while the backend handles prediction using a pre-trained model.

### Key Features:
- **Machine Learning Model**: A **Logistic Regression** model is used for predicting the probability of heart disease.
- **React Frontend**: The frontend is built with React a javascript famework
- **API Integration**: The React app communicates with the Flask backend to make predictions based on user input.

---

## Project Structure
ML_FULLSTACK/ ├── app.py # Flask backend, serves the React app and handles prediction logic ├── heart.csv # Dataset used for training the Logistic Regression model └── frontend/ └── logistic_regression/ ├── package.json # React project configuration ├── public/ # Public files, including index.html └── src/ # React source code (components, hooks, etc.)


---

## Installation

### Prerequisites
- Python 3.x
- Node.js (for React)

### Step 1: Clone the repository
Clone the repository to your local machine:

```bash
git clone
cd ML_FULLSTACK
pip install -r requirements.txt
cd frontend/logistic_regression
npm install

### Run the Application
python app.py
npm run dev

