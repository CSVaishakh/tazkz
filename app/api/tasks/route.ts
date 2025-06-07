import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { childTask, isChildTask, isParentTask, parentTask } from "@/types/task";
import { auth } from "@clerk/nextjs/server";

async function getUserId() {
    try {
        const { userId } = await auth();
        console.log('Auth result:', { userId });
        return userId;
    } catch (error) {
        console.error('Auth error:', error);
        return null;
    }
}

export async function GET() {
    try {
        console.log('GET /api/tasks called');
        
        const userId = await getUserId();
        console.log('User ID:', userId);
        
        if (!userId) {
            console.log('No user ID found');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('Querying Supabase for user:', userId);
        
        const { data, error } = await supabase
            .from('parent_tasks')
            .select('*')
            .eq('user_id', userId);

        console.log('Supabase query result:', { data, error });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        
        const parentTasks: parentTask[] = data || [];
        console.log('Returning tasks:', parentTasks);
        return NextResponse.json(parentTasks);
        
    } catch (error) {
        console.error('GET /api/tasks error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST (request: NextRequest) {
    const data: parentTask | childTask = await request.json();

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
            return NextResponse.json({ error: error.message });
        }

        return NextResponse.json({message: "Child Task successfully created"});        
    }
    return NextResponse.json({error: "Insufficient data fir a task to be created"});
}