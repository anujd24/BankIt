export const Balance = ({ value }) => {
    return (
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="font-serif text-xl text-gray-700 tracking-wide">
                Your Balance
            </div>
            <div className="ml-6 text-2xl font-semibold text-gray-900">
                Rs {value.toLocaleString()}
            </div>
        </div>
    );
};
