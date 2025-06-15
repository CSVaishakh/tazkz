'use client'

import React from "react";
import { useState, useEffect } from "react";
import { parentTask } from "@/types/task";
import Link from "next/link";
import ZeroTasks from "@/components/zeroTasks";

const Data = () => {
    const [ tasks, setTasks ] = useState<parentTask[]>([])
    useEffect(()=>{
        const fetchTasks = async() => {
            const res = await fetch('/api/tasks');
            const data = await res.json();
            setTasks(data);
        }

        fetchTasks()
    },[]);
    return tasks
}

const TasksLayout: React.FC = () => {

    const tasks = Data()
    console.log(tasks);
    return(
        <section className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in">Your Tasks</h1>
                {tasks.length === 0 ? (
                    <ZeroTasks/>
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8 justify-items-center">
                        {tasks.map((task, index)=>(
                            <Link 
                                key={task.id} 
                                href={`/tasks/${task.id}`} 
                                className="group w-full max-w-sm transform transition-all duration-300 hover:scale-[1.02] animate-slide-up"
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                <div className="bg-white hover:bg-green-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-green-200 hover:border-green-400 h-80 flex flex-col relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
                                    
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-200 line-clamp-2">{task.name}</h3>
                                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-shrink-0">{task.description}</p>
                                    
                                    <div className="space-y-3 mb-4 flex-shrink-0">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-gray-700">Deadline:</span> 
                                            <span className="text-red-600 font-semibold bg-red-50 px-2 py-1 rounded text-xs">{task.deadline}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-gray-700">Child Tasks:</span> 
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 hover:bg-green-200">{task.childTasks?.length || 0}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-gray-200 pt-4 flex-1 min-h-0">
                                        <p className="text-sm font-semibold text-gray-700 mb-3">Notes:</p>
                                        <div className="h-full overflow-y-auto custom-scrollbar">
                                            {task.notes?.length ? (
                                                <ul className="space-y-2">
                                                    {task.notes.map((note, index) => (
                                                        <li key={index} className="text-xs text-gray-600 pl-3 border-l-3 border-green-300 hover:border-green-500 transition-all duration-200 hover:bg-green-50 rounded-r px-3 py-2 bg-gray-50">{note}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-xs text-gray-400 italic text-center py-4">No notes added yet</p>
                                            )}
                                        </div>
                                    </div>
                                </div> 
                            </Link>
                        ))
                    }
                    </div>
                )
                }
            </div>
            
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(40px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }

                .animate-slide-up {
                    animation: slide-up 0.7s ease-out forwards;
                    opacity: 0;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
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

export default TasksLayout;