import React from "react";

const zeroTasks: React.FC = () => {
    return(
        <section>
            <h1>No Existing Tasks</h1>
            <h2>Add a new Task</h2>
            <button id = 'newTask'>Add New Task</button>
        </section>
    );
};

export default zeroTasks;