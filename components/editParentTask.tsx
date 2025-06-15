import { editParent, parentTask } from "@/types/task";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDownIcon, X } from "lucide-react"
import { status, priority } from "@/types/task";

interface EditParentProps {
    task: parentTask;
    onClose?: () => void;
}

const EditParent: React.FC<EditParentProps> = ({ onClose, task }) => {
    const [data, setData] = useState<parentTask>(task);
    const [open, setOpen] = useState(false);
    const [taskDeadline, setTaskDeadline] = useState<Date | undefined>(
        task.deadline ? new Date(task.deadline) : undefined
    );
    // Add state for newly selected date visual feedback
    const [isNewlySelected, setIsNewlySelected] = useState(false);

    // Helper function to validate and format dates consistently
    const formatDateConsistently = (date: Date): string => {
        // Use UTC to avoid timezone issues
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
    };

    // Helper function to check if date is in the past
    const isPastDate = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const compareDate = new Date(date);
        compareDate.setHours(0, 0, 0, 0);
        return compareDate < today;
    };

    useEffect(() => {
        setData(task);
        // Validate date before setting to prevent bad input on rerender
        if (task.deadline) {
            const parsedDate = new Date(task.deadline);
            if (!isNaN(parsedDate.getTime())) {
                setTaskDeadline(parsedDate);
            } else {
                setTaskDeadline(undefined);
            }
        } else {
            setTaskDeadline(undefined);
        }
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [task]);

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Task updated successfully');
                onClose?.();
            } else {
                console.error('Error updating task');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleClose = () => {
        onClose?.();
    };

    // Handle date selection with validation and visual feedback
    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (!selectedDate) {
            // Prevent accidental null - only clear if explicitly intended
            return;
        }

        // Validate date before setting
        if (isNaN(selectedDate.getTime())) {
            console.error('Invalid date selected');
            return;
        }

        // Optional: Prevent past deadlines
        if (isPastDate(selectedDate)) {
            console.warn('Past date selected - consider using a future date');
            // Uncomment the next line to prevent past dates:
            // return;
        }

        // Use consistent timezone formatting
        const formattedDate = formatDateConsistently(selectedDate);
        
        setTaskDeadline(selectedDate);
        setData({...data, deadline: formattedDate});
        
        // Show visual feedback for newly selected deadline
        setIsNewlySelected(true);
        setTimeout(() => setIsNewlySelected(false), 2000);

        // UX polish: Delay closing popover slightly for better UX
        setTimeout(() => setOpen(false), 150);
    };

    // Handle clear with proper reset
    const handleClearDeadline = () => {
        setTaskDeadline(undefined);
        setData({...data, deadline: null});
        setIsNewlySelected(false);
        // Clear inconsistency: Reset selection + close popover
        setOpen(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header with close button */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-lg">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Edit Task</h1>
                        <p className="text-sm text-gray-600 mt-1">{task.name}</p>
                    </div>
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
                        <Label className="text-sm font-medium text-gray-600">Task ID: <span className="font-mono text-black">{task.id}</span></Label>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="desc" className="text-sm font-semibold text-gray-800">Description</Label>
                            <textarea 
                                name="description"
                                id="desc"
                                placeholder="Enter task description..."
                                value={data.description ?? ""}
                                onChange={(e) => {
                                    setData({...data, description: e.target.value});
                                }}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none h-24"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-sm font-semibold text-gray-800">Status</Label>
                                <select 
                                    id="status"
                                    value={data.status || ''}
                                    onChange={(e) => {
                                        setData({...data, status: e.target.value as status});
                                    }}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white"
                                >
                                    <option value="" disabled>Select status</option>
                                    <option value="started">Started</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="priority" className="text-sm font-semibold text-gray-800">Priority</Label>
                                <select 
                                    id="priority"
                                    value={data.priority || ''}
                                    onChange={(e) => {
                                        setData({...data, priority: e.target.value as priority});
                                    }}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white"
                                >
                                    <option value="" disabled>Select priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-sm font-semibold text-gray-800">Deadline</Label>
                            
                            {taskDeadline && (
                                <div className={`p-3 border-2 rounded-lg mb-3 transition-all duration-500 ${
                                    isNewlySelected 
                                        ? 'bg-green-100 border-green-300 shadow-md' 
                                        : 'bg-green-50 border-green-200'
                                }`}>
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">
                                            {isNewlySelected ? 'New deadline set: ' : 'Current deadline: '}
                                        </span>
                                        <span className="font-mono text-green-700">
                                            {taskDeadline.toLocaleDateString('en-US', { 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric',
                                                timeZone: 'UTC'
                                            })}
                                        </span>
                                        {!isNewlySelected && isPastDate(taskDeadline) && (
                                            <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                                                Past date
                                            </span>
                                        )}
                                        {isNewlySelected && (
                                            <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded animate-pulse">
                                                Newly selected!
                                            </span>
                                        )}
                                    </p>
                                </div>
                            )}
                            
                            <div className="flex gap-3">
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            id="date"
                                            className="flex-1 justify-between font-normal p-3 border-2 border-gray-300 rounded-lg hover:border-green-500 transition-all"
                                        >
                                            {taskDeadline ? 
                                                taskDeadline.toLocaleDateString('en-US', { 
                                                    year: 'numeric', 
                                                    month: 'short', 
                                                    day: 'numeric',
                                                    timeZone: 'UTC'
                                                }) 
                                                : "Set deadline"
                                            }
                                            <ChevronDownIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0 border-2 border-green-300" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={taskDeadline}
                                            captionLayout="dropdown"
                                            onSelect={handleDateSelect}
                                        />
                                    </PopoverContent>
                                </Popover>
                                
                                {taskDeadline && (
                                    <Button
                                        variant="outline"
                                        onClick={handleClearDeadline}
                                        className="px-4 py-3 border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all"
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Child Tasks Display */}
                        {task.childTasks && task.childTasks.length > 0 && (
                            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                                <Label className="text-sm font-semibold text-gray-800 mb-3 block">
                                    Child Tasks: <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs ml-2">{task.childTasks.length}</span>
                                </Label>
                                <ul className="space-y-2">
                                    {task.childTasks.map((id, index) => (
                                        <li key={`${id}-${index}`} className="text-sm text-gray-700 p-2 bg-white rounded border border-green-200">
                                            <span className="font-medium">Child Task {index + 1}:</span> 
                                            <span className="font-mono text-xs ml-2 text-gray-600">{id}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Notes Display */}
                        {task.notes && task.notes.length > 0 && (
                            <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                                <Label className="text-sm font-semibold text-gray-800 mb-3 block">Notes</Label>
                                <ul className="space-y-1">
                                    {task.notes.map((note, index) => (
                                        <li key={index} className="text-sm text-gray-700 p-2 bg-white rounded border border-gray-200">
                                            • {note}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex gap-4 pt-6 border-t border-gray-200">
                            <Button 
                                onClick={handleClose}
                                variant="outline"
                                className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-300 border-2 border-gray-300 hover:border-gray-400"
                            >
                                Cancel
                            </Button>

                            <Button 
                                onClick={handleSave}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 border-2 border-green-600 hover:border-green-700"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditParent;