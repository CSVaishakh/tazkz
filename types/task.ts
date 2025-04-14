export interface parentTask {
  id : string
  user_id : string
  name : string
  description : string | null
  status : 'started' | 'ongoing' | 'completed'
  priority : 'medium'|'high'|'low'
  deadline : string | null
  childTasks : string[] | null
  notes: string[] | null
}

export type status = 'started'|'ongoing'|'completed'
export type priority = 'low'|'medium'|'high'

export interface editParent{
  description : string | null
  status : 'started' | 'ongoing' | 'completed'
  priority : 'medium'|'high'|'low'
  deadline : string | null
  notes: string[] | null
}
export interface childTask {
  id : string
  name : string
  description : string | null
  progress : string
  deadline : string | null
  parentTask : string
  notes : string[] | null
}

export function isParentTask(obj: unknown): obj is parentTask {
  if (typeof obj !== 'object' || obj === null) return false;

  const task = obj as Record<string, unknown>;

  return (
    typeof task.id === 'string' &&
    typeof task.user_id === 'string' &&
    typeof task.name === 'string' &&
    (typeof task.description === 'string' || task.description === null) &&
    (task.status === 'started' || task.status === 'ongoing' || task.status === 'completed') &&
    (task.priority === 'medium' || task.priority === 'high' || task.priority === 'low') &&
    (typeof task.deadline === 'string' || task.deadline === null) &&
    (task.childTasks === null || (Array.isArray(task.childTasks) && task.childTasks.every(id => typeof id === 'string'))) &&
    (task.notes === null || (Array.isArray(task.notes) && task.notes.every(note => typeof note === 'string')))
  );
}

export function isChildTask(obj: unknown): obj is childTask {
  if (typeof obj !== 'object' || obj === null) return false;

  const task = obj as Record<string, unknown>;

  return (
    typeof task.id === 'string' &&
    typeof task.name === 'string' &&
    (typeof task.description === 'string' || task.description === null) &&
    typeof task.progress === 'string' &&
    (typeof task.deadline === 'string' || task.deadline === null) &&
    typeof task.parentTask === 'string' &&
    (task.notes === null || (Array.isArray(task.notes) && task.notes.every(note => typeof note === 'string')))
  );
}
