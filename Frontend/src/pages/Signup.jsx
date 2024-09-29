import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css"; // Include the signup styles

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        // Form validation
        if (!firstName || !lastName || !username || !password) {
            alert("Please fill in all fields."); // User-friendly alert
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password,
            });

            // Handle the response based on your API structure
            console.log("Sign-up successful:", response.data);

            // Optionally auto-login the user after sign-up
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }

            // Navigate to dashboard after successful sign-up
            navigate("/dashboard");
        } catch (error) {
            // Handle error response and give feedback to the user
            console.error("Error signing up:", error.response?.data || error.message);
            setError("Error signing up: " + (error.response?.data?.message || "Please try again.")); // Show a user-friendly message
        }
    };

    return (
        <div className="cyberpunk-container">
            <div className="cyberpunk-form">
                {/* Heading */}
                <Heading text={"Create an Account"} className="text-3xl font-bold text-gray-800 mb-4 text-center" />
                <SubHeading text={"Fill in your details to sign up"} className="text-gray-500 mb-6 text-center" />
                
                {/* Error Message */}
                {error && <div className="cyberpunk-error">{error}</div>}

                {/* Input Fields */}
                <div className="space-y-4">
                    <InputBox
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter First Name"
                        label="First Name"
                        className="cyberpunk-input-container"
                    />
                    <InputBox
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter Last Name"
                        label="Last Name"
                        className="cyberpunk-input-container"
                    />
                    <InputBox
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                        label="Username"
                        className="cyberpunk-input-container"
                    />
                    <InputBox
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        label="Password"
                        type="password"
                        className="cyberpunk-input-container"
                    />
                </div>
    
                {/* Sign up Button */}
                <div className="cyberpunk-button-container">
                    <Button
                        onClick={handleSignup}
                        text="Sign up"
                        className="w-full"
                    />
                </div>
    
                {/* Sign-in Redirection */}
                <div className="cyberpunk-bottom-warning">
                    <BottomWarning
                        label="Already have an account?"
                        buttonText="Sign in"
                        to="/signin"
                    />
                </div>
            </div>
        </div>
    );
};
