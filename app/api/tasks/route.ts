import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { childTask, isChildTask, isParentTask, parentTask } from "@/types/task";
import { auth } from "@clerk/nextjs/server";

async function getUserId() {
    const { userId } = await auth();
    return userId;
}

export async function GET() {
    const userId = await getUserId();

    try {
        const parentTasks = await sql<parentTask[]>`
            SELECT * FROM parent_tasks WHERE user_id = ${userId}
        `;
        return NextResponse.json(parentTasks);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const data: parentTask | childTask = await request.json();

    if (isParentTask(data)) {
        const { id, user_id, name, description, status, priority, deadline, childTasks, notes } = data;

        try {
            await sql`
                INSERT INTO parent_tasks (id, user_id, name, description, status, priority, deadline, "childTasks", notes)
                VALUES (
                    ${id}, ${user_id}, ${name}, ${description}, ${status}, ${priority}, ${deadline},
                    ${childTasks ? sql.array(childTasks) : null},
                    ${notes ? sql.array(notes) : null}
                )
            `;
            return NextResponse.json({ message: "Parent Task successfully created" }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: (error as Error).message }, { status: 400 });
        }
    } else if (isChildTask(data)) {
        const { id, name, description, progress, deadline, parentTask, notes } = data;

        try {
            await sql`
                INSERT INTO child_tasks (id, name, description, progress, deadline, "parentTask", notes)
                VALUES (
                    ${id}, ${name}, ${description}, ${progress}, ${deadline}, ${parentTask},
                    ${notes ? sql.array(notes) : null}
                )
            `;
            return NextResponse.json({ message: "Child Task successfully created" }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: (error as Error).message }, { status: 400 });
        }
    }

    return NextResponse.json({ error: "Insufficient data fir a task to be created" }, { status: 400 });
}
