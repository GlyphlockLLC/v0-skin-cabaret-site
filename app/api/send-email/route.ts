import { type NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, email, subject, message } = await request.json()

  if (!email || !message) {
    return NextResponse.json({ ok: false, error: 'Email and message are required' }, { status: 400 })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@yourdomain.dev',
      to: process.env.MAIL_TO!,
      subject: subject || 'New message from your website',
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json({ ok: false, error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error in send-email route:', error)
    return NextResponse.json({ ok: false, error: 'An unexpected error occurred' }, { status: 500 })
  }
}
