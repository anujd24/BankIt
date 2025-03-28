import { Appbar } from "../components/Appbar";
import { Users } from "../components/Users";
import { useState } from "react";

export const Dashboard = () => {
    const [balance, setBalance] = useState(""); // Initial balance state

    return (
        <div className="relative bg-gradient-to-r from-green-400 to-blue-500 min-h-screen overflow-y-auto">
            <Appbar />

            <div className="container mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl relative z-10">
                <div className="mb-8">
                    <h2 className="font-serif text-3xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
                    <input
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)} // Update balance on input change
                        className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 focus:outline-none focus:border-green-500 transition"
                        placeholder="Enter total amount"
                    />
                </div>

                
                {balance && balance > 0 ? (
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">User Management</h3>
                        <div className="max-h-80 overflow-y-auto"> 
                            <Users />
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-700 mt-8">
                        Please enter your total balance to access User Management and transfer functionality.
                    </div>
                )}
            </div>
        </div>
    );
};
