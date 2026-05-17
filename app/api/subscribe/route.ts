import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Configure the transporter using env variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Cacao Noir" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Cacao Noir!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d0d; color: #fff; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #f97316, #ec4899); padding: 40px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px;">⚡ Cacao Noir</h1>
            <p style="margin: 8px 0 0; opacity: 0.9; font-size: 16px;">Future of Freshness</p>
          </div>
          <div style="padding: 40px;">
            <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 12px;">Thank you for reaching out! 🎉</h2>
            <p style="color: #aaa; line-height: 1.7; font-size: 16px;">
              We've received your message and are thrilled to have you as part of the Cacao Noir community.
              Our team will be in touch with you very soon with exclusive drops, fresh news, and all the latest updates.
            </p>
            <div style="margin: 32px 0; padding: 20px; background: #1a1a1a; border-radius: 12px; border-left: 4px solid #f97316;">
              <p style="margin: 0; font-size: 14px; color: #888;">Your registered email</p>
              <p style="margin: 4px 0 0; font-weight: 700; color: #fff;">${email}</p>
            </div>
            <p style="color: #aaa; font-size: 14px;">
              In the meantime, explore our premium range of cold-pressed juices at 
              <a href="http://localhost:3000/store" style="color: #f97316; text-decoration: none; font-weight: 700;">Cacao Noir Store</a>.
            </p>
          </div>
          <div style="padding: 20px 40px; background: #111; text-align: center; border-top: 1px solid #222;">
            <p style="margin: 0; color: #555; font-size: 12px;">© ${new Date().getFullYear()} Cacao Noir. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
