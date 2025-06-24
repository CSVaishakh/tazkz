import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { childTask, parentTask } from "@/types/task";
import { auth } from "@clerk/nextjs/server";


async function getUserID () {
    const { userId } = await auth();
    return userId;
}

export async function GET(request: NextRequest, { params }: {params: {taskID: string, childTaskID: string}}) {
    const userID = await getUserID();
    const { taskID, childTaskID } = params; // Changed from parentTask to childTaskID

    const { data,error } = await supabase
        .from( 'child_tasks' )
        .select('*')
        .eq('id', childTaskID) // Use childTaskID instead of taskID
        .eq('parentTask', taskID) // Use taskID as parentTask
    
    console.log(data);
    if (error){
        return NextResponse.json({ error: error.message })
    }
    
    const task: childTask = data[0] || null;
    return NextResponse.json(task);
}

export async function DELETE(request: NextRequest){
    const userID = await getUserID();
    const data = await request.json();
    const { error } = await supabase
        .from('child_tasks')
        .delete()
        .eq('id',data.id)
        .eq('parentTask',data.parentTask)

    if(error){
        console.log(error.message);
        return NextResponse.json(error.message);
    }

    const { data: parentTask } = await supabase
                                        .from('parent_tasks')
                                        .select('*')
                                        .eq('id', data.parentTask)
                                        .eq('user_id',userID)
    
    const orginalChildTasks: string[] = parentTask?.[0]?.childTasks || [];
    const newChildTasks: string[] = [];

    for (let i = 0; i < orginalChildTasks.length; i++) if(orginalChildTasks[i] !== data.id) newChildTasks.push(orginalChildTasks[i])
    
    console.log(orginalChildTasks);
    console.log(newChildTasks)

    const { error: updateError } = await supabase
                                    .from('parent_tasks')
                                    .update({ childTasks: newChildTasks })
                                    .eq('id', data.parentTask);

    if (updateError) {
        console.log(updateError.message);
    }

    return NextResponse.redirect(new URL(`/tasks/${data.parentTask}`, request.url))
}