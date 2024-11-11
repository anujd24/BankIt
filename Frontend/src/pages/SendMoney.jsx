import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "react-lottie";
import transferMoney from "../assets/transfer-animation.json"; // First Lottie animation file
import leftSideAnimation from "../assets/leftSide-Animation.json"; // Second Lottie animation for the left side
import rightSideAnimation from "../assets/rightSide-Animation.json"; // Third Lottie animation for the right side

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    const [amount, setAmount] = useState(0);
    const navigate = useNavigate(); // Initialize navigate hook

    // Lottie animation settings
    const defaultOptions = {
        loop: true,
        autoplay: true, // Animation will play automatically
        animationData: transferMoney, // First Lottie animation (background)
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    // Lottie animation for the left side
    const leftSideOptions = {
        loop: true,
        autoplay: true,
        animationData: leftSideAnimation, // Second Lottie animation (left side)
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    // Lottie animation for the right side
    const rightSideOptions = {
        loop: true,
        autoplay: true,
        animationData: rightSideAnimation, // Third Lottie animation (right side)
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    if (!id || !name) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <h2 className="text-2xl font-bold text-red-500">Invalid recipient information.</h2>
            </div>
        );
    }

    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gray-50">
            {/* Lottie Animation in Background */}
            <div className="absolute inset-0 z-0">
                <Lottie options={defaultOptions} height={750} width={900} />
            </div>

            {/* Lottie Animation on the Left Side */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                <Lottie options={leftSideOptions} height={300} width={300} />
            </div>

            {/* Lottie Animation on the Right Side */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                <Lottie options={rightSideOptions} height={300} width={300} />
            </div>

            <div className="relative z-10 max-w-lg w-full bg-white shadow-2xl rounded-lg p-8">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold text-gray-800">Send Money</h2>
                </div>
                <div className="flex items-center space-x-4 mb-8">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-2xl font-semibold text-white">
                            {name ? name[0].toUpperCase() : ""}
                        </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-700">{name}</h3>
                </div>
                <div className="space-y-6">
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-600 mb-2"
                            htmlFor="amount"
                        >
                            Amount (in Rs)
                        </label>
                        <input
                            onChange={(e) => setAmount(Number(e.target.value))}
                            type="number"
                            className="w-full border border-gray-300 rounded-md p-3 text-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                            id="amount"
                            placeholder="Enter amount"
                        />
                    </div>
                    <button
                        onClick={() => {
                            if (!amount || amount <= 0) {
                                return; // Prevents navigating if amount is invalid
                            }

                            // Make the API call to initiate the transfer
                            axios.post("http://localhost:3000/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                            .then(() => {
                                // Navigate to SuccessPage on successful transfer
                                navigate("/success");
                            })
                            .catch(error => {
                                console.error("Error during transfer", error);
                                // Optional: handle errors if needed, but avoid alerts to keep page clean
                            });
                        }}
                        className="w-full bg-green-600 text-white rounded-lg py-3 text-lg font-semibold hover:bg-green-700 transition"
                    >
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    );
};
