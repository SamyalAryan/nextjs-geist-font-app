"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { InvoicePreview } from "./invoice-preview"

export default function BillingPage() {
  const [previewMode, setPreviewMode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [invoice, setInvoice] = useState({
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    customerEmail: "",
    items: [{
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0
    }],
    subtotal: 0,
    tax: 0,
    total: 0,
    terms: "",
    bankDetails: "",
    signature: ""
  })

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...invoice.items]
    newItems[index] = {
      ...newItems[index],
      [field]: value
    }
    // Recalculate amount
    newItems[index].amount = Number(newItems[index].quantity) * Number(newItems[index].rate)
    
    setInvoice({
      ...invoice,
      items: newItems,
      subtotal: newItems.reduce((sum, item) => sum + item.amount, 0),
      total: newItems.reduce((sum, item) => sum + item.amount, 0) + invoice.tax
    })
  }

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        { description: "", quantity: 1, rate: 0, amount: 0 }
      ]
    })
  }

  const removeItem = (index: number) => {
    const newItems = [...invoice.items]
    newItems.splice(index, 1)
    setInvoice({
      ...invoice,
      items: newItems,
      subtotal: newItems.reduce((sum, item) => sum + item.amount, 0),
      total: newItems.reduce((sum, item) => sum + item.amount, 0) + invoice.tax
    })
  }

  const validateInvoice = () => {
    if (!invoice.companyName || !invoice.customerName || !invoice.items.length) {
      return 'Company name, customer name, and at least one item are required'
    }
    if (invoice.items.some(item => !item.description || item.rate <= 0)) {
      return 'All items must have a description and positive rate'
    }
    return null
  }

  const handleSubmit = async () => {
    const validationError = validateInvoice()
    if (validationError) {
      setSubmitError(validationError)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      const response = await fetch('/api/billing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoice),
      })

      if (!response.ok) {
        throw new Error(await response.text() || 'Failed to save invoice')
      }

      setSubmitSuccess(true)
    } catch (error) {
      console.error('Error saving invoice:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to save invoice')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create Invoice</h1>
        <Button 
          variant="outline"
          onClick={() => setPreviewMode(!previewMode)}
          disabled={isSubmitting}
        >
          {previewMode ? 'Edit Invoice' : 'Preview Invoice'}
        </Button>
      </div>

      {/* Status Messages */}
      {submitError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {submitError}
        </div>
      )}
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          Invoice saved successfully!
        </div>
      )}

      {/* Main Content */}
      {previewMode ? (
        <InvoicePreview invoice={invoice} />
      ) : (
        <div className="space-y-6">
          {/* Company and Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Company Information</h2>
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input 
                  value={invoice.companyName}
                  onChange={(e) => setInvoice({...invoice, companyName: e.target.value})}
                />
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Customer Information</h2>
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input 
                  value={invoice.customerName}
                  onChange={(e) => setInvoice({...invoice, customerName: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            {invoice.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-5">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Rate</Label>
                  <Input
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={item.amount}
                    readOnly
                  />
                </div>
                <div className="col-span-1 flex items-end">
                  <Button 
                    variant="destructive"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button onClick={addItem}>Add Item</Button>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <Label>Subtotal</Label>
              <Input value={invoice.subtotal} readOnly />
            </div>
            <div>
              <Label>Tax</Label>
              <Input 
                type="number" 
                value={invoice.tax}
                onChange={(e) => setInvoice({
                  ...invoice, 
                  tax: Number(e.target.value),
                  total: invoice.subtotal + Number(e.target.value)
                })}
              />
            </div>
            <div>
              <Label>Total</Label>
              <Input value={invoice.total} readOnly />
            </div>
          </div>

          {/* Additional Fields */}
          <div className="space-y-4 mb-8">
            <div>
              <Label>Terms & Conditions</Label>
              <Textarea
                value={invoice.terms}
                onChange={(e) => setInvoice({...invoice, terms: e.target.value})}
              />
            </div>
            <div>
              <Label>Bank Details</Label>
              <Textarea
                value={invoice.bankDetails}
                onChange={(e) => setInvoice({...invoice, bankDetails: e.target.value})}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? 'Saving...' : 'Save Invoice'}
            </Button>
          </div>
        </div>
      )}
    </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create Invoice</h1>
        <Button 
          variant="outline"
          onClick={() => setPreviewMode(!previewMode)}
          disabled={isSubmitting}
        >
          {previewMode ? 'Edit Invoice' : 'Preview Invoice'}
        </Button>
      </div>

      {submitError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {submitError}
        </div>
      )}
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          Invoice saved successfully!
        </div>
      )}

      {previewMode ? (
        <InvoicePreview invoice={invoice} />
      ) : (
        <div className="space-y-6">
          {/* Company and Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Company Information</h2>
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input 
                  value={invoice.companyName}
                  onChange={(e) => setInvoice({...invoice, companyName: e.target.value})}
                />
              </div>
              {/* Other company fields would go here */}
            </div>

            {/* Customer Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Customer Information</h2>
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input 
                  value={invoice.customerName}
                  onChange={(e) => setInvoice({...invoice, customerName: e.target.value})}
                />
              </div>
              {/* Other customer fields would go here */}
            </div>
          </div>
            <Label>Company Name</Label>
            <Input 
              value={invoice.companyName}
              onChange={(e) => setInvoice({...invoice, companyName: e.target.value})}
            />
          </div>
          {/* Add other company fields similarly */}
        </div>

        {/* Customer Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Customer Information</h2>
          <div className="space-y-2">
            <Label>Customer Name</Label>
            <Input 
              value={invoice.customerName}
              onChange={(e) => setInvoice({...invoice, customerName: e.target.value})}
            />
          </div>
          {/* Add other customer fields similarly */}
        </div>
      </div>

      {/* Invoice Items */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        {invoice.items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-5">
              <Label>Description</Label>
              <Input
                value={item.description}
                onChange={(e) => handleItemChange(index, "description", e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <Label>Rate</Label>
              <Input
                type="number"
                value={item.rate}
                onChange={(e) => handleItemChange(index, "rate", e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <Label>Amount</Label>
              <Input
                type="number"
                value={item.amount}
                readOnly
              />
            </div>
            <div className="col-span-1 flex items-end">
              <Button 
                variant="destructive"
                onClick={() => removeItem(index)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={addItem}>Add Item</Button>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <Label>Subtotal</Label>
          <Input value={invoice.subtotal} readOnly />
        </div>
        <div>
          <Label>Tax</Label>
          <Input 
            type="number" 
            value={invoice.tax}
            onChange={(e) => setInvoice({
              ...invoice, 
              tax: Number(e.target.value),
              total: invoice.subtotal + Number(e.target.value)
            })}
          />
        </div>
        <div>
          <Label>Total</Label>
          <Input value={invoice.total} readOnly />
        </div>
      </div>

      {/* Additional Fields */}
      <div className="space-y-4 mb-8">
        <div>
          <Label>Terms & Conditions</Label>
          <Textarea
            value={invoice.terms}
            onChange={(e) => setInvoice({...invoice, terms: e.target.value})}
          />
        </div>
        <div>
          <Label>Bank Details</Label>
          <Textarea
            value={invoice.bankDetails}
            onChange={(e) => setInvoice({...invoice, bankDetails: e.target.value})}
          />
        </div>
      </div>

      <Button onClick={handleSubmit}>Save Invoice</Button>
    </div>
  )
}
