'use client';

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"
import { ChevronDownIcon, X } from "lucide-react"
import { status, priority} from "@/types/task";
import { useUser } from "@clerk/nextjs";
import ReadChildTask from "./readChildTask";

function generateUUID() {
  return crypto.randomUUID();
}

interface ReadParentTaskProps {
    onClose?: () => void;
}

const ReadParentTask: React.FC<ReadParentTaskProps> = ({ onClose }) => {
    const { user } = useUser();
    const [taskName, setTaskName] = useState('');
    const [taskID, setTaskID] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState<status | ''>('started');
    const [taskPriority, setTaskPriority] = useState<priority | ''>('medium');
    const [taskDeadline, setTaskDeadline] = useState<Date | undefined>(undefined); 
    const [childTasksIDs, setChildTaskIDs] = useState<string[]>([]);
    const [notes, setNotes] = useState<string[]>([])
    const [notesInput, setNotesInput] = useState<string>('') // Add this line
    const [open, setOpen] = React.useState(false);
    const [showChildTask, setShowChildTask] = useState<boolean>(false);
    const [currentChildID, setCurrentChildID] = useState<string>('');

    useEffect(() => {
        setTaskID(generateUUID());
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleAddChildTask = () => {
        const newChildID = generateUUID();
        setCurrentChildID(newChildID);
        setShowChildTask(true);
    };

    const handleChildTaskCreated = (childID: string) => {
        setChildTaskIDs(prev => {
            if (prev.includes(childID)) {
                return prev;
            }
            return [...prev, childID];
        });
        setShowChildTask(false);
    };

    const processNotesInput = () => {
        const processedNotes = notesInput
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        setNotes(processedNotes);
    };

    const handleCreateParentTask = async () => {
        const userID = user?.id;
        
        processNotesInput();

        const parentTaskData = {
            id: taskID,
            user_id: userID,
            name: taskName,
            description: taskDescription,
            status: taskStatus,
            priority: taskPriority,
            deadline: taskDeadline,
            childTasks: childTasksIDs,
            notes: notes
        };

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parentTaskData),
            });

            const result = await response.json();
            
            if (response.ok) {
                console.log('Parent task created successfully:');
                onClose?.(); // Close popup on success
            } else {
                console.error('Error creating parent task:', result.error);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleClose = () => {
        onClose?.();
    };

    if (showChildTask) {
        return (
            <ReadChildTask 
                parent={taskID} 
                ID={currentChildID} 
                onClose={() => setShowChildTask(false)}
                onChildTaskCreated={handleChildTaskCreated}
            />
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header with close button */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-lg">
                    <h1 className="text-3xl font-bold text-gray-800">Create New Task</h1>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                        <Label className="text-sm font-medium text-gray-600">Task ID: <span className="font-mono text-black">{taskID}</span></Label>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold text-gray-800">Task Name</Label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="e.g. Complete assignment"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-semibold text-gray-800">Description</Label>
                            <textarea
                                id="description"
                                placeholder="e.g. Assignment on linear algebra in Math"
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none h-24"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-sm font-semibold text-gray-800">Status</Label>
                                <Input
                                    type="text"
                                    id="status"
                                    placeholder="started, ongoing, completed"
                                    value={taskStatus}
                                    onChange={(e) => setTaskStatus(e.target.value as status | '')}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="priority" className="text-sm font-semibold text-gray-800">Priority</Label>
                                <Input
                                    type="text"
                                    id="priority"
                                    placeholder="low, medium, high"
                                    value={taskPriority}
                                    onChange={(e) => setTaskPriority(e.target.value as priority | '')}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-sm font-semibold text-gray-800">Deadline</Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-full justify-between font-normal p-3 border-2 border-gray-300 rounded-lg hover:border-green-500 transition-all"
                                    >
                                        {taskDeadline ? taskDeadline.toLocaleDateString() : "Select date"} 
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0 border-2 border-green-300" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={taskDeadline}
                                        captionLayout="dropdown"
                                        onSelect={(selectedDate) => {
                                            setTaskDeadline(selectedDate)
                                            setOpen(false)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes" className="text-sm font-semibold text-gray-800">Notes</Label>
                            <textarea
                                id="notes"
                                placeholder="Add your notes here... (Press Enter to separate points)"
                                value={notesInput}
                                onChange={(e) => setNotesInput(e.target.value)}
                                onBlur={processNotesInput}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none h-32"
                            />
                        </div>

                        {childTasksIDs.length > 0 && (
                            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                                <Label className="text-sm font-semibold text-gray-800 mb-3 block">
                                    Child Tasks: <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs ml-2">{childTasksIDs.length}</span>
                                </Label>
                                <ul className="space-y-2">
                                    {childTasksIDs.map((id, index) => (
                                        <li key={`${id}-${index}`} className="text-sm text-gray-700 p-2 bg-white rounded border border-green-200">
                                            <span className="font-medium">Child Task {index + 1}:</span> 
                                            <span className="font-mono text-xs ml-2 text-gray-600">{id}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex gap-4 pt-6 border-t border-gray-200">
                            <Button 
                                onClick={handleAddChildTask}
                                className="flex-1 bg-gray-800 hover:bg-black text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 border-2 border-gray-800 hover:border-black"
                            >
                                Add Child Task
                            </Button>

                            <Button 
                                onClick={handleCreateParentTask}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 border-2 border-green-600 hover:border-green-700"
                            >
                                Create Task
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadParentTask;