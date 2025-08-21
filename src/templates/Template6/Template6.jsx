import React from 'react';

const Template6 = ({ data }) => (
    <div className="border border-purple-600 rounded-lg mx-auto my-4 px-4 py-3 w-full max-w-5xl bg-white">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                {data.companyLogo && (
                    <img src={data.companyLogo} alt="Logo" width={98} className="mb-2" />
                )}
                <h2 className="text-lg font-bold text-black mb-1">{data.companyName}</h2>
                <p className="text-black mb-1">{data.company}</p>
                <p className="text-black">Phone: {data.companyPhone}</p>
            </div>

            <div className="text-left md:text-right">
                <h1 className="text-xl font-bold text-black mb-2">Invoice</h1>
                <div className="text-sm text-black space-y-1">
                    <p><strong>Invoice#:</strong> {data.invoiceNumber}</p>
                    <p><strong>Invoice Date:</strong> {data.invoiceDate}</p>
                    <p><strong>Due Date:</strong> {data.paymentDate}</p>
                </div>
            </div>
        </div>

        <hr className="my-3 border-purple-600" />

        {/* Billing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {data.shippingName && (
                <div className="p-3 rounded bg-purple-50">
                    <h3 className="text-base font-bold text-black mb-2">Shipped To</h3>
                    <p className="font-semibold text-black">{data.shippingName}</p>
                    <p className="text-black">{data.shippingAddress}</p>
                    <p className="text-black">Phone: {data.shippingPhone}</p>
                </div>
            )}

            <div className="p-3 rounded bg-purple-50">
                <h3 className="text-base font-bold text-black mb-2">Billed To</h3>
                <p className="font-semibold text-black">{data.billingName}</p>
                <p className="text-black">{data.billingAddress}</p>
                <p className="text-black">Phone: {data.billingPhone}</p>
            </div>
        </div>

        {/* Items */}
        <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-neutral-300">
                <thead>
                <tr className="bg-purple-600 text-white">
                    <th className="p-2 text-left">Item#/Item description</th>
                    <th className="p-2 text-center">Qty.</th>
                    <th className="p-2 text-right">Rate</th>
                    <th className="p-2 text-right">Amount</th>
                </tr>
                </thead>
                <tbody className="text-neutral-800">
                {data.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-neutral-300">
                        <td className="p-2">{item.name}</td>
                        <td className="p-2 text-center">{item.qty || 0}</td>
                        <td className="p-2 text-right">₹{Number(item.amount || 0).toFixed(2)}</td>
                        <td className="p-2 text-right">
                            ₹{(Number(item.qty || 0) * Number(item.amount || 0)).toFixed(2)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-4">
            <div className="p-3 bg-purple-50 w-full max-w-xs text-neutral-800 space-y-1">
                <div className="flex justify-between">
                    <span>Sub Total:</span>
                    <span>₹{Number(data.subtotal || 0).toFixed(2)}</span>
                </div>
                {data.tax > 0 && (
                    <div className="flex justify-between">
                        <span>Tax ({data.tax}%):</span>
                        <span>₹{Number(data.taxAmount || 0).toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between font-bold text-purple-600">
                    <span>Total</span>
                    <span>₹{Number(data.total || 0).toFixed(2)}</span>
                </div>
            </div>
        </div>

        {/* Bank Details */}
        {(data.accountName || data.accountNumber) && (
            <div className="mt-4 text-neutral-800">
                <h3 className="text-base font-bold text-purple-600 mb-2">Bank Account Details</h3>
                {data.accountName && <p><strong>Account Holder:</strong> {data.accountName}</p>}
                {data.accountNumber && <p><strong>Account Number:</strong> {data.accountNumber}</p>}
                {data.accountIfscCode && <p><strong>IFSC/Branch Code:</strong> {data.accountIfscCode}</p>}
            </div>
        )}

        {/* Notes */}
        {data.notes && (
            <div className="mt-4 text-neutral-800">
                <h3 className="text-base font-bold text-purple-600 mb-2">Remarks</h3>
                <p>{data.notes}</p>
            </div>
        )}
    </div>
);

export default Template6;