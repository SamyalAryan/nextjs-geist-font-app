import { NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = "8379715886:AAHa53GA_p3Ua9Xye_8QTlcbLHmS7SpXr6k"
const TELEGRAM_CHAT_ID = "Aryanriddamstoragebot_bot"

export async function POST(request: Request) {
  try {
    const invoiceData = await request.json()

    // Format the invoice data for Telegram message
    const messageText = formatInvoiceMessage(invoiceData)

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: "Markdown",
        }),
      }
    )

    if (!telegramResponse.ok) {
      throw new Error("Failed to send invoice to Telegram")
    }

    return NextResponse.json({
      success: true,
      message: "Invoice saved successfully",
    })
  } catch (error) {
    console.error("Error saving invoice:", error)
    return NextResponse.json(
      { success: false, message: "Failed to save invoice" },
      { status: 500 }
    )
  }
}

function formatInvoiceMessage(invoice: any): string {
  return `
*Invoice #${invoice.invoiceNumber}*

*Company:* ${invoice.companyName}
*Customer:* ${invoice.customerName}

*Items:*
${invoice.items
  .map(
    (item: any) =>
      `- ${item.description}: ${item.quantity} x ${item.rate} = ${item.amount}`
  )
  .join("\n")}

*Subtotal:* ${invoice.subtotal}
*Tax:* ${invoice.tax}
*Total:* ${invoice.total}

*Date:* ${invoice.invoiceDate}
*Due Date:* ${invoice.dueDate}
`
}
