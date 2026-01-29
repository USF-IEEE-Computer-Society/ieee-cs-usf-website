import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message, role } = await req.json();

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // IEEE USF Website <no-reply@ieeecsusf.com>
      to: ['leonardonascimento02025@gmail.com'], // ieeecsusf@outlook.com
      replyTo: email,
      subject: `New Contact from ${name} (${role})`,
      html: `
        <h2>New Message from Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}