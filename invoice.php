<?php
// Invoice data structure
$invoice_data = [
    'company' => [
        'name' => 'TREE MOBILE',
        'tagline' => 'Thank you for shopping with us',
        'pan' => 'DTDPK2258F',
        'gstin' => '20DTDPK2258F1Z4',
        'phone' => '8581818121',
        'email' => 'treemobile.xtream@gmail.com',
        'address' => 'At - Tilta Chowk, Kamre, Beside Hot Lips, Ranchi, Jharkhand - 835222, Jharkhand'
    ],
    'invoice' => [
        'number' => '#811',
        'date' => '30/07/2025'
    ],
    'bill_to' => [
        'name' => 'Muneshwar Singh',
        'address' => 'Kamre, Ranchi, Jharkhand, 835222',
        'place_of_supply' => 'Jharkhand'
    ],
    'ship_to' => [
        'name' => 'Muneshwar Singh',
        'address' => 'Kamre, Ranchi, Jharkhand, 835222'
    ],
    'items' => [
        [
            'no' => 1,
            'name' => 'cellecore X1 plus',
            'hsn' => '85171400',
            'color' => 'black',
            'imei' => '353548501436043',
            'qty' => '1 PCS',
            'mrp' => 1749,
            'rate' => 931.36,
            'tax' => 167.64,
            'tax_percent' => 18,
            'total' => 1099
        ]
    ],
    'totals' => [
        'subtotal' => 167.64,
        'subtotal_qty' => 1,
        'subtotal_amount' => 1099,
        'taxable_amount' => 931.36,
        'cgst_rate' => 9,
        'cgst_amount' => 83.82,
        'sgst_rate' => 9,
        'sgst_amount' => 83.82,
        'total_amount' => 1099,
        'received_amount' => 1099,
        'balance' => 0,
        'amount_in_words' => 'One Thousand Ninety Nine Rupees'
    ],
    'bank_details' => [
        'name' => 'Tree mobile',
        'ifsc' => 'IBKL0000063',
        'account_no' => '0063102000039075',
        'bank_name' => 'IDBI,RANCHI'
    ],
    'payment' => [
        'qr_code' => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        'upi_id' => '7870003050@ybl'
    ],
    'terms' => [
        '1. Goods once sold will not be taken back or exchanged',
        '2. All disputes are subject to [Ranchi, Jharkhand] jurisdiction only'
    ]
];

