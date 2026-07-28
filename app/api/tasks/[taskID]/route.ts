import { NextResponse, NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { parentTask, childTask } from "@/types/task";

async function getUserID() {
    const { userId } = await auth();
    return userId;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ taskID: string }> }) {
    const userID = await getUserID();
    const { taskID } = await params;

    try {
        const rows = await sql<parentTask[]>`
            SELECT * FROM parent_tasks WHERE user_id = ${userID} AND id = ${taskID}
        `;

        if (rows.length === 0) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ taskID: string }> }) {
    const userID = await getUserID();
    const { taskID } = await params;
    const data = await request.json();
    const { name, description, status, priority, deadline, childTasks, notes } = data;

    try {
        const rows = await sql`
            UPDATE parent_tasks
            SET name = ${name},
                description = ${description},
                status = ${status},
                priority = ${priority},
                deadline = ${deadline},
                "childTasks" = ${childTasks ? sql.array(childTasks) : null},
                notes = ${notes ? sql.array(notes) : null}
            WHERE user_id = ${userID} AND id = ${taskID}
        `;

        if (rows.count === 0) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Parent Task successfully updated" });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ taskID: string }> }) {
    const userID = await getUserID();
    const { taskID } = await params;

    try {
        const rows = await sql`
            DELETE FROM parent_tasks WHERE id = ${taskID} AND user_id = ${userID}
        `;

        if (rows.count === 0) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.redirect(new URL(`/tasks`, request.url));
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

export async function POST(request: NextRequest) {
    const data: childTask = await request.json();
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
