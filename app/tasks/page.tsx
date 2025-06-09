'use client'

import React from "react";
import { useState, useEffect } from "react";
import { parentTask } from "@/types/task";
import Link from "next/link";
import ZeroTasks from "@/components/zeroTasks";

const TasksLayout: React.FC = () => {
    const [ tasks, setTasks ] = useState<parentTask[]>([])
    useEffect(()=>{
        const fetchTasks = async() => {
            const res = await fetch('/api/tasks');
            const data = await res.json();
            setTasks(data);
        }

        fetchTasks()
    },[]);

    return(
        <section>
            <div>
                {tasks.length === 0 ? (
                    <ZeroTasks/>
                ) : (
                        tasks.map((task)=>(
                            <Link key={task.id} href={`/task/${task.id}`}>
                                <div >
                                    <h3>{task.name}</h3>
                                    <h6>{task.description}</h6>
                                    <p>Deadline : {task.deadline}</p>
                                    <p>Child Tasks : {task.childTasks?.length}</p>
                                    <p>Notes : </p>
                                    <ul>
                                        {task.notes?.map((note, index) => (
                                            <li key={index}>{note}</li>
                                        )) || <li>No notes added</li>}
                                    </ul>
                                </div> 
                            </Link>
                        ))
                    )
                }
            </div>
        </section>
    );
};

export default TasksLayout;