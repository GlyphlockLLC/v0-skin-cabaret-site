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
    if (body[process.env.HONEYPOT_FIELD || "website"]) {
      return NextResponse.json({ success: true }) // Silent success for bots
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("[v0] Missing email credentials in environment variables")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
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

    console.log("[v0] Attempting to send email with data:", { type: sanitizedData.type, name: sanitizedData.name })

    // Create transporter using server-side environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.verify()
    console.log("[v0] Email transporter verified successfully")

    // Email content
    const subject = `Skin Cabaret - ${sanitizedData.type} - ${sanitizedData.name}`
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
          ${sanitizedData.type}
        </h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${sanitizedData.name}</p>
          <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
          ${sanitizedData.email ? `<p><strong>Email:</strong> ${sanitizedData.email}</p>` : ""}
          ${sanitizedData.pickupLocation ? `<p><strong>Pickup Location:</strong> ${sanitizedData.pickupLocation}</p>` : ""}
          ${sanitizedData.dropoffLocation ? `<p><strong>Dropoff Location:</strong> ${sanitizedData.dropoffLocation}</p>` : ""}
          ${sanitizedData.desiredTime ? `<p><strong>Desired Time:</strong> ${sanitizedData.desiredTime}</p>` : ""}
          ${sanitizedData.message ? `<p><strong>Message:</strong> ${sanitizedData.message}</p>` : ""}
        </div>
        <p style="color: #666; font-size: 12px;">
          <strong>Timestamp:</strong> ${new Date().toLocaleString()}
        </p>
      </div>
    `

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "cash2dayaz@gmail.com",
      replyTo: sanitizedData.email || process.env.EMAIL_USER,
      subject,
      html,
    })

    console.log("[v0] Email sent successfully:", result.messageId)
    return NextResponse.json({ success: true, messageId: result.messageId })
  } catch (error) {
    console.error("[v0] Email error:", error)
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
