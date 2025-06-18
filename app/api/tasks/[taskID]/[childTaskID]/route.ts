import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PATCH(request: NextRequest, { params }: { params: { taskID: string, childTaskID: string } }) {
    const { taskID, childTaskID } = await params;
    const data = await request.json();
    const { description, progress, deadline, notes } = data;

    const { error } = await supabase
        .from('child_tasks')
        .update({ description, progress, deadline, notes })
        .eq('parentTask', taskID)
        .eq('id', childTaskID);

    if (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message });
    }

    return NextResponse.json({ message: "Child Task successfully updated" });
}

export async function DELETE(request: NextRequest, { params }: { params: { taskID: string, childTaskID: string } }) {
    const { taskID, childTaskID } = await params;

    // First, get the current parent task to access its childTasks array
    const { data: parentTask, error: fetchError } = await supabase
        .from('parent_tasks')
        .select('childTasks')
        .eq('id', taskID)
        .single();

    if (fetchError) {
        console.log(fetchError.message);
        return NextResponse.json({ error: fetchError.message });
    }

    // Delete the child task
    const { error: deleteError } = await supabase
        .from('child_tasks')
        .delete()
        .eq('parentTask', taskID)
        .eq('id', childTaskID);

    if (deleteError) {
        console.log(deleteError.message);
        return NextResponse.json({ error: deleteError.message });
    }

    // Update parent task's childTasks array to remove the deleted child task ID
    const updatedChildTasks = parentTask.childTasks 
        ? parentTask.childTasks.filter((id: string) => id !== childTaskID)
        : null;

    const { error: updateError } = await supabase
        .from('parent_tasks')
        .update({ childTasks: updatedChildTasks })
        .eq('id', taskID);

    if (updateError) {
        console.log(updateError.message);
        return NextResponse.json({ error: updateError.message });
    }

    return NextResponse.json({ message: "Child Task successfully deleted" });
}