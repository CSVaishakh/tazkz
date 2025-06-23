'use client';
import { ChildTaskHeader } from "@/components/header";
import { childTask } from "@/types/task";
import React, { useEffect, useState, use } from "react";

interface ChildTaskPageProps{
    params: Promise<{ parentID: string, childID: string }>;
}

const ChildTask: React.FC<ChildTaskPageProps> = ({params}) => {
    const { parentID, childID } = use(params); 
    const [task, setTask] = useState<childTask>({
        id : "",
        name : "",
        description : "",
        progress : "",
        deadline : "",
        parentTask : "",
        notes : []
    });

    const fetchData = async () => {
        const res = await fetch(`/api/tasks/${parentID}/${childID}`);
        const data = await res.json();
        setTask(data);        
    }

    useEffect(() => {
        fetchData();
    }[childID,parentID]);

    return(
        <section>
            <section>
                <ChildTaskHeader taskName=""/>
            </section>
            <section>

            </section>
            <h1>Coming Soon</h1>
        </section>

    );
};

export default ChildTask;