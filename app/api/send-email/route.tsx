import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(ip: string): string {
  return `rate_limit_${ip}`
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const limit = rateLimitStore.get(key)

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return false
  }

  if (limit.count >= 5) {
    // 5 requests per minute
    return true
  }

  limit.count++
  return false
}

function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
    }

    const body = await request.json()
    const { type, name, phone, email, pickupLocation, dropoffLocation, desiredTime, message } = body

    // Validate required fields
    if (!type || !name || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true }) // Silent success for bots
    }

    // Sanitize inputs
    const sanitizedData = {
      type: sanitizeInput(type),
      name: sanitizeInput(name),
      phone: sanitizeInput(phone),
      email: email ? sanitizeInput(email) : "",
      pickupLocation: pickupLocation ? sanitizeInput(pickupLocation) : "",
      dropoffLocation: dropoffLocation ? sanitizeInput(dropoffLocation) : "",
      desiredTime: desiredTime ? sanitizeInput(desiredTime) : "",
      message: message ? sanitizeInput(message) : "",
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email content
    const subject = `${sanitizedData.type} - ${sanitizedData.name}`
    const html = `
      <h2>${sanitizedData.type}</h2>
      <p><strong>Name:</strong> ${sanitizedData.name}</p>
      <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
      ${sanitizedData.email ? `<p><strong>Email:</strong> ${sanitizedData.email}</p>` : ""}
      ${sanitizedData.pickupLocation ? `<p><strong>Pickup Location:</strong> ${sanitizedData.pickupLocation}</p>` : ""}
      ${sanitizedData.dropoffLocation ? `<p><strong>Dropoff Location:</strong> ${sanitizedData.dropoffLocation}</p>` : ""}
      ${sanitizedData.desiredTime ? `<p><strong>Desired Time:</strong> ${sanitizedData.desiredTime}</p>` : ""}
      ${sanitizedData.message ? `<p><strong>Message:</strong> ${sanitizedData.message}</p>` : ""}
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "cash2dayaz@gmail.com",
      replyTo: sanitizedData.email || undefined,
      subject,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
