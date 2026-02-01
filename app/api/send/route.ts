import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
}

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not configured');
    return false;
  }

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    }
  );

  const data: TurnstileVerifyResponse = await response.json();
  return data.success;
}

export async function POST(req: Request) {
  try {
    const { name, email, message, role, turnstileToken } = await req.json();

    // Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Turnstile verification required' },
        { status: 400 }
      );
    }

    const isValidToken = await verifyTurnstileToken(turnstileToken);
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Turnstile verification failed' },
        { status: 403 }
      );
    }

    const data = await resend.emails.send({
      from: 'no-reply@ieeecsusf.com', // IEEE USF Website <no-reply@ieeecsusf.com>
      to: ['ieeecsusf@outlook.com'], // ieeecsusf@outlook.com
      replyTo: email,
      subject: `IEEE CS USF x ${name}`,
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
    return NextResponse.json({ error }, { status: 500 });
  }
}