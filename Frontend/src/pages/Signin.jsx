import React, { useState } from "react";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import "../styles/cyberpunk.css";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const decodeJWT = (token) => {
    const base64Url = token.split('.')[1]; // Get the second part (payload)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Decode base64 URL-safe
    const decodedData = JSON.parse(atob(base64)); // Decode and parse the JSON
    return decodedData;
  };
  
  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      });
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        
        // Decode the token without an external library
        const decodedToken = decodeJWT(response.data.token);
        console.log("User ID set:", decodedToken.userId);
        
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error signing in:", error.response?.data || error.message);
      setError("Sign-in failed. Please check your credentials.");
    }
  };

  return (
    <div className="cyberpunk-container">
      <div className="cyberpunk-form">
        <Heading text={"Sign In"} />
        <SubHeading text={"Enter your credentials to access your account"} />
        {error && <p className="cyberpunk-error">{error}</p>}
        <div className="cyberpunk-input-container">
          <InputBox
            placeholder="Enter your username"
            label={"Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="cyberpunk-input-container">
          <InputBox
            placeholder="Enter your password"
            label={"Password"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="cyberpunk-button-container">
          <Button text={"Sign In"} onClick={handleSignIn} />
        </div>

        <div className="cyberpunk-bottom-warning">
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
};
