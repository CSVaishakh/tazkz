import { NextRequest,NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {parentNotes,parentTask,childNotes,childTask} from "@/types/task";

export async function POST () {
    try{
        const data : parentTask | childTask |= await supabase
    }
}