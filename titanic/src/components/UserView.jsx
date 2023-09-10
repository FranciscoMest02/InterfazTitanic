import React, { useState } from 'react';

function UserView(props) {

    const [formData, setFormData] = useState({
        Pclass: "1",
        Sex: "Male",
        Age: "",
        SibSp: "",
        Parch: "",
        Fare: "",
        Embarked: "S",
        Title: "Officer",
    });
    const [responseMessage, setResponseMessage] = useState("");


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'Age' || name === 'Fare' ? parseFloat(value) : 
                    name === 'Pclass' || name === 'SibSp' || name === 'Parch' ? parseInt(value, 10) :  
                    value
        }));
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const processedData = {
            ...formData,
            Survived: formData.Survived === 'Yes' ? 1 : 0
        };
        
        console.log(processedData)
    
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(processedData)
            });
    
            const result = await response.json();
            console.log(result.prediction);

            if (response.ok) { // This checks if the response status code is in the range 200-299
                setResponseMessage(result.prediction);
            } else {
                setResponseMessage(result.prediction);
            }


        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    }
    

    return (
        <div className="form-container">
            <h1>User Panel</h1>
            <p>
                As an common user, you can use the model to predict if a passenger is live or not entering the required information in the form.
            </p>
            <form onSubmit={handleSubmit}>
                <label>
                    Passenger Class:
                    <select name="Pclass" value={formData.Pclass} onChange={handleInputChange} required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
                <label>
                    Sex:
                    <select name="Sex" defaultValue="Male" value={formData.Sex} onChange={handleInputChange} required>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>
                <label>
                    Age:
                    <input type="number" name="Age" value={formData.Age} onChange={handleInputChange} step="0.1" required/>
                </label>
                <label>
                    Siblings/Spouses:
                    <input type="number" name="SibSp" value={formData.SibSp} onChange={handleInputChange} required/>
                </label>
                <label>
                    Parents/Children:
                    <input type="number" name="Parch" value={formData.Parch} onChange={handleInputChange} required/>
                </label>
                <label>
                    Fare:
                    <input type="number" name="Fare" value={formData.Fare} onChange={handleInputChange} step="0.01" required/>
                </label>
                <label>
                    Embarked:
                    <select name="Embarked" value={formData.Embarked} onChange={handleInputChange} required>
                        <option value="S">S</option>
                        <option value="C">C</option>
                        <option value="Q">Q</option>
                    </select>
                </label>
                <label>
                    Title:
                    <select name="Title" value={formData.Title} onChange={handleInputChange} required>
                        <option value="Officer">Officer</option>
                        <option value="Royal">Royal</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Mr">Mr</option>
                        <option value="Miss">Miss</option>
                        <option value="Master">Master</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>

            <p id="styleMessage">{responseMessage}</p>

        </div>
    )
}

export default UserView;
