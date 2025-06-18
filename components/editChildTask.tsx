import { childTask } from "@/types/task";
import { useEffect, useState } from "react";
import { Label } from "./ui/label"; 
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDownIcon, X } from "lucide-react"

interface EditChildprops{
    task: childTask;
    onClose?: () => void;
}

const EditChild: React.FC<EditChildprops> = ({ onClose, task }) => {
    const [data, setData] = useState<childTask>(task);
    const [open, setOpen] = useState(false);
    const [taskDeadline, setTaskDeadline] = useState<Date | undefined>(
        task.deadline ? new Date(task.deadline) : undefined
    );
    const [isNewlySelected, setIsNewlySelected] = useState(false);

    const formatDateConsistently = (date: Date): string => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
    };

    const isPastDate = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const compareDate = new Date(date);
        compareDate.setHours(0, 0, 0, 0);
        return compareDate < today;
    };

    useEffect(() => {
        setData(task);
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
            const response = await fetch(`/api/child-tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Child task updated successfully');
                onClose?.();
            } else {
                console.error('Error updating child task');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleClose = () => {
        onClose?.();
    };

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (!selectedDate) {
            return;
        }

        if (isNaN(selectedDate.getTime())) {
            console.error('Invalid date selected');
            return;
        }

        if (isPastDate(selectedDate)) {
            console.warn('Past date selected - consider using a future date');
        }

        const formattedDate = formatDateConsistently(selectedDate);
        
        setTaskDeadline(selectedDate);
        setData({...data, deadline: formattedDate});
        
        setIsNewlySelected(true);
        setTimeout(() => setIsNewlySelected(false), 2000);

        setTimeout(() => setOpen(false), 150);
    };

    const handleClearDeadline = () => {
        setTaskDeadline(undefined);
        setData({...data, deadline: null});
        setIsNewlySelected(false);
        setOpen(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-lg">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{task.name}</h1>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                        <Label className="text-sm font-medium text-gray-600">Task ID: <span className="font-mono text-black">{task.id}</span></Label>
                        <Label className="text-sm font-medium text-gray-600 block mt-2">Parent Task: <span className="font-mono text-black">{task.parentTask}</span></Label>
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
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none h-24"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="progress" className="text-sm font-semibold text-gray-800">Progress</Label>
                                <input 
                                    type="text"
                                    id="progress"
                                    placeholder="Enter progress..."
                                    value={data.progress}
                                    onChange={(e) => {
                                        setData({...data, progress: e.target.value});
                                    }}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="parentTask" className="text-sm font-semibold text-gray-800">Parent Task ID</Label>
                                <input 
                                    type="text"
                                    id="parentTask"
                                    placeholder="Enter parent task ID..."
                                    value={data.parentTask}
                                    onChange={(e) => {
                                        setData({...data, parentTask: e.target.value});
                                    }}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-sm font-semibold text-gray-800">Deadline</Label>
                            
                            {taskDeadline && (
                                <div className={`p-3 border-2 rounded-lg mb-3 transition-all duration-500 ${
                                    isNewlySelected 
                                        ? 'bg-blue-100 border-blue-300 shadow-md' 
                                        : 'bg-blue-50 border-blue-200'
                                }`}>
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">
                                            {isNewlySelected ? 'New deadline set: ' : 'Current deadline: '}
                                        </span>
                                        <span className="font-mono text-blue-700">
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
                                            <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded animate-pulse">
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
                                            className="flex-1 justify-between font-normal p-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-all"
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
                                    <PopoverContent className="w-auto overflow-hidden p-0 border-2 border-blue-300" align="start">
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
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 border-2 border-blue-600 hover:border-blue-700"
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

export default EditChild;