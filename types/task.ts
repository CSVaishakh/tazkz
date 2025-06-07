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