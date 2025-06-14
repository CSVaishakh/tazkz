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

export async function PATCH(request: NextRequest) {
    const data = await request.json();
    const { id, user_id, name, description, status, priority, deadline, childTasks, notes } = data;

    const { error } = await supabase
        .from('parent_tasks')
        .update({ name, description, status, priority, deadline, childTasks, notes })
        .eq('user_id', user_id)
        .eq('id', id);

    if (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message });
    }

    return NextResponse.json({ message: "Parent Task successfully updated" });
}

export async function DELETE(request: NextRequest) {
    const data = await request.json();
    if (isParentTask(data)) {
        const { error } = await supabase
            .from('parent_tasks')
            .delete()
            .eq('id', data.id)
            .eq('user_id',data.user_id)

        if (error) {
            console.log(error.message)
            return NextResponse.json(error.message);
        }
        return NextResponse.redirect(new URL(`/tasks`, request.url))
    }
}
