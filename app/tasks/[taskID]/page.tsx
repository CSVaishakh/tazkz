"use client";
import React, { useState, useEffect, use } from "react";
import { parentTask } from "@/types/task";
import Link from "next/link";
import { ArrowLeft, Calendar, Users, FileText, Tag, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface TaskPageProps {
  params: Promise<{ taskID: string }>;
}

const TaskPage: React.FC<TaskPageProps> = ({ params }) => {
  const { taskID } = use(params);
  const router = useRouter();
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

  const handleDelete = async () => {
    try{
      const res = await fetch(`/api/tasks/${taskID}`,{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(task)
      });
      if(!res.ok) throw new Error("Failed to delete task");
      router.push('/tasks');
    }catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`/api/tasks/${taskID}`);
      const data = await res.json();
      setTask(data);
    };

    fetchTask();
  }, [taskID]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'started': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };



  return (
    <section className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-full mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link 
            href="/tasks" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 rounded-lg border border-green-200 hover:border-green-400 transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Tasks
          </Link>
          <button 
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg border border-red-600 hover:border-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
          >
            Delete Task
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden animate-fade-in min-h-[85vh]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
          
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{task?.name}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{task?.description || "No description provided"}</p>
              </div>
              <div className="flex gap-3 ml-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getPriorityColor(task?.priority)}`}>
                  <Star className="w-4 h-4 inline mr-1" />
                  {task?.priority}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(task?.status)}`}>
                  <Tag className="w-4 h-4 inline mr-1" />
                  {task?.status}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
              
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 h-full flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 mb-8 border-l-4 border-green-500 pl-4">
                  Task Details
                </h2>
                <div className="space-y-6 flex-1">
                  <div className="flex items-center gap-3 p-6 bg-white rounded-lg border border-gray-200">
                    <Calendar className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Deadline</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {task?.deadline || "No deadline set"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-6 bg-white rounded-lg border border-gray-200">
                    <Users className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Child Tasks</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {task.childTasks?.length || 0}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-3">Task ID</p>
                    <code className="text-xs text-gray-600 font-mono break-all bg-gray-50 p-3 rounded block">
                      {task?.id}
                    </code>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-gray-50 rounded-xl p-8 border border-gray-200 h-full flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 mb-8 border-l-4 border-blue-500 pl-4 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Child Tasks
                </h2>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {task.childTasks?.length === 0 || task.childTasks === null ? (
                    <div className="text-center py-20 h-full flex flex-col justify-center">
                      <Users className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                      <p className="text-gray-500 font-medium text-xl">No child tasks yet</p>
                      <p className="text-sm text-gray-400 mt-2">Break down this task into smaller subtasks</p>
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {task.childTasks?.map((id: string, index: number) => (
                        <Link 
                          key={id} 
                          href={`/tasks/${task.id}/${id}`}
                          className="group"
                        >
                          <div className="bg-white hover:bg-blue-50 p-6 rounded-lg border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-lg">
                                  {index + 1}
                                </div>
                                <span className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors text-lg">
                                  Child Task {index + 1}
                                </span>
                              </div>
                              <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowLeft className="w-5 h-5 rotate-180" />
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-4 font-mono bg-gray-50 px-3 py-2 rounded">
                              ID: {id}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 h-full flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-8 border-l-4 border-green-500 pl-4 flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Notes
                </h3>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {task.notes?.length === 0 || task.notes === null ? (
                    <div className="text-center py-16 h-full flex flex-col justify-center">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium text-lg">No notes yet</p>
                      <p className="text-sm text-gray-400 mt-2">Add notes to keep track of important details</p>
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      {task.notes?.map((note: string, index: number) => (
                        <li 
                          key={index} 
                          className="bg-white p-4 rounded-lg border-l-3 border-green-300 hover:border-green-500 transition-all duration-200 hover:bg-green-50 shadow-sm"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700 leading-relaxed">{note}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .border-l-3 {
          border-left-width: 3px;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #10b981 #f0fdf4;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #047857);
        }
      `}</style>
    </section>
  );
};

export default TaskPage;
