import { NextRequest, NextResponse } from "next/server";

// TODO: Connect to Zoho email - user will provide API key

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, interest, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Log submission details
    console.log("Contact form submission:", {
      name,
      email,
      phone: phone || "(not provided)",
      company: company || "(not provided)",
      interest: interest || "(not provided)",
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your request has been received. We'll be in touch within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again or email us directly at info@tuckertools.com",
      },
      { status: 500 }
    );
  }
}
