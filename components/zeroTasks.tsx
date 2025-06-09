import React, { useState } from "react";
import ReadParentTask from "./readParentTask";

const ZeroTasks: React.FC = () => {
    const [ showForm, setShowForm] = useState(false);
    const  handleClick = () => {
        setShowForm(true);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }

    return(
        <section className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">No Existing Tasks</h1>
            <button 
                id="newTask" 
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-green-300"
                onClick={handleClick}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Task
            </button>
            {showForm && <ReadParentTask onClose={handleCloseForm} />}
        </section>
    );
};

export default ZeroTasks;