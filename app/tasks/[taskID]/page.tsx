"use client";
import React, { useState, useEffect, use } from "react";
import { parentTask } from "@/types/task";

interface TaskPageProps {
  params: Promise<{ taskID: string }>;
}

const TaskPage: React.FC<TaskPageProps> = ({ params }) => {
  const { taskID } = use(params);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`/api/tasks/${taskID}`);
      const data = await res.json();
      setTask(data);
    };

    fetchTask();
  }, [taskID]);


  console.log(task)
  return (
    <section>

    </section>
  );
};

export default TaskPage;
