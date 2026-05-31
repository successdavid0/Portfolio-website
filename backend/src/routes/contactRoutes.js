import { Router } from 'express'
import nodemailer from 'nodemailer'

const router = Router()

const createTransport = () =>
  nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' })
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const smtpConfigured = process.env.SMTP_USER && process.env.SMTP_PASS

  if (!smtpConfigured) {
    console.warn('SMTP not configured — contact form message received but not sent:', { name, email, subject })
    return res.json({ message: 'Received (SMTP not configured on server)' })
  }

  try {
    const transporter = createTransport()
    const to = process.env.CONTACT_TO || process.env.SMTP_USER

    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      replyTo: `"${name}" <${email}>`,
      to,
      subject: `[Portfolio] ${subject || 'New message'} — from ${name}`,
      text:    `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px">
          <h2 style="color:#f59e0b;border-bottom:2px solid #f59e0b;padding-bottom:8px">
            New Portfolio Message
          </h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#666;width:80px">Name</td><td><strong>${name}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#666">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            ${subject ? `<tr><td style="padding:6px 0;color:#666">Subject</td><td>${subject}</td></tr>` : ''}
          </table>
          <div style="margin-top:20px;padding:16px;background:#f9f9f9;border-left:4px solid #f59e0b;white-space:pre-wrap">${message}</div>
          <p style="color:#999;font-size:12px;margin-top:24px">Sent from your portfolio contact form</p>
        </div>
      `,
    })

    res.json({ message: 'Message sent successfully' })
  } catch (err) {
    console.error('Email send error:', err)
    res.status(500).json({ error: 'Failed to send email. Try contacting directly.' })
  }
})

export default router
