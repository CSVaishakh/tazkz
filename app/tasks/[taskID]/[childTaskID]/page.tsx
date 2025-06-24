'use client';
import { ChildTaskHeader } from "@/components/header";
import { childTask } from "@/types/task";
import React, { useEffect, useState, use } from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText, Tag, CheckCircle, Clock } from "lucide-react";

interface ChildTaskPageProps{
    params: Promise<{ taskID: string, childTaskID: string }>; // Match the folder structure
}

const ChildTask: React.FC<ChildTaskPageProps> = ({ params }) => {
    const [parent, setParent] = useState('');
    const [child, setChild] = useState('');
    const [task, setTask] = useState<childTask>({
        id : "",
        name : "",
        description : "",
        progress : "",
        deadline : "",
        parentTask : "",
        notes : []
    });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { taskID, childTaskID } = await params; // Match the folder structure
                setParent(taskID);
                setChild(childTaskID);
                
                const res = await fetch(`/api/tasks/${taskID}/${childTaskID}`);
                const data = await res.json();
                console.log('Fetched task data:', data); // Add debugging
                setTask(data);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };
        
        fetchTask();
    }, [params]);

    return(
        <section>
            <section>
                <ChildTaskHeader taskName={task?.name}/>
            </section>
            <section className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-full mx-auto">
                    <div className="mb-8 flex items-center justify-between">
                        <Link 
                            href={`/tasks/${parent}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 rounded-lg border border-green-200 hover:border-green-400 transition-all duration-300 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                            Back to Parent Task
                        </Link>
                        <div className="flex gap-3">
                            <button 
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg border border-blue-600 hover:border-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                            >
                                Edit Task
                            </button>
                            <button 
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg border border-red-600 hover:border-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden animate-fade-in min-h-[85vh]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        
                        <div className="p-8 border-b border-gray-200">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{task?.name}</h1>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Tag className="w-5 h-5 text-blue-600" />
                                        <span className="text-sm text-gray-600 font-mono bg-gray-100 px-3 py-1 rounded">
                                            ID: {task?.id}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-lg leading-relaxed">{task?.description || "No description provided"}</p>
                                </div>
                                <div className="flex gap-3 ml-6">
                                    <span className="px-4 py-2 rounded-full text-sm font-semibold border bg-blue-100 text-blue-800 border-blue-200">
                                        <CheckCircle className="w-4 h-4 inline mr-1" />
                                        Child Task
                                    </span>
                                    <span className="px-4 py-2 rounded-full text-sm font-semibold border bg-green-100 text-green-800 border-green-200">
                                        <Clock className="w-4 h-4 inline mr-1" />
                                        {task?.progress || "0%"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 h-full">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                                
                                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 h-full flex flex-col">
                                    <h2 className="text-xl font-bold text-gray-800 mb-8 border-l-4 border-blue-500 pl-4">
                                        Task Details
                                    </h2>
                                    <div className="space-y-6 flex-1">
                                        <div className="flex items-center gap-3 p-6 bg-white rounded-lg border border-gray-200">
                                            <Calendar className="w-6 h-6 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Deadline</p>
                                                <p className="text-lg font-semibold text-gray-800">
                                                    {task?.deadline || "No deadline set"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-6 bg-white rounded-lg border border-gray-200">
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Progress</p>
                                                <p className="text-lg font-semibold text-gray-800">
                                                    {task?.progress || "0%"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-6 rounded-lg border border-gray-200 flex-1">
                                            <p className="text-sm font-medium text-gray-600 mb-3">Parent Task ID</p>
                                            <code className="text-xs text-gray-600 font-mono break-all bg-gray-50 p-3 rounded block">
                                                {task?.parentTask}
                                            </code>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 h-full flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-800 mb-8 border-l-4 border-green-500 pl-4 flex items-center gap-2">
                                        <FileText className="w-6 h-6" />
                                        Notes
                                    </h3>
                                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                                        {task?.notes?.length === 0 || task?.notes === null ? (
                                            <div className="text-center py-16 h-full flex flex-col justify-center">
                                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500 font-medium text-lg">No notes yet</p>
                                                <p className="text-sm text-gray-400 mt-2">Add notes to keep track of important details</p>
                                            </div>
                                        ) : (
                                            <ul className="space-y-4">
                                                {task?.notes?.map((note: string, index: number) => (
                                                    <li 
                                                        key={index} 
                                                        className="bg-white p-4 rounded-lg border-l-3 border-blue-300 hover:border-blue-500 transition-all duration-200 hover:bg-blue-50 shadow-sm"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
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
                        scrollbar-color: #3b82f6 #f0f8ff;
                    }

                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }

                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: #f8fafc;
                        border-radius: 6px;
                    }

                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: linear-gradient(to bottom, #3b82f6, #2563eb);
                        border-radius: 6px;
                        border: 1px solid #e2e8f0;
                    }

                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: linear-gradient(to bottom, #2563eb, #1d4ed8);
                    }
                `}</style>
            </section>
        </section>
    );
};

export default ChildTask;