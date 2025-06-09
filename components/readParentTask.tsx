import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { status, priority} from "@/types/task";
import { auth } from "@clerk/nextjs/server";
import ReadChildTask from "./readChildTask";

function generateUUID() {
  return crypto.randomUUID();
}

async function User() {
    const userID = await auth();
    return userID
}


const ReadParentTask: React.FC = () => {
    const [taskName, setTaskName] = useState('');
    const [taskID, setTaskID] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState<status | ''>('started');
    const [taskPriority, setTaskPriority] = useState<priority | ''>('medium');
    const [taskDeadline, setTaskDeadline] = useState<Date | undefined>(undefined); 
    const [childTasksIDs, setChildTaskIDs] = useState<string[]>([]);
    const [notes, setNotes] = useState<string[]>([])
    const [open, setOpen] = React.useState(false);
    const [showChildTask, setShowChildTask] = useState<boolean>(false);
    const [currentChildID, setCurrentChildID] = useState<string>('');

    useEffect(() => {
        setTaskID(generateUUID());
    }, []);

    const handleAddChildTask = () => {
        const newChildID = generateUUID();
        setChildTaskIDs(prev => [...prev, newChildID]);
        setCurrentChildID(newChildID);
        setShowChildTask(true);
    };

    const handleCreateParentTask = async () => {
        const user = await User();
        const userID = user?.userId;

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
            } else {
                console.error('Error creating parent task:', result.error);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    if (showChildTask) {
        return <ReadChildTask parent={taskID} ID={currentChildID} />;
    }

    return (
        <section>
            <h1>New Task</h1>

            <div>
                <Label>Task ID : {taskID}</Label>
            </div>

            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder="e.g. Complete assignment"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                    id="description"
                    placeholder="e.g. Assignemnt on linear algebra in Math"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
            </div>
            <div>
                <Label htmlFor="status">Status</Label>
                <Input
                    type="text"
                    id="status"
                    placeholder="started, ongoing, completed"
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value as status | '')}
                />
            </div>

            <div>
                <Label htmlFor="priority">Priority</Label>
                <Input
                    type="text"
                    id="priority"
                    placeholder="low, medium, high"
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as priority | '')}
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="date" className="px-1">
                    Deadline 
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date"
                            className="w-48 justify-between font-normal"
                        >
                        {taskDeadline ? taskDeadline.toLocaleDateString() : "Select date"} 
                        <ChevronDownIcon />
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
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
            <div>
                <Label htmlFor="notes">Notes</Label>
                <textarea
                    id="notes"
                    placeholder="Add your notes here...."
                    value={notes}
                    onChange={(e) => {
                        const text = e.target.value;
                        const sentences = text
                                .split(/(?<=[.?!])\s+/)
                                .map(s => s.trim())
                                .filter(s => s.length > 0);

                        setNotes(sentences)
                    }}
                />
            </div>

            {/* Display child tasks if any */}
            {childTasksIDs.length > 0 && (
                <div>
                    <Label>Child Tasks: {childTasksIDs.length}</Label>
                    <ul>
                        {childTasksIDs.map((id, index) => (
                            <li key={id}>Child Task {index + 1}: {id}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <Button onClick={handleAddChildTask}>
                    Add Child Task
                </Button>
            </div>

            <div>
                <Button onClick={handleCreateParentTask}>
                    Create Parent Task
                </Button>
            </div>
        </section>
    );
};

export  default ReadParentTask;