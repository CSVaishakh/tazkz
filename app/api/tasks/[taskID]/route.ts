import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { parentTask, isParentTask } from "@/types/task";

async function getUserID() {
    const { userId } = await auth();
    return userId
}

export async function GET(request: NextRequest, { params }: { params: { taskID: string } }) {
    const userID = await getUserID();
    const { taskID } = await params;

    const { data, error } = await supabase
        .from('parent_tasks')
        .select('*')
        .eq('user_id', userID)
        .eq('id', taskID);
    console.log(data);
    if (error) {
        return NextResponse.json({ error: error.message })
    }

    const task: parentTask = data[0] || null
    return NextResponse.json(task);
}

export async function PATCH(request: NextRequest, { params }: { params: { taskID: string } }) {
    const userID = await getUserID();
    const { taskID } = await params;
    const data = await request.json();
    const { name, description, status, priority, deadline, childTasks, notes } = data;

    const { error } = await supabase
        .from('parent_tasks')
        .update({ name, description, status, priority, deadline, childTasks, notes })
        .eq('user_id', userID)
        .eq('id', taskID);

    if (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message });
    }

    return NextResponse.json({ message: "Parent Task successfully updated" });
}

// Also add PUT method for compatibility
export async function PUT(request: NextRequest, { params }: { params: { taskID: string } }) {
    return PATCH(request, { params });
}

export async function DELETE(request: NextRequest, { params }: { params: { taskID: string } }) {
    const userID = await getUserID();
    const { taskID } = await params;
    
    const { error } = await supabase
        .from('parent_tasks')
        .delete()
        .eq('id', taskID)
        .eq('user_id', userID)

    if (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message });
    }
    
    return NextResponse.json({ message: "Task deleted successfully" });
}
