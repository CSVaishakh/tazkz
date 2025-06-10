import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { isChildTask, parentTask } from "@/types/task";

async function getUserID () {
    const { userId } = await auth();
    return userId
}

export async function GET( request: NextRequest, { params }: { params: { taskID: string } }) {
    const userID = await getUserID();
    const { taskID } = params;

    const { data, error } = await supabase
        .from('parent_tasks')
        .select('*')
        .eq('userID', userID)
        .eq('id', taskID);

    if(error){
        return NextResponse.json({error : error.message })
    }
    
    const task: parentTask = data[0] || null
    return NextResponse.json(task);
}

export async function PUT (request: NextRequest) {
    const data = await request.json();
    const { id,user_id,name,description,status,priority,deadline,childTasks,notes } = data;

        const { error } = await supabase
            .from('parent_tasks')
            .update({name,description,status,priority,deadline,childTasks,notes})
            .eq('user_id', user_id)
            .eq('id',id);

        if (error) {
            console.log(error.message)
            return NextResponse.json({ error: error.message });
        }

        return NextResponse.json({message: "Parent Task successfully created"});
}

export async function DELETE(request: NextRequest){
    const data = await request.json();
    if(isChildTask(data)) {
        const { error } = await supabase
            .from('child_tasks')
            .delete()
            .eq('id',data.id)
            .eq('parentTask',data.parentTask)
    
        if(error) {
            console.log(error.message)
            return NextResponse.json(error.message);
        }
        return NextResponse.redirect(new URL(`/tasks${data.parentTask}`,request.url))
    }
    
}