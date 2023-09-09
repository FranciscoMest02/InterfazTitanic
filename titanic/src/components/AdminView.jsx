import React, { useState } from 'react';

function AdminView(props) {

    const [formData, setFormData] = useState({
        Pclass: "1",
        Sex: "Male",
        Age: "",
        SibSp: "",
        Parch: "",
        Fare: "",
        Embarked: "S",
        Title: "Officer",
        Survived: "Yes",
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
        
    
        try {
            const response = await fetch('http://127.0.0.1:5000/new/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(processedData)
            });
    
            const result = await response.json();
            console.log(result);

            if (response.ok) { // This checks if the response status code is in the range 200-299
                setResponseMessage("Data uploaded correctly");
            } else {
                setResponseMessage("Error saving data");
            }


        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    }
    

    return (
        <div className="form-container">
            <h1>Administrator View</h1>
            <p>
                As an administrator, you can add new registries to feed the database.
                Once new data is added, the system will be trained again.
            </p>
            <form onSubmit={handleSubmit}>
                <label>
                    Passenger Class:
                    <select name="Pclass" value={formData.Pclass} onChange={handleInputChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
                <label>
                    Sex:
                    <select name="Sex" defaultValue="Male" value={formData.Sex} onChange={handleInputChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>
                <label>
                    Age:
                    <input type="number" name="Age" value={formData.Age} onChange={handleInputChange} step="0.1" />
                </label>
                <label>
                    Siblings/Spouses:
                    <input type="number" name="SibSp" value={formData.SibSp} onChange={handleInputChange} />
                </label>
                <label>
                    Parents/Children:
                    <input type="number" name="Parch" value={formData.Parch} onChange={handleInputChange} />
                </label>
                <label>
                    Fare:
                    <input type="number" name="Fare" value={formData.Fare} onChange={handleInputChange} step="0.01" />
                </label>
                <label>
                    Embarked:
                    <select name="Embarked" value={formData.Embarked} onChange={handleInputChange}>
                        <option value="S">S</option>
                        <option value="C">C</option>
                        <option value="Q">Q</option>
                    </select>
                </label>
                <label>
                    Title:
                    <select name="Title" value={formData.Title} onChange={handleInputChange}>
                        <option value="Officer">Officer</option>
                        <option value="Royal">Royal</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Mr">Mr</option>
                        <option value="Miss">Miss</option>
                        <option value="Master">Master</option>
                    </select>
                </label>
                <label>
                    Survived:
                    <select name="Survived" value={formData.Survived} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>

            <p id="styleMessage">{responseMessage}</p>

        </div>
    )
}

export default AdminView;
