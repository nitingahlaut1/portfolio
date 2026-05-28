import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass || emailPass === "your-gmail-app-password-here") {
      console.warn("SMTP credentials are not configured in environment variables.");
      return NextResponse.json(
        { error: "Email service is not configured on the server. Please set EMAIL_USER and EMAIL_PASS environment variables." },
        { status: 500 }
      );
    }

    // Create a Nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${emailUser}>`, // To prevent Gmail from rejecting unverified from addresses, we set from to the user, with custom name
      replyTo: email,
      to: "nitingahlaut81@gmail.com",
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px; background-color: #ffffff;">
          <h2 style="color: #0ca5e9; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">New Message from Portfolio</h2>
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0ca5e9; text-decoration: none;">${email}</a></p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #0ca5e9; border-radius: 4px;">
            <p style="white-space: pre-wrap; margin: 0; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 11px; color: #999; margin: 0;">This email was sent automatically from your portfolio website contact form.</p>
        </div>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email." },
      { status: 500 }
    );
  }
}
