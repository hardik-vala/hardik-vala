import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const resend = new Resend(process.env.RESEND_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL;
const TO_EMAIL = process.env.TO_EMAIL;

async function sendNotificationEmail(email: string) {
  if (!FROM_EMAIL || !TO_EMAIL) {
    console.error("FROM_EMAIL or TO_EMAIL is not defined");
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: "🎉 New inner circle subscriber!",
      html: `
        <p>Someone just joined your inner circle: <strong>${email}</strong></p>
      `,
    });
    console.log("Notification email sent successfully");
  } catch (emailError) {
    console.error("Failed to send notification email: ", emailError);
  }
}

export async function POST(request: Request) {
  if (!FROM_EMAIL || !TO_EMAIL) {
    console.error("FROM_EMAIL or TO_EMAIL is not defined");
    return NextResponse.json(
      { success: false, error: "An error occurred while subscribing." },
      { status: 500 }
    );
  }
  
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    console.log("NEW SUBSCRIBER:", email);

    await sendNotificationEmail(email);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Subscribe error: ", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while subscribing." },
      { status: 500 }
    );
  }
}
