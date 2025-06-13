import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { ChevronDownIcon,X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { parentTask } from "@/types/task";

const editParentTask(task: parentTask) {
    const [taskName, setTaskName] = useState('');
    const [taskID, setTaskID] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState<status | ''>('started');
    const [taskPriority, setTaskPriority] = useState<priority | ''>('medium');
    const [taskDeadline, setTaskDeadline] = useState<Date | undefined>(undefined); 
    const [childTasksIDs, setChildTaskIDs] = useState<string[]>([]);
    const [notes, setNotes] = useState<string[]>([])
    const [notesInput, setNotesInput] = useState<string>('') 
    
    useEffect(()=>{
        
        
    })
}