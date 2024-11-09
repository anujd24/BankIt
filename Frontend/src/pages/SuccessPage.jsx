// src/SuccessPage.js
import React from "react";
import { Lottie } from "lottie-react";
import successAnimation from "../assets/success-animation.json"; // adjust path if needed

export const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-center">
      <h1 className="text-2xl font-semibold text-green-600 mb-4">
        Money Transferred Successfully!
      </h1>
      <Lottie 
        animationData={successAnimation} 
        loop={false} 
        style={{ width: 250, height: 250 }} 
      />
      <p className="text-lg text-gray-700 mt-2">
        Your transaction was completed successfully.
      </p>
      <button 
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        onClick={() => window.location.href = "/dashboard"}
      >
        Click here to go to the dashboard page
      </button>
    </div>
  );
};


