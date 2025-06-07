export interface parentTask {
    id : string
    user_id : string
    name : string
    description : string | null
    status : 'started' | 'ongoing' | 'completed'
    priority : 'medium'|'high'|'low'
    deadline : string | null
    child_tasks : string[] | null
    note_id : string | null
}

export interface childTask {
    id : string
    name : string
    description : string | null
    progress : string
    deadline : string | null
    parentTask : string
    note_id : string | null
}

export interface parentNotes {
    id : string
    name : string
    notes: string[]
    task_id : parentTask['id']
}

export interface childNotes {
    id : string
    name : string
    notes : string[]
    task_id : childTask['id']
}

export function isParentTask(obj: any): obj is parentTask {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.user_id === 'string' &&
        typeof obj.name === 'string' &&
        (obj.description === null || typeof obj.description === 'string') &&
        ['started', 'ongoing', 'completed'].includes(obj.status) &&
        ['medium', 'high', 'low'].includes(obj.priority) &&
        (obj.deadline === null || typeof obj.deadline === 'string') &&
        (obj.child_tasks === null || (Array.isArray(obj.child_tasks) && obj.child_tasks.every((id: any) => typeof id === 'string'))) &&
        (obj.note_id === null || typeof obj.note_id === 'string')
    );
}

export function isChildTask(obj: any): obj is childTask {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        (obj.description === null || typeof obj.description === 'string') &&
        typeof obj.progress === 'string' &&
        (obj.deadline === null || typeof obj.deadline === 'string') &&
        typeof obj.parentTask === 'string' &&
        (obj.note_id === null || typeof obj.note_id === 'string')
    );
}

export function isParentNotes(obj: any): obj is parentNotes {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        Array.isArray(obj.notes) &&
        obj.notes.every((note: any) => typeof note === 'string') &&
        typeof obj.task_id === 'string'
    );
}

export function isChildNotes(obj: any): obj is childNotes {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.name === 'string' &&
        Array.isArray(obj.notes) &&
        obj.notes.every((note: any) => typeof note === 'string') &&
        typeof obj.task_id === 'string'
    );
}