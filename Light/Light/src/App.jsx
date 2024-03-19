import React, { useState, useEffect } from 'react';
import   axios from 'axios';
function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [notificationMethod, setNotificationMethod] = useState('');
  const [supervisors, setSupervisors] = useState([]); 

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhonenumberChange = (event) => {
    setPhonenumber(event.target.value);
  };

  const handleSupervisorChange = (event) => {
    setSupervisor(event.target.value);
  };

  const handleNotificationMethodChange = (event) => {
    setNotificationMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send form data to backend
    try {
      const response = await axios.post('http://localhost:8080/api/register', {
        firstName,
        lastName,
        email,
        password,
        supervisor,
        notificationMethod
      });
      alert(response.data.message);  
    } catch (error) {
      alert('Error submitting form');  
    }
  };

  useEffect(() => {
    
    fetchSupervisors();
  }, []);

  const fetchSupervisors = async () => {
    try {
      
      const response = await axios.get('http://localhost:8080/api/supervisors');
      setSupervisors(response.data);  
    } catch (error) {
      console.error('Error fetching supervisors:', error);
    }
  };

  return (
    <div className="App">
      <h1 className="note">Notification Form</h1>
      <form onSubmit={handleSubmit}>
        <div >
          <label className="label1" htmlFor="firstName">First Name:</label>
          
          <label className="label2" htmlFor="lastName">Last Name:</label>
          
        </div>
        <div  >
          <input className="input1"
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
          <input className="input2"
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
         
       
        <div  >
          <p className="para">How would you prefer to be notified?</p>
          
          <div>
         
  <div className="radioOption">
    <input className="input5"
      type="radio"
      id="emailOption"
      name="notificationMethod"
      value="Email"
      checked={notificationMethod === "Email"}
      onChange={handleNotificationMethodChange}
    />
    <label   htmlFor="emailOption">Email</label>
    <br />
    <input className="input3"
      type="text"
      id="email"
      value={email}
       
    />
  </div>
  <div className="radioOption">
    <input className="input6"
      type="radio"
      id="phoneNumberOption"
      name="notificationMethod"
      value="PhoneNumber"
      checked={notificationMethod === "PhoneNumber"}
      onChange={handleNotificationMethodChange}
    />
    <label    htmlFor="phoneNumberOption">Phone Number</label>
    <br />
    <input className="input4"
      type="tel"
      id="phonenumber"
      value={phonenumber}
      onChange={handlePhonenumberChange}
       
    />
  
  </div>
</div>
           
        </div>
        <div  >
          <label className="superr" htmlFor="supervisor">Supervisor:</label>
        
          <select  
           className="sup"
            value={supervisor}
            onChange={handleSupervisorChange}
            required
          >
            <option value="">Select Supervisor</option>
            {supervisors.map((supervisor, index) =>
             (
              <option key={index} value={supervisor}>{supervisor}</option>
            ))}
          </select>
        </div>
        
        <button className="but" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;