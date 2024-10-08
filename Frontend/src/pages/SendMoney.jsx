import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const SendMoney = () => {
    console.log("SendMoney component is rendering");

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    console.log("Query Parameters:", { id, name });

    const [amount, setAmount] = useState(0);

    if (!id || !name) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <h2 className="text-2xl font-bold text-red-500">Invalid recipient information.</h2>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="max-w-lg w-full bg-white shadow-2xl rounded-lg p-8">
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
        // Ensure amount is defined before making the API call
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
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
        .then(response => {
            console.log("Transfer successful", response.data);
            alert("Transfer initiated successfully!");
            // Optionally reset the form or update the UI here
        })
        .catch(error => {
            console.error("Error during transfer", error);
            alert("Failed to initiate the transfer. Please try again.");
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