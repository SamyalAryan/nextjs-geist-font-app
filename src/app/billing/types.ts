export interface InvoiceItem {
  description: string
  quantity: number
  rate: number
  amount: number
}

export interface Invoice {
  companyName: string
  companyAddress: string
  companyPhone: string
  companyEmail: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  customerName: string
  customerAddress: string
  customerPhone: string
  customerEmail: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  terms: string
  bankDetails: string
  signature: string
}
