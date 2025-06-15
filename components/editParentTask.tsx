import { editParent, parentTask } from "@/types/task";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
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

    useEffect(() => {
        setData(task);
        setTaskDeadline(task.deadline ? new Date(task.deadline) : undefined);
    }, [task]);

    return (
        <section>
            <div>
                <div>
                    <h2>{task.name}</h2>
                    <h4>{task.id}</h4>
                    <div>
                        <div>
                            <Label htmlFor="desc">Description</Label>
                            <textarea 
                                name="description"
                                id="desc"
                                value={data.description ?? ""}
                                onChange={(e) => {
                                    setData({...data, description: e.target.value});
                                }}>
                            </textarea>
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <select 
                                id="status"
                                value={data.status || ''}
                                onChange={(e) => {
                                    setData({...data, status: e.target.value as status});
                                }}
                            >
                                <option value="" disabled>started | ongoing | completed</option>
                                <option value="started">Started</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="priority">Priority</Label>
                            <select 
                                id="priority"
                                value={data.priority || ''}
                                onChange={(e) => {
                                    setData({...data, priority: e.target.value as priority});
                                }}
                            >
                                <option value="" disabled>low | medium | high</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="date">Deadline</Label>
                            
                            {taskDeadline && (
                                <div>
                                    <p>
                                        <span>Current deadline: </span>
                                        {taskDeadline.toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                            
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                    >
                                        {taskDeadline ? "Update deadline" : "Set deadline"}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={taskDeadline}
                                        captionLayout="dropdown"
                                        onSelect={(selectedDate) => {
                                            setTaskDeadline(selectedDate);
                                            setData({...data, deadline: selectedDate ? selectedDate.toISOString() : null});
                                            setOpen(false);
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            
                            {taskDeadline && (
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setTaskDeadline(undefined);
                                        setData({...data, deadline: null});
                                    }}
                                >
                                    Clear deadline
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditParent;