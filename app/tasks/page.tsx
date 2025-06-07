import { parentTask } from "@/types/task";
import React, { useEffect, useState } from "react";

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<parentTask[]>([]);

    useEffect(() => {
        async function fetchTasks() {
            const res = await fetch('/api/tasks');
            const data = await res.json();
            setTasks(data)
        }

        fetchTasks();
    },[]);

    return(
        <section>
            {tasks.length === 0} ? ()
        </section>
    );
}