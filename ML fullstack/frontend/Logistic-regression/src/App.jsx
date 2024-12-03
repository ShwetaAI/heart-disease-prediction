import React, { useState } from "react";
import './App.css';

function App() {
  // State to hold form input values
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });

  // State for displaying the prediction result
  const [predictionResult, setPredictionResult] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to Flask backend
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setPredictionResult(data.prediction);  // Update the prediction result in state
    } catch (error) {
      console.error("Error making prediction:", error);
      setPredictionResult("Error: Could not fetch prediction");
    }
  };

  return (
    <div className="App">
      <h1>Heart Disease Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Sex (1 for male, 0 for female):</label>
          <input type="number" name="sex" value={formData.sex} onChange={handleChange} required />
        </div>
        <div>
          <label>Chest Pain Type (cp):</label>
          <input type="number" name="cp" value={formData.cp} onChange={handleChange} required />
        </div>
        <div>
          <label>Resting Blood Pressure (trestbps):</label>
          <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} required />
        </div>
        <div>
          <label>Cholesterol (chol):</label>
          <input type="number" name="chol" value={formData.chol} onChange={handleChange} required />
        </div>
        <div>
          <label>Fasting Blood Sugar (fbs):</label>
          <input type="number" name="fbs" value={formData.fbs} onChange={handleChange} required />
        </div>
        <div>
          <label>Resting Electrocardiographic Result (restecg):</label>
          <input type="number" name="restecg" value={formData.restecg} onChange={handleChange} required />
        </div>
        <div>
          <label>Maximum Heart Rate (thalach):</label>
          <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} required />
        </div>
        <div>
          <label>Exercise Induced Angina (exang):</label>
          <input type="number" name="exang" value={formData.exang} onChange={handleChange} required />
        </div>
        <div>
          <label>Oldpeak:</label>
          <input type="number" name="oldpeak" value={formData.oldpeak} onChange={handleChange} required />
        </div>
        <div>
          <label>Slope of Peak Exercise ST Segment (slope):</label>
          <input type="number" name="slope" value={formData.slope} onChange={handleChange} required />
        </div>
        <div>
          <label>Number of Major Vessels Colored by Fluoroscopy (ca):</label>
          <input type="number" name="ca" value={formData.ca} onChange={handleChange} required />
        </div>
        <div>
          <label>Thalassemia (thal):</label>
          <input type="number" name="thal" value={formData.thal} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Prediction Result:</h2>
        <p>{predictionResult}</p>
      </div>
      <div>
        <h2>Made By Shweta Prachand and Prarthna</h2>
      </div>
    </div>
  );
}

export default App;