function formatCurrency($amount) {
    return '₹ ' . number_format($amount, 2);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tax Invoice - <?php echo $invoice_data['invoice']['number']; ?></title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }

        .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border: 3px solid #d4af37;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        .invoice-header {
            background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
            padding: 20px;
            border-bottom: 2px solid #d4af37;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .company-logo {
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            border: 4px solid #333;
            flex-shrink: 0;
        }

        .company-info {
            flex: 1;
            margin-left: 20px;
        }

        .company-name {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
            letter-spacing: 2px;
        }

        .company-tagline {
            color: #666;
            margin-bottom: 15px;
            font-style: italic;
        }

        .company-details {
            font-size: 12px;
            color: #555;
            line-height: 1.6;
        }

        .tax-invoice {
            text-align: right;
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }

        .invoice-meta {
            display: flex;
            justify-content: space-between;
            padding: 15px 20px;
            background: #f9f9f9;
            border-bottom: 1px solid #ddd;
        }

        .invoice-meta div {
            font-size: 14px;
        }

        .invoice-meta strong {
            color: #333;
        }

        .billing-shipping {
            display: flex;
            padding: 20px;
            border-bottom: 1px solid #ddd;
        }

        .bill-to, .ship-to {
            flex: 1;
            padding-right: 20px;
        }

        .bill-to h3, .ship-to h3 {
            color: #333;
            margin-bottom: 10px;
            font-size: 16px;
        }

        .bill-to p, .ship-to p {
            color: #666;
            line-height: 1.5;
            font-size: 14px;
        }

        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }

        .items-table th {
            background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
            padding: 12px 8px;
            text-align: center;
            font-size: 12px;
            font-weight: bold;
            color: #333;
            border: 1px solid #ddd;
        }

        .items-table td {
            padding: 12px 8px;
            text-align: center;
            font-size: 12px;
            border: 1px solid #ddd;
            color: #555;
        }

        .items-table .item-name {
            text-align: left;
        }

        .subtotal-row {
            background: #f9f9f9;
            font-weight: bold;
        }

        .footer-section {
            display: flex;
            padding: 20px;
            background: #f9f9f9;
        }

        .left-footer {
            flex: 1;
            padding-right: 20px;
        }

        .right-footer {
            flex: 1;
            padding-left: 20px;
        }

        .terms h4, .bank-details h4, .totals h4 {
            color: #333;
            margin-bottom: 10px;
            font-size: 14px;
        }

        .terms ul {
            list-style: none;
            font-size: 12px;
            color: #666;
            line-height: 1.6;
        }

        .terms li {
            margin-bottom: 5px;
        }

        .bank-details p {
            font-size: 12px;
            color: #666;
            margin-bottom: 3px;
        }

        .totals-table {
            width: 100%;
            font-size: 12px;
            margin-bottom: 15px;
        }

        .totals-table td {
            padding: 5px 0;
            border-bottom: 1px solid #eee;
        }

        .totals-table .total-amount {
            font-weight: bold;
            font-size: 14px;
            color: #333;
            border-top: 2px solid #333;
            padding-top: 8px;
        }

        .payment-section {
            display: flex;
            align-items: center;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
        }

        .qr-code {
            width: 80px;
            height: 80px;
            background: #f0f0f0;
            border: 1px solid #ddd;
            margin-right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #999;
        }

        .payment-info {
            flex: 1;
        }

        .signature-section {
            text-align: right;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }

        .signature-box {
            display: inline-block;
            width: 200px;
            height: 80px;
            border: 1px solid #ddd;
            border-radius: 5px;
            position: relative;
            background: #fafafa;
        }

        .signature-text {
            position: absolute;
            bottom: 5px;
            right: 10px;
            font-size: 12px;
            color: #666;
        }

        .decorative-border {
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            border: 2px solid #d4af37;
            border-radius: 8px;
            pointer-events: none;
        }

        .amount-words {
            font-style: italic;
            color: #666;
            font-size: 12px;
            margin-top: 5px;
        }

        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .invoice-container {
                box-shadow: none;
                border: 2px solid #333;
            }
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="decorative-border"></div>
        
        <!-- Header -->
        <div class="invoice-header">
            <div class="company-logo">
                Tree<br>Mobile
            </div>
            <div class="company-info">
                <div class="company-name"><?php echo $invoice_data['company']['name']; ?></div>
                <div class="company-tagline"><?php echo $invoice_data['company']['tagline']; ?></div>
                <div class="company-details">
                    <strong>Pan No</strong> <?php echo $invoice_data['company']['pan']; ?> &nbsp;&nbsp;
                    <strong>GSTIN</strong> <?php echo $invoice_data['company']['gstin']; ?><br>
                    📞 <?php echo $invoice_data['company']['phone']; ?> &nbsp;&nbsp;
                    ✉️ <?php echo $invoice_data['company']['email']; ?><br>
                    📍 <?php echo $invoice_data['company']['address']; ?>
                </div>
            </div>
            <div class="tax-invoice">
                TAX INVOICE
            </div>
        </div>

        <!-- Invoice Meta -->
        <div class="invoice-meta">
            <div>
                <strong>Invoice No.</strong><br>
                <?php echo $invoice_data['invoice']['number']; ?>
            </div>
            <div>
                <strong>Invoice Date</strong><br>
                <?php echo $invoice_data['invoice']['date']; ?>
            </div>
        </div>

        <!-- Billing and Shipping -->
        <div class="billing-shipping">
            <div class="bill-to">
                <h3>Bill To</h3>
                <p>
                    <strong><?php echo $invoice_data['bill_to']['name']; ?></strong><br>
                    <?php echo $invoice_data['bill_to']['address']; ?><br>
                    <strong>Place of Supply</strong> <?php echo $invoice_data['bill_to']['place_of_supply']; ?>
                </p>
            </div>
            <div class="ship-to">
                <h3>Ship To</h3>
                <p>
                    <strong><?php echo $invoice_data['ship_to']['name']; ?></strong><br>
                    <?php echo $invoice_data['ship_to']['address']; ?>
                </p>
            </div>
        </div>

        <!-- Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Items</th>
                    <th>HSN No.</th>
                    <th>COLOUR</th>
                    <th>IMEI NO.</th>
                    <th>Qty.</th>
                    <th>MRP</th>
                    <th>Rate</th>
                    <th>Tax</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($invoice_data['items'] as $item): ?>
                <tr>
                    <td><?php echo $item['no']; ?></td>
                    <td class="item-name"><?php echo $item['name']; ?></td>
                    <td><?php echo $item['hsn']; ?></td>
                    <td><?php echo $item['color']; ?></td>
                    <td><?php echo $item['imei']; ?></td>
                    <td><?php echo $item['qty']; ?></td>
                    <td><?php echo $item['mrp']; ?></td>
                    <td><?php echo number_format($item['rate'], 2); ?></td>
                    <td><?php echo number_format($item['tax'], 2); ?><br><small>(<?php echo $item['tax_percent']; ?>%)</small></td>
                    <td><?php echo number_format($item['total']); ?></td>
                </tr>
                <?php endforeach; ?>
                
                <!-- Subtotal Row -->
                <tr class="subtotal-row">
                    <td colspan="5"><strong>SUBTOTAL</strong></td>
                    <td><strong><?php echo $invoice_data['totals']['subtotal_qty']; ?></strong></td>
                    <td></td>
                    <td></td>
                    <td><strong><?php echo formatCurrency($invoice_data['totals']['subtotal']); ?></strong></td>
                    <td><strong><?php echo formatCurrency($invoice_data['totals']['subtotal_amount']); ?></strong></td>
                </tr>
            </tbody>
        </table>

        <!-- Footer Section -->
        <div class="footer-section">
            <div class="left-footer">
                <div class="terms">
                    <h4>Terms & Conditions</h4>
                    <ul>
                        <?php foreach ($invoice_data['terms'] as $term): ?>
                        <li><?php echo $term; ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <div class="bank-details" style="margin-top: 20px;">
                    <h4>Bank Details</h4>
                    <p><strong>Name:</strong> <?php echo $invoice_data['bank_details']['name']; ?></p>
                    <p><strong>IFSC:</strong> <?php echo $invoice_data['bank_details']['ifsc']; ?></p>
                    <p><strong>Account No:</strong> <?php echo $invoice_data['bank_details']['account_no']; ?></p>
                    <p><strong>Bank Name:</strong> <?php echo $invoice_data['bank_details']['bank_name']; ?></p>
                </div>

                <div class="payment-section">
                    <div class="qr-code">QR Code</div>
                    <div class="payment-info">
                        <strong>Payment QR Code</strong><br>
                        <small>UPI ID: <?php echo $invoice_data['payment']['upi_id']; ?></small>
                    </div>
                </div>
            </div>

            <div class="right-footer">
                <div class="totals">
                    <table class="totals-table">
                        <tr>
                            <td>Taxable Amount</td>
                            <td style="text-align: right;"><?php echo formatCurrency($invoice_data['totals']['taxable_amount']); ?></td>
                        </tr>
                        <tr>
                            <td>CGST @<?php echo $invoice_data['totals']['cgst_rate']; ?>%</td>
                            <td style="text-align: right;"><?php echo formatCurrency($invoice_data['totals']['cgst_amount']); ?></td>
                        </tr>
                        <tr>
                            <td>SGST @<?php echo $invoice_data['totals']['sgst_rate']; ?>%</td>
                            <td style="text-align: right;"><?php echo formatCurrency($invoice_data['totals']['sgst_amount']); ?></td>
                        </tr>
                        <tr class="total-amount">
                            <td><strong>Total Amount</strong></td>
                            <td style="text-align: right;"><strong><?php echo formatCurrency($invoice_data['totals']['total_amount']); ?></strong></td>
                        </tr>
                        <tr>
                            <td>Received Amount</td>
                            <td style="text-align: right;"><?php echo formatCurrency($invoice_data['totals']['received_amount']); ?></td>
                        </tr>
                        <tr>
                            <td><strong>Balance</strong></td>
                            <td style="text-align: right;"><strong><?php echo formatCurrency($invoice_data['totals']['balance']); ?></strong></td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 15px;">
                        <strong>Total Amount (in words)</strong>
                        <div class="amount-words"><?php echo $invoice_data['totals']['amount_in_words']; ?></div>
                    </div>
                </div>

                <div class="signature-section">
                    <div class="signature-box">
                        <div class="signature-text">
                            Signature<br>
                            <strong>TREE MOBILE</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Print functionality
        function printInvoice() {
            window.print();
        }
        
        // Add print button (optional)
        document.addEventListener('DOMContentLoaded', function() {
            const container = document.querySelector('.invoice-container');
            const printBtn = document.createElement('button');
            printBtn.textContent = 'Print Invoice';
            printBtn.style.cssText = 'position: fixed; top: 20px; right: 20px; padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; z-index: 1000;';
            printBtn.onclick = printInvoice;
            document.body.appendChild(printBtn);
        });
    </script>
</body>
</html>