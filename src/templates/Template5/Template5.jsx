import React from 'react';

const Template5 = ({ data }) => (
    <div className="border border-yellow-400 rounded-lg mx-auto my-4 px-4 py-3 w-full max-w-5xl bg-neutral-900">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                {data.companyLogo && (
                    <img src={data.companyLogo} alt="Logo" width={98} className="mb-2" />
                )}
                <h2 className="text-2xl font-bold text-zinc-100 mb-1">{data.companyName}</h2>
                <p className="text-zinc-100 mb-1">{data.company}</p>
                <p className="text-zinc-100">Phone: {data.companyPhone}</p>
            </div>

            <div className="text-left md:text-right">
                <h1 className="text-3xl font-bold text-yellow-400 mb-2">Invoice</h1>
                <div className="text-sm text-zinc-100 space-y-1">
                    <p><strong>Invoice#:</strong> {data.invoiceNumber}</p>
                    <p><strong>Invoice Date:</strong> {data.invoiceDate}</p>
                    <p><strong>Due Date:</strong> {data.paymentDate}</p>
                </div>
            </div>
        </div>

        <hr className="my-3 border-yellow-400" />

        {/* Billing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {data.shippingName && (
                <div className="p-3 rounded bg-neutral-800 text-zinc-100">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">Shipped To</h3>
                    <p className="font-semibold">{data.shippingName}</p>
                    <p>{data.shippingAddress}</p>
                    <p>Phone: {data.shippingPhone}</p>
                </div>
            )}

            <div className="p-3 rounded bg-neutral-800 text-zinc-100">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Billed To</h3>
                <p className="font-semibold">{data.billingName}</p>
                <p>{data.billingAddress}</p>
                <p>Phone: {data.billingPhone}</p>
            </div>
        </div>

        {/* Items */}
        <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-neutral-700">
                <thead>
                <tr className="bg-neutral-800 text-yellow-400">
                    <th className="p-2 text-left">Item#/Item&nbsp;description</th>
                    <th className="p-2 text-center">Qty.</th>
                    <th className="p-2 text-right">Rate</th>
                    <th className="p-2 text-right">Amount</th>
                </tr>
                </thead>
                <tbody className="text-zinc-100">
                {data.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-neutral-700">
                        <td className="p-2">{item.name}</td>
                        <td className="p-2 text-center">{item.quantity || 0}</td>
                        <td className="p-2 text-right">₹{Number(item.amount || 0).toFixed(2)}</td>
                        <td className="p-2 text-right">
                            ₹{(Number(item.quantity || 0) * Number(item.amount || 0)).toFixed(2)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-4">
            <div className="p-3 bg-neutral-800 w-full max-w-xs text-zinc-100 space-y-1">
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
                <div className="flex justify-between font-bold text-yellow-400">
                    <span>Total</span>
                    <span>₹{Number(data.total || 0).toFixed(2)}</span>
                </div>
            </div>
        </div>

        {/* Bank Details */}
        {(data.accountName || data.accountNumber) && (
            <div className="mt-4 text-zinc-100">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Bank Account Details</h3>
                {data.accountName && <p><strong>Account Holder:</strong> {data.accountName}</p>}
                {data.accountNumber && <p><strong>Account Number:</strong> {data.accountNumber}</p>}
                {data.accountIFscCode && <p><strong>IFSC/Branch Code:</strong> {data.accountIFscCode}</p>}
            </div>
        )}

        {/* Notes */}
        {data.notes && (
            <div className="mt-4 text-zinc-100">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Remarks</h3>
                <p>{data.notes}</p>
            </div>
        )}
    </div>
);

export default Template5;