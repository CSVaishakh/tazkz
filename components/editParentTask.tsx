import { parentTask } from "@/types/task";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown, X, CalendarIcon, FileText, Tag, Users, Clock, Star, List } from "lucide-react"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden border border-gray-200">
                
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 p-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <List className="w-5 h-5 text-black" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-black">Edit Parent Task</h1>
                            <p className="text-black text-sm">{task.name}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200 group"
                    >
                        <X className="w-6 h-6 text-black group-hover:rotate-90 transition-transform duration-200" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto max-h-[calc(95vh-140px)] custom-scrollbar">
                    {/* Task Info */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                            <Tag className="w-5 h-5 text-green-600" />
                            <div>
                                <Label className="text-sm font-medium text-black">Task ID</Label>
                                <p className="font-mono text-sm text-black bg-white px-2 py-1 rounded border">{task.id}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Description */}
                        <div className="space-y-3">
                            <Label htmlFor="desc" className="text-lg font-semibold text-black flex items-center gap-2">
                                <FileText className="w-5 h-5 text-green-600" />
                                Description
                            </Label>
                            <textarea 
                                name="description"
                                id="desc"
                                placeholder="Enter task description..."
                                value={data.description ?? ""}
                                onChange={(e) => {
                                    setData({...data, description: e.target.value});
                                }}
                                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 resize-none h-32 text-lg text-black placeholder:text-black"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Status */}
                            <div className="space-y-3">
                                <Label htmlFor="status" className="text-lg font-semibold text-black flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-green-600" />
                                    Status
                                </Label>
                                <select 
                                    id="status"
                                    value={data.status || ''}
                                    onChange={(e) => {
                                        setData({...data, status: e.target.value as status});
                                    }}
                                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white text-lg text-black"
                                >
                                    <option value="" disabled>Select status</option>
                                    <option value="started">Started</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            {/* Priority */}
                            <div className="space-y-3">
                                <Label htmlFor="priority" className="text-lg font-semibold text-black flex items-center gap-2">
                                    <Star className="w-5 h-5 text-green-600" />
                                    Priority
                                </Label>
                                <select 
                                    id="priority"
                                    value={data.priority || ''}
                                    onChange={(e) => {
                                        setData({...data, priority: e.target.value as priority});
                                    }}
                                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white text-lg text-black"
                                >
                                    <option value="" disabled>Select priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>

                        {/* Deadline */}
                        <div className="space-y-3">
                            <Label htmlFor="date" className="text-lg font-semibold text-black flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-green-600" />
                                Deadline
                            </Label>
                            
                            {taskDeadline && (
                                <div className={`p-4 border-2 rounded-xl mb-4 transition-all duration-500 ${
                                    isNewlySelected 
                                        ? 'bg-green-100 border-green-400 shadow-lg' 
                                        : 'bg-green-50 border-green-200'
                                }`}>
                                    <p className="text-sm text-black">
                                        <span className="font-semibold text-black">
                                            {isNewlySelected ? 'New deadline set: ' : 'Current deadline: '}
                                        </span>
                                        <span className="font-mono text-black font-medium">
                                            {taskDeadline.toLocaleDateString('en-US', { 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric',
                                                timeZone: 'UTC'
                                            })}
                                        </span>
                                        {!isNewlySelected && isPastDate(taskDeadline) && (
                                            <span className="ml-2 text-xs bg-orange-100 text-black px-2 py-1 rounded-full font-medium">
                                                Past date
                                            </span>
                                        )}
                                        {isNewlySelected && (
                                            <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full animate-pulse font-medium">
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
                                            className="flex-1 justify-between font-normal p-4 border-2 border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-lg h-auto text-black"
                                        >
                                            <span className="flex items-center gap-2 text-black">
                                                <CalendarIcon className="w-5 h-5 text-black" />
                                                {taskDeadline ? 
                                                    taskDeadline.toLocaleDateString('en-US', { 
                                                        year: 'numeric', 
                                                        month: 'short', 
                                                        day: 'numeric',
                                                        timeZone: 'UTC'
                                                    }) 
                                                    : "Set deadline"
                                                }
                                            </span>
                                            <ChevronDown className="w-5 h-5 opacity-50 text-black" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0 border-2 border-green-300 shadow-xl" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={taskDeadline}
                                            captionLayout="dropdown"
                                            onSelect={handleDateSelect}
                                            className="rounded-lg text-black"
                                        />
                                    </PopoverContent>
                                </Popover>
                                
                                {taskDeadline && (
                                    <Button
                                        variant="outline"
                                        onClick={handleClearDeadline}
                                        className="px-6 py-4 border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-200 rounded-xl font-medium"
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Child Tasks */}
                        {task.childTasks && task.childTasks.length > 0 && (
                            <div className="p-6 bg-gradient-to-r from-gray-50 to-green-50 border-2 border-gray-200 rounded-xl">
                                <Label className="text-lg font-semibold text-black mb-4 block flex items-center gap-2">
                                    <Users className="w-5 h-5 text-green-600" />
                                    Child Tasks
                                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm ml-2 font-medium">
                                        {task.childTasks.length}
                                    </span>
                                </Label>
                                <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                                    {task.childTasks.map((id, index) => (
                                        <div key={`${id}-${index}`} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-200">
                                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                            <div>
                                                <span className="font-semibold text-black">Child Task {index + 1}</span>
                                                <p className="font-mono text-xs text-gray-600 mt-1">{id}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        {task.notes && task.notes.length > 0 && (
                            <div className="p-6 bg-gradient-to-r from-gray-50 to-green-50 border-2 border-gray-200 rounded-xl">
                                <Label className="text-lg font-semibold text-black mb-4 block flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-green-600" />
                                    Notes
                                </Label>
                                <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                                    {task.notes.map((note, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-all duration-200">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-black leading-relaxed">{note}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                    <div className="flex gap-4">
                        <Button 
                            onClick={handleClose}
                            variant="outline"
                            className="flex-1 bg-white hover:bg-gray-50 text-black font-semibold py-4 px-8 rounded-xl transition-all duration-300 border-2 border-gray-300 hover:border-gray-400 text-lg"
                        >
                            Cancel
                        </Button>

                        <Button 
                            onClick={handleSave}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-lg"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #10b981 #f1f5f9;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 6px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #10b981, #059669);
                    border-radius: 6px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #059669, #047857);
                }
            `}</style>
        </div>
    );
};

export default EditParent;