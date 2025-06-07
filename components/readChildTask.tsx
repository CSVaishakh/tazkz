import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button"; // Add missing Button import
import { Slider } from "@/components/ui/slider"
import { Calendar } from "./ui/calendar";
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"

interface childProps {
    parent: string
    ID : string
};



const ReadChildTask: React.FC<childProps> = ({parent, ID}) => {
  const [taskName, setTaskName] = useState('');
  const [taskID, setTaskID] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskProgress, setTaskProgress] = useState<number[]>([0]);
  const [taskDeadline, setTaskDeadline] = useState<Date | undefined>(undefined); 
  const [parentTaskID, setParentTaskID] = useState('');
  const [notes, setNotes] = useState<string[]>([])
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setTaskID(ID);
    setParentTaskID(parent);
  }, [parent,ID]);

  const handleCreateChildTask = async () => {
    const childTaskData = {
      id: taskID,
      name: taskName,
      description: taskDescription,
      progress: taskProgress[0], // Convert array to single number
      deadline: taskDeadline,
      parentTask: parentTaskID,
      notes: notes
    };

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(childTaskData),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Child task created successfully:', result.message);
        // Reset form or redirect as needed
      } else {
        console.error('Error creating child task:', result.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <section>
        <div>
            <h1>New Child Task</h1>
            <Label>Child Task ID : {taskID} </Label>
        </div>
        <div>
            <Label>Parent Task ID : {parentTaskID}</Label>
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
            <Label htmlFor="progress">Progress</Label>
            <Slider
                value={taskProgress}
                onValueChange={setTaskProgress}
                max={100}
                step={1}
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
        <div>
            <Button onClick={handleCreateChildTask}>
                Create Child Task
            </Button>
        </div>
    </section>
  );
};

export default ReadChildTask;