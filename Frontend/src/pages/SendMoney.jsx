import { useSearchParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";

export const SendMoney = () => {
    const location = useLocation();  // Access the current URL
    const queryParams = new URLSearchParams(location.search); 
    const id = queryParams.get("id");
    const name = queryParams.get("name");
    const [amount, setAmount] = useState(0);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            {/* Card container */}
            <div className="max-w-lg w-full bg-white shadow-2xl rounded-lg p-8">
                {/* Title */}
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold text-gray-800">Send Money</h2>
                </div>
                {/* Recipient Info */}
                <div className="flex items-center space-x-4 mb-8">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-2xl font-semibold text-white">
                            {name[0].toUpperCase()}
                        </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-700">{name}</h3>
                </div>
                {/* Form */}
                <div className="space-y-6">
                    {/* Amount Input */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-600 mb-2"
                            htmlFor="amount"
                        >
                            Amount (in Rs)
                        </label>
                        <input
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            className="w-full border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                            id="amount"
                            placeholder="Enter amount"
                        />
                    </div>
                    {/* Transfer Button */}
                    <button
                        onClick={() => {
                            axios.post("http://localhost:3000/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token") 
                                }
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
