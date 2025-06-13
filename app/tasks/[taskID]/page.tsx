'use client;'
import React, { useState } from "react";
import { useState,useEffect } from "react";

interface pageProps{
    params: {taskID : string}
}

const TaskPage: React.FC = ({params}: pageProps) => {
    const [task,setTask] = useState(null);

    useEffect(() => {
            const fetchTask = async () => {
            const res = await fetch(`/api/tasks/${params.taskID}`);
            const data = await res.json();
            setTask(data)
        }

        fetchTask()
    },[params.taskID])

    return(
        <section>
            
        </section>
    );

};

export default TaskPage;