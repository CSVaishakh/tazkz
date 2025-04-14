"use client";
import React, { useState, useEffect, use } from "react";
import { parentTask } from "@/types/task";
import { Link } from "lucide-react";

interface TaskPageProps {
  params: Promise<{ taskID: string }>;
}

const TaskPage: React.FC<TaskPageProps> = ({ params }) => {
  const { taskID } = use(params);
  const [task, setTask] = useState<parentTask>({
  id: "",
  user_id: "",
  name: "",
  description: "",
  status: "started",
  priority: "low",
  deadline: "",
  childTasks: [],
  notes: []
});

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`/api/tasks/${taskID}`);
      const data = await res.json();
      setTask(data);
    };

    fetchTask();
  }, [taskID]);

  const keys = ['id','user_id','name','description','status','priority','deadline','childTasks','notes']

  console.log(task)
  return (
    <section>
          <div>
            <h1>{task?.name}</h1>
            <h3>{task?.id}</h3>
            <div>
              <p>{task?.status}</p>
              <p>{task?.priority}</p>
              <p>{task?.deadline}</p>
              <div>
                {task.childTasks?.length === 0 || task.childTasks === null ? (
                  <p>No Child Tasks</p>
                ) : (
                  task.childTasks?.map((id: string, index: number) => (
                    <Link key={id} href={`/tasks/${task.id}/childTaskID/${id}`}>
                      <button>Child Task {index + 1}</button>
                    </Link>
                  ))
                )}
              </div>
              <div>
                
              </div>
            </div>
          </div>
    </section>
  );
};

export default TaskPage;
