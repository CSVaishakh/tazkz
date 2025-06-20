import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { childTask } from "@/types/task";
import { auth } from "@clerk/nextjs/server";


async function getUserID () {
    const { userId } = await auth();
    return userId;
}

export async function GET(request: NextRequest, { params }: {params: {taskID: string, parentTask: string}}) {
    const userID = await getUserID();
    const { taskID, parentTask } = await params;

    const { data,error } = await supabase
        .from( 'child_tasks' )
        .select('*')
        .eq('id',userID)
        .eq('parentTask',parentTask)
    console.log(data);
    if (error){
        return NextResponse.json({ error: error.message })
    }
    
    const task: childTask = data[0] || null;
    return NextResponse.json(task);
}

export async function DELETE(request: NextRequest){
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
    return NextResponse.redirect(new URL(`/tasks/${data.parentTask}`, request.url))
}