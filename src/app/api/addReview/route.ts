import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
      // Parse the request body
      const { productId, title, content, rating } = await request.json();
      // Add review to the database
      const review = await prisma.review.create({
        data: {
          title,
          content,
          rating,
          productId,
        },
      });

      return NextResponse.json({
        message: "Review registered successfully",
        review: {
          title: review.title,
          content:review.content,
          id: review.id
        },
      }, {
        status: 200
      });
    } catch (error) {
      console.error("Error adding review:", error);
      return NextResponse.json({
        message: "Error adding review:" + error,
      }, {
        status: 500
      });
    }
  }
