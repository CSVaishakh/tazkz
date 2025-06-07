import React from "react";

const zeroTasks: React.FC = () => {
    return(
        <section className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
            <h1 className="text-3xl font-semibold text-gray-600 mb-6">No Existing Tasks</h1>
            <button 
                id="newTask" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
            >
                Add New Task
            </button>
        </section>
    );
};

export default zeroTasks;