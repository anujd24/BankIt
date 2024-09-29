import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/users.css"; // Import the new styles

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user);
            });
    }, [filter]);

    return (
        <>
            <div className="font-serif text-3xl text-gray-100 tracking-wide mt-8 mb-4 text-center">
                Users
            </div>
            <div className="my-4">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="search-input"
                />
            </div>
            <div className="users-container space-y-4">
                {users.map(user => (
                    <User key={user._id} user={user} />
                ))}
            </div>
        </>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="user-card transition-transform hover:shadow-lg hover:scale-105">
            <div className="user-info">
                <div className="avatar">
                    {user.firstname[0]}
                </div>
                <div className="user-details">
                    <div className="user-name">
                        {user.firstname} {user.lastname}
                    </div>
                    <div className="user-email">
                        {user.email}
                    </div>
                </div>
            </div>
            <Button 
                onClick={(e) => {navigate("/send?id=" + user._id + "&name=" + user.firstname);
                    
                } }
    
                text={"Send Money"} 
                className="send-money-button"
            />
        </div>
    );
}
