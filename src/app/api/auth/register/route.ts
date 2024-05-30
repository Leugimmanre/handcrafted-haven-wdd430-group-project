import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Función de manejo para POST
export async function POST(request: Request) {
  try {
    const { username, email, password, role } = await request.json();
    // Validate password
    if (!password || password.length < 6) {
      return NextResponse.json({
        message: "The password must be at least 6 characters",
      }, {
        status: 400
      });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "A user with this email already exists.",
      },{
        status: 409
      });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user in the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Return success response
    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    }, {
      status: 200
    });


  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({
      error: "Error creating user",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
