'use client';

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar";
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"
import { ChevronDownIcon, X } from "lucide-react"

interface childProps {
    parent: string
    ID : string
    onClose?: () => void;
    onChildTaskCreated?: (childID: string) => void;
};

const ReadChildTask: React.FC<childProps> = ({parent, ID, onClose, onChildTaskCreated}) => {
  const [taskName, setTaskName] = useState('');
  const [taskID, setTaskID] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskProgress, setTaskProgress] = useState<number[]>([0]);
  const [taskDeadline, setTaskDeadline] = useState<Date | undefined>(undefined); 
  const [parentTaskID, setParentTaskID] = useState('');
  const [notes, setNotes] = useState<string[]>([])
  const [notesInput, setNotesInput] = useState<string>('') // Add this line
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setTaskID(ID);
    setParentTaskID(parent);
    // Prevent body scroll when popup is open
    document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [parent,ID]);

  // Add this function before handleCreateChildTask
  const processNotesInput = () => {
      const processedNotes = notesInput
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0);
      setNotes(processedNotes);
  };

  const handleCreateChildTask = async () => {
    processNotesInput();
    
    const childTaskData = {
      id: taskID,
      name: taskName,
      description: taskDescription,
      progress: taskProgress[0],
      deadline: taskDeadline ? taskDeadline.toISOString().split('T')[0] : null,
      parentTask: parentTaskID,
      notes: notes
    };

    try {
      const response = await fetch(`/api/tasks/${parent}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(childTaskData),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Child task created successfully:', result.message);
        onChildTaskCreated?.(taskID); 
        onClose?.();
      } else {
        console.error('Error creating child task:', result.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-lg">
          <h1 className="text-3xl font-bold text-gray-800">Create Child Task</h1>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <Label className="text-sm font-medium text-gray-600">Child Task ID: <span className="font-mono text-black">{taskID}</span></Label>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <Label className="text-sm font-medium text-gray-600">Parent Task ID: <span className="font-mono text-black">{parentTaskID}</span></Label>
            </div>
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

            <div className="space-y-2">
              <Label htmlFor="progress" className="text-sm font-semibold text-gray-800">Progress: {taskProgress[0]}%</Label>
              <div className="px-3 py-4 border-2 border-gray-300 rounded-lg focus-within:border-green-500 transition-all">
                <Slider
                  value={taskProgress}
                  onValueChange={setTaskProgress}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
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

            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button 
                onClick={handleClose}
                className="flex-1 bg-gray-800 hover:bg-black text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 border-2 border-gray-800 hover:border-black"
              >
                Cancel
              </Button>

              <Button 
                onClick={handleCreateChildTask}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 border-2 border-green-600 hover:border-green-700"
              >
                Create Child Task
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadChildTask;