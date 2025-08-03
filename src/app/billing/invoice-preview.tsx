"use client"

import { Invoice, InvoiceItem } from "./types"

export function InvoicePreview({ invoice }: { invoice: Invoice }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{invoice.companyName}</h1>
          <p className="text-gray-600">{invoice.companyAddress}</p>
          <p className="text-gray-600">Phone: {invoice.companyPhone}</p>
          <p className="text-gray-600">Email: {invoice.companyEmail}</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-blue-600">INVOICE</h2>
          <p className="text-gray-600"># {invoice.invoiceNumber}</p>
          <p className="text-gray-600">Date: {invoice.invoiceDate}</p>
          <p className="text-gray-600">Due Date: {invoice.dueDate}</p>
        </div>
      </div>

      {/* Billing and Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold mb-2">Bill To:</h3>
          <p>{invoice.customerName}</p>
          <p>{invoice.customerAddress}</p>
          <p>Phone: {invoice.customerPhone}</p>
          <p>Email: {invoice.customerEmail}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-right">Quantity</th>
              <th className="p-3 text-right">Rate</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item: InvoiceItem, index: number) => (
              <tr key={index} className="border-b">
                <td className="p-3">{item.description}</td>
                <td className="p-3 text-right">{item.quantity}</td>
                <td className="p-3 text-right">{item.rate}</td>
                <td className="p-3 text-right">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2">
            <span>Subtotal:</span>
            <span>{invoice.subtotal}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Tax:</span>
            <span>{invoice.tax}</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-lg">
            <span>Total:</span>
            <span>{invoice.total}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Terms & Conditions</h3>
          <p className="text-gray-600">{invoice.terms}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Bank Details</h3>
          <p className="text-gray-600">{invoice.bankDetails}</p>
        </div>
      </div>

      {/* Signature */}
      <div className="mt-12 pt-8 border-t">
        <div className="w-64 mx-auto">
          <div className="h-16 border-b"></div>
          <p className="text-center mt-2">Authorized Signature</p>
        </div>
      </div>
    </div>
  )
}
