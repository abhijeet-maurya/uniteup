import { connectDB } from "@/lib/mongoDB";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        
        const body = await request.json();
        
        const user = await User.create(body);
        
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: "Failed to create user", details: error.message },
            { status: 500 }
        );
    }
}
