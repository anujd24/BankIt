import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../styles/signup.css"; 

export const Signup = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        // Form validation
        if (!firstname || !lastname || !username || !password) {
            alert("Please fill in all fields."); // User-friendly alert
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                firstname,
                lastname,
                username,
                password
            });

            console.log("Sign-up successful:", response.data);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }

            navigate("/dashboard"); // Navigate to dashboard

        } catch (error) {
            console.error("Error signing up:", error.response?.data || error.message);
            setError("Error signing up: " + (error.response?.data?.message || "Please try again.")); // Show a user-friendly message
        }
    };

    return (
        <div className="cyberpunk-container">
            <div className="cyberpunk-form">
                <Heading text={"Create an Account"} className="text-3xl font-bold text-gray-800 mb-4 text-center" />
                <SubHeading text={"Fill in your details to sign up"} className="text-gray-500 mb-6 text-center" />

                {error && <div className="cyberpunk-error">{error}</div>} {/* Display error if any */}

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
                        type={showPassword ? "text" : "password"}
                        className="cyberpunk-input-container"
                    />
                    <button onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                </div>

                <div className="cyberpunk-button-container">
                    <Button
                        onClick={handleSignup}
                        text="Sign up"
                        className="w-full"
                    />
                </div>

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
