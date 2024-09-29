import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
// import ParticleBackground from '../components/ParticleBackground';

export const Dashboard = () => {
    return (
        <div className="relative bg-gradient-to-r from-green-400 to-blue-500 min-h-screen">
            {/* Particle Background */}
            {/* <ParticleBackground /> */}

            {/* Appbar at the top */}
            <Appbar />

            <div className="container mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl relative z-10">
                <div className="mb-8">
                    <h2 className="font-serif text-3xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
                    <Balance value={"10,000"} />
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">User Management</h3>
                    <Users />
                </div>
            </div>
        </div>
    );
};
