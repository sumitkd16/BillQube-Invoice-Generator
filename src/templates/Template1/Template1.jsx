// Template1.jsx
import React from 'react'

const Template1 = ({ data }) => {
    return (
        <div className="max-w-[800px] w-full mx-auto my-4 px-4 py-3 border border-slate-300 rounded-lg bg-white text-slate-900">

            {/* ┌────────────── HEADER ──────────────┐ */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                {/* LEFT: Logo → Company Name → Phone */}
                <div className="space-y-1">
                    {data.companyLogo && (
                        <img
                            src={data.companyLogo}
                            alt="Company Logo"
                            className="w-28 h-28 object-contain mb-2"
                        />
                    )}
                    <h2 className="text-lg font-bold text-orange-600">{data.companyName}</h2>
                    <p className="text-sm">Phone: {data.companyPhone}</p>
                </div>

                {/* RIGHT: Invoice Meta */}
                <div className="text-right space-y-0.5 text-sm">
                    <h1 className="text-xl font-bold text-orange-600 mb-1">Invoice</h1>
                    <p><strong>Invoice#:</strong> {data.invoiceNumber}</p>
                    <p><strong>Invoice Date:</strong> {data.invoiceDate}</p>
                    <p><strong>Due Date:</strong> {data.paymentDate}</p>
                </div>
            </div>
            {/* └────────────────────────────────────┘ */}

            <hr className="my-3 border-orange-600" />

            {/* Billing, table, totals, bank, notes … unchanged */}
            {/* (keep the rest of your existing JSX exactly as-is) */}

            {/* Billing Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {data.shippingName && data.shippingPhone && data.shippingAddress && (
                    <div className="p-3 rounded bg-orange-50">
                        <h3 className="text-base font-bold text-orange-600 mb-2">Shipped To</h3>
                        <p className="font-medium text-sm">{data.shippingName}</p>
                        <p className="text-sm">{data.shippingAddress}</p>
                        <p className="text-sm">Phone: {data.shippingPhone}</p>
                    </div>
                )}
                <div className="p-3 rounded bg-orange-50">
                    <h3 className="text-base font-bold text-orange-600 mb-2">Billed To</h3>
                    <p className="font-medium text-sm">{data.billingName}</p>
                    <p className="text-sm">{data.billingAddress}</p>
                    <p className="text-sm">Phone: {data.billingPhone}</p>
                </div>
            </div>

            {/* Items table */}
            <div className="overflow-x-auto mb-4">
                <table className="w-full border border-slate-300">
                    <thead>
                    <tr className="bg-orange-600 text-white">
                        <th className="p-2 text-left text-sm">Item / Description</th>
                        <th className="p-2 text-center text-sm">Qty.</th>
                        <th className="p-2 text-right text-sm">Rate</th>
                        <th className="p-2 text-right text-sm">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.items.map((item, index) => (
                        <tr key={index} className="border-t border-slate-300">
                            <td className="p-2 text-sm">{item.name}</td>
                            <td className="p-2 text-center text-sm">{item.quantity || 0}</td>
                            <td className="p-2 text-right text-sm">₹{Number(item.amount || 0).toFixed(2)}</td>
                            <td className="p-2 text-right text-sm">
                                ₹{(Number(item.quantity || 0) * Number(item.amount || 0)).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-4">
                <div className="p-3 max-w-[300px] w-full bg-orange-50 text-sm font-bold">
                    <div className="flex justify-between mb-2">
                        <span>Sub Total:</span>
                        <span>₹{Number(data.subtotal || 0).toFixed(2)}</span>
                    </div>
                    {data.tax > 0 && (
                        <div className="flex justify-between mb-2">
                            <span>Tax ({data.tax}%):</span>
                            <span>₹{Number(data.taxAmount || 0).toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-orange-600 text-lg">
                        <span>Total</span>
                        <span>₹{Number(data.total || 0).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Bank / Notes */}
            {(data.accountName || data.accountNumber || data.accountIFscCode) && (
                <div className="mt-4">
                    <h3 className="text-base font-bold text-orange-600 mb-2">Bank Account Details</h3>
                    {data.accountName && (
                        <p className="text-sm"><strong>Account Holder:</strong> {data.accountName}</p>
                    )}
                    {data.accountNumber && (
                        <p className="text-sm"><strong>Account Number:</strong> {data.accountNumber}</p>
                    )}
                    {data.accountIFscCode && (
                        <p className="text-sm"><strong>IFSC/Branch Code:</strong> {data.accountIFscCode}</p>
                    )}
                </div>
            )}
            {data.notes && (
                <div className="mt-4">
                    <h3 className="text-base font-bold text-orange-600 mb-2">Remarks</h3>
                    <p className="text-sm">{data.notes}</p>
                </div>
            )}
        </div>
    )
}

export default Template1