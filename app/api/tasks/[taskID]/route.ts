import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { parentTask } from "@/types/task";

async function getUserID () {
    const { userId } = await auth();
    return userId
}

export async function GET(taskID: string) {
    const userID = await getUserID();

    const { data, error } = await supabase
        .from('parent_tasks')
        .select('*')
        .eq('userID', userID)
        .eq('id', taskID);

    if(error){
        return NextResponse.json({error : error.message })
    }
    const task : parentTask[] = data || []
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