import { NextRequest,NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { childTask, isParentTask, parentTask } from "@/types/task";
import { auth } from "@clerk/nextjs/server";

async function User() {
    const userID = await auth();
    return userID
}

export async function GET() {
    const { data, error } = await supabase
        .from('parent_tasks')
        .select('*')
        .eq('user_id', await User())

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    const parentTasks: parentTask[] = data || [];
    return NextResponse.json(parentTasks)

}

export async function POST (request: NextRequest) {
    const data: parentTask | childTask = await request.json();

    if(isParentTask(data)){
        const { id,user_id,name,description,status,priority,deadline,child_tasks,note_id } = data;

        const { error } = await supabase
            .from('parent_tasks')
            .insert([{
                id,
                user_id,
                name,
                description,
                status,
                priority,
                deadline,
                child_tasks,
                note_id
            },
        ]);
        
        if (error) {
            return NextResponse.json({ error: error.message });
        }

        return NextResponse.json({message: "Task successfully created"});

    }
    return NextResponse.json({error: "Insufficient data fir a task to be created"});
}

