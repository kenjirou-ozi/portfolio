import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Validation schema with Japanese error messages
const contactSchema = z.object({
  name: z.string().min(1, { message: 'お名前を入力してください' }),
  email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
  company: z.string().optional(),
  message: z.string().min(10, { message: 'お問い合わせ内容は10文字以上で入力してください' }),
  deadline: z.string().optional(),
  budget: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate input
    const validationResult = contactSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))

      return NextResponse.json(
        {
          success: false,
          message: '入力内容に問題があります',
          errors,
        },
        { status: 400 }
      )
    }

    const { name, email, company, message, deadline, budget }: ContactFormData =
      validationResult.data

    // Build email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00D9FF, #FF006E); padding: 20px; border-radius: 8px 8px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 16px; }
            .field-label { font-weight: bold; color: #555; margin-bottom: 4px; }
            .field-value { background: white; padding: 12px; border-radius: 4px; border: 1px solid #e0e0e0; }
            .message-content { white-space: pre-wrap; }
            .footer { margin-top: 20px; padding-top: 16px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>新しいお問い合わせ</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">お名前</div>
                <div class="field-value">${escapeHtml(name)}</div>
              </div>
              <div class="field">
                <div class="field-label">メールアドレス</div>
                <div class="field-value">${escapeHtml(email)}</div>
              </div>
              ${
                company
                  ? `
              <div class="field">
                <div class="field-label">会社名</div>
                <div class="field-value">${escapeHtml(company)}</div>
              </div>
              `
                  : ''
              }
              ${
                deadline
                  ? `
              <div class="field">
                <div class="field-label">ご希望納期</div>
                <div class="field-value">${escapeHtml(deadline)}</div>
              </div>
              `
                  : ''
              }
              ${
                budget
                  ? `
              <div class="field">
                <div class="field-label">予算感</div>
                <div class="field-value">${escapeHtml(budget)}</div>
              </div>
              `
                  : ''
              }
              <div class="field">
                <div class="field-label">お問い合わせ内容</div>
                <div class="field-value message-content">${escapeHtml(message)}</div>
              </div>
              <div class="footer">
                このメールはポートフォリオサイトのお問い合わせフォームから送信されました。
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.RESEND_TO_EMAIL || '',
      replyTo: email,
      subject: `[Portfolio] ${name}様からのお問い合わせ`,
      html: emailHtml,
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json(
        {
          success: false,
          message: 'メール送信に失敗しました。しばらく経ってからもう一度お試しください。',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'お問い合わせを送信しました。ありがとうございます。',
      id: data?.id,
    })
  } catch (error) {
    console.error('Contact form error:', error)

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: 'リクエストの形式が正しくありません。',
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: '予期しないエラーが発生しました。もう一度お試しください。',
      },
      { status: 500 }
    )
  }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char)
}
