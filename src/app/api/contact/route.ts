import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactBody {
  name: string;
  email: string;
  project: string;
  message?: string;
}

function sanitize(text: string): string {
  return text
    .replace(/&/g, "\x26amp;")
    .replace(/</g, "\x26lt;")
    .replace(/>/g, "\x26gt;")
    .replace(/"/g, "\x26quot;")
    .replace(/'/g, "\x26#039;");
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json();
    const { name, email, project, message } = body;

    if (!name || !email || !project) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, project" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Log submission
    console.log("=== NEW CASTING REQUEST ===");
    console.log("From:", name, `(${email})`);
    console.log("Project:", project);
    console.log("Message:", message || "N/A");

    let emailSent = false;

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const sName = sanitize(name);
        const sEmail = sanitize(email);
        const sProject = sanitize(project);
        const sMessage = message ? sanitize(message) : "";

        const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    body{font-family:'Helvetica Neue',Arial,sans-serif;background:#0a0a0a;padding:40px}
    .container{max-width:600px;margin:0 auto;background:#1a1a2e;border-radius:16px;border:1px solid rgba(220,38,38,0.3);overflow:hidden}
    .header{background:linear-gradient(135deg,#dc2626,#991b1b);padding:24px;text-align:center}
    .header h1{margin:0;color:#fff;font-size:20px;text-transform:uppercase;letter-spacing:2px}
    .header p{margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:13px}
    .body{padding:24px}
    .field{margin-bottom:16px;border-bottom:1px solid rgba(220,38,38,0.15);padding-bottom:12px}
    .label{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:rgba(220,38,38,0.7);font-weight:800}
    .value{font-size:15px;color:#e2e8f0;margin-top:4px;font-weight:600}
    .msg-box{background:rgba(0,0,0,0.3);border-radius:12px;padding:16px;margin-top:8px;border-left:3px solid #dc2626;color:#e2e8f0}
    .footer{text-align:center;padding:16px;font-size:11px;color:rgba(255,255,255,0.3);border-top:1px solid rgba(220,38,38,0.15)}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Casting Request</h1>
      <p>From puskarbhatt.com</p>
    </div>
    <div class="body">
      <div class="field"><div class="label">Name</div><div class="value">${sName}</div></div>
      <div class="field"><div class="label">Email</div><div class="value">${sEmail}</div></div>
      <div class="field"><div class="label">Project / Role</div><div class="value">${sProject}</div></div>
      ${sMessage ? `<div class="field"><div class="label">Message</div><div class="msg-box">${sMessage}</div></div>` : ""}
      <div style="margin-top:20px;padding:12px;background:rgba(220,38,38,0.1);border-radius:8px;text-align:center;border:1px solid rgba(220,38,38,0.2)">
        <p style="margin:0;color:#dc2626;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Reply to: ${sEmail}</p>
      </div>
    </div>
    <div class="footer">Puskar Bhatta &mdash; Cinematic Villain Portfolio</div>
  </div>
</body>
</html>`;

        await transporter.sendMail({
          from: `"Casting Request" <${process.env.SMTP_USER}>`,
          to: "bhattapuskar@gmail.com",
          replyTo: email,
          subject: `New Casting Request from ${sName}`,
          html,
        });

        emailSent = true;
        console.log("Email sent successfully to bhattapuskar@gmail.com");
      } catch (err) {
        console.error("Email send failed:", err);
      }
    } else {
      console.log("SMTP not configured — submission logged only");
    }

    return NextResponse.json({
      success: true,
      message: emailSent
        ? "Your casting request has been sent successfully! We'll get back to you soon."
        : "Your request has been received. (Email service not configured — submission logged.)",
    });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

