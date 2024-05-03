import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // Changed from history to navigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/", { // Changed the URL to the login endpoint
        email,
        password
      });

      if (res.data === "exist") { // Changed assignment operator to comparison operator
        navigate("/home", { state: { id: email } }); // Navigate to home page if user exists
      } else if (res.data === "notexist") { // Changed assignment operator to comparison operator
        alert("User has not signed up"); // Show alert if user has not signed up
      }
    } catch (error) {
      alert("Wrong details. Please try again."); // Show alert for any errors
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}> {/* Changed action to onSubmit */}
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button> {/* Changed input type to button and added type="submit" */}
      </form>

      <br />
      <p>Don't have an account? <Link to="/signup">Sign Up here</Link></p> {/* Changed from "SignUp page" to "Sign Up here" */}
    </div>
  );
}

export default Login;
