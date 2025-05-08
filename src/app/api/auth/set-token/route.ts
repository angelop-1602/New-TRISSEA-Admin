import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { idToken } = await request.json();
  const response = NextResponse.json({ success: true });
  response.cookies.set("idToken", idToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return response;
} 