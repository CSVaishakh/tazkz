import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { childTask, isChildTask, isParentTask, parentTask } from "@/types/task";
import { auth } from "@clerk/nextjs/server";

async function getUserId() {
    const { userId } = await auth();
    return userId;
}

export async function GET() {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from('parent_tasks')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        return NextResponse.json({ error: error.message });
    }
    const parentTasks: parentTask[] = data || [];
    return NextResponse.json(parentTasks);
}

export async function POST (request: NextRequest) {
    const data: parentTask | childTask = await request.json();
    console.log(data)

    if(isParentTask(data)){
        const { id,user_id,name,description,status,priority,deadline,childTasks,notes } = data;

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
                childTasks,
                notes
            },
        ]);
        
        if (error) {
            console.log(error.message)
            return NextResponse.json({ error: error.message });
        }

        return NextResponse.json({message: "Parent Task successfully created"});

    }else if(isChildTask(data)){
        const { id,name,description,progress,deadline,parentTask,notes } = data;

        const { error } = await supabase
            .from('child_tasks')
            .insert([{
                id,
                name,
                description,
                progress,
                deadline,
                parentTask,
                notes
            },
        ]);
        
        if (error) {
            console.log(error.message)
            return NextResponse.json({ error: error.message });
        }

        return NextResponse.json({message: "Child Task successfully created"});        
    }
    return NextResponse.json({error: "Insufficient data fir a task to be created"});
}