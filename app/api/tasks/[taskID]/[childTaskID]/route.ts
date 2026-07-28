import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { childTask } from "@/types/task";
import { auth } from "@clerk/nextjs/server";

async function getUserID() {
    const { userId } = await auth();
    return userId;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ taskID: string; childTaskID: string }> }) {
    const userID = await getUserID();
    const { taskID, childTaskID } = await params;

    try {
        const rows = await sql<childTask[]>`
            SELECT ct.* FROM child_tasks ct
            JOIN parent_tasks pt ON pt.id = ct."parentTask"
            WHERE ct.id = ${childTaskID} AND ct."parentTask" = ${taskID} AND pt.user_id = ${userID}
        `;

        if (rows.length === 0) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ taskID: string; childTaskID: string }> }) {
    const userID = await getUserID();
    const { taskID, childTaskID } = await params;
    const data = await request.json();
    const { description, progress, deadline, notes } = data;

    try {
        const rows = await sql`
            UPDATE child_tasks ct
            SET description = ${description},
                progress = ${progress},
                deadline = ${deadline},
                notes = ${notes ? sql.array(notes) : null}
            FROM parent_tasks pt
            WHERE ct."parentTask" = pt.id
              AND ct.id = ${childTaskID}
              AND ct."parentTask" = ${taskID}
              AND pt.user_id = ${userID}
        `;

        if (rows.count === 0) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Child Task successfully updated" });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ taskID: string; childTaskID: string }> }) {
    const userID = await getUserID();
    const { taskID, childTaskID } = await params;

    try {
        const deleted = await sql`
            DELETE FROM child_tasks ct
            USING parent_tasks pt
            WHERE ct."parentTask" = pt.id
              AND ct.id = ${childTaskID}
              AND ct."parentTask" = ${taskID}
              AND pt.user_id = ${userID}
        `;

        if (deleted.count === 0) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        await sql`
            UPDATE parent_tasks
            SET "childTasks" = array_remove("childTasks", ${childTaskID})
            WHERE id = ${taskID} AND user_id = ${userID}
        `;

        return NextResponse.redirect(new URL(`/tasks/${taskID}`, request.url));
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
