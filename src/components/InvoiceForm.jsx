// InvoiceForm.jsx  – ONLY CSS replaced with Tailwind dark-gradient classes
// (structure untouched)
import React, { useContext, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import upl2 from '../assets/upl2.jpg';

const InvoiceForm = () => {
    const { invoiceData, setInvoiceData } = useContext(AppContext);

    const addItem = () => {
        setInvoiceData((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                { name: '', quantity: '', amount: '', description: '', total: 0 },
            ],
        }));
    };

    const deleteItem = (index) => {
        const items = invoiceData.items.filter((_, i) => i !== index);
        setInvoiceData((prev) => ({ ...prev, items }));
    };

    const handleChange = (section, field, value) => {
        setInvoiceData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const handleSameAsBilling = () => {
        setInvoiceData((prev) => ({
            ...prev,
            shipping: { ...prev.billing },
        }));
    };

    const handleItemChange = (index, field, value) => {
        const items = [...invoiceData.items];
        items[index][field] = value;
        if (field === 'quantity' || field === 'amount') {
            items[index].total =
                (Number(items[index].quantity) || 0) * (Number(items[index].amount) || 0);
        }
        setInvoiceData((prev) => ({ ...prev, items }));
    };

    const calculateTotals = () => {
        const subtotal = invoiceData.items.reduce(
            (sum, item) => sum + (item.total || 0),
            0
        );
        const taxRate = Number(invoiceData.tax || 0);
        const taxAmount = (subtotal * taxRate) / 100;
        const grandTotal = subtotal + taxAmount;
        return { grandTotal, subtotal, taxAmount };
    };

    const { subtotal, grandTotal, taxAmount } = calculateTotals();

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () =>
                setInvoiceData((prev) => ({ ...prev, logo: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (!invoiceData.invoice.number) {
            const randomNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
            setInvoiceData((prev) => ({
                ...prev,
                invoice: { ...prev.invoice, number: randomNumber },
            }));
        }
    }, []);

    return (
        <div className="invoiceform container py-4 text-white">
            {/* COMPANY LOGO */}
            <div className="mb-6">
                <h5 className="text-lg font-semibold mb-2">Company Logo</h5>
                <div className="flex items-center gap-3">
                    <label htmlFor="image" className="cursor-pointer">
                        <img
                            src={invoiceData.logo}
                            alt="Upload"
                            className="w-24 h-24 rounded-md border border-dashed border-slate-600 bg-slate-800 object-cover"
                        />
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="image"
                        hidden
                        onChange={handleLogoUpload}
                    />
                </div>
            </div>

            {/* COMPANY INFO */}
            <div className="mb-6">
                <h5 className="text-lg font-semibold mb-2">Your Company</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                        type="text"
                        className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Company Name"
                        onChange={(e) => handleChange('company', 'name', e.target.value)}
                        value={invoiceData.company.name}
                    />
                    <input
                        type="text"
                        className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Company Phone"
                        onChange={(e) => handleChange('company', 'phone', e.target.value)}
                        value={invoiceData.company.phone}
                    />
                    <input
                        type="text"
                        className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Company Address"
                        onChange={(e) => handleChange('company', 'address', e.target.value)}
                        value={invoiceData.company.address}
                    />
                </div>
            </div>

            {/* Bill to */}
            <div className="mb-6">
                <h5 className="text-lg font-semibold mb-2">Bill To</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                        type="text"
                        className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Name"
                        onChange={(e) => handleChange('billing', 'name', e.target.value)}
                        value={invoiceData.billing.name}
                    />
                    <input
                        type="text"
                        className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Phone Number"
                        onChange={(e) => handleChange('billing', 'phone', e.target.value)}
                        value={invoiceData.billing.phone}
                    />
                    <input
                        type="text"
                        className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Address"
                        onChange={(e) => handleChange('billing', 'address', e.target.value)}
                        value={invoiceData.billing.address}
                    />
                </div>
            </div>

            {/* Ship to */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h5 className="text-lg font-semibold">Ship To</h5>
                    <label className="flex items-center text-sm">
                        <input
                            type="checkbox"
                            className="mr-2 accent-indigo-500"
                            id="SameasBilling"
                            onChange={handleSameAsBilling}
                        />
                        Same as Billing
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                        type="text"
                        className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Name"
                        onChange={(e) => handleChange('shipping', 'name', e.target.value)}
                        value={invoiceData.shipping.name}
                    />
                    <input
                        type="text"
                        className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Phone Number"
                        onChange={(e) => handleChange('shipping', 'phone', e.target.value)}
                        value={invoiceData.shipping.phone}
                    />
                    <input
                        type="text"
                        className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Shipping Address"
                        onChange={(e) => handleChange('shipping', 'address', e.target.value)}
                        value={invoiceData.shipping.address}
                    />
                </div>
            </div>

            {/* Invoice details */}
            <div className="mb-6">
                <h5 className="text-lg font-semibold mb-2">Invoice Info</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <label className="text-sm text-slate-400 mb-1 block">Invoice Number</label>
                        <input
                            type="text"
                            disabled
                            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-slate-300"
                            value={invoiceData.invoice.number}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-slate-400 mb-1 block">Invoice Date</label>
                        <input
                            type="date"
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={invoiceData.invoice.date}
                            onChange={(e) => handleChange('invoice', 'date', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-slate-400 mb-1 block">Due Date</label>
                        <input
                            type="date"
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={invoiceData.invoice.dueDate}
                            onChange={(e) => handleChange('invoice', 'dueDate', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Item details */}
            <div className="mb-6">
                <h5 className="text-lg font-semibold mb-2">Item Details</h5>
                {invoiceData.items.map((item, index) => (
                    <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                            <input
                                type="text"
                                className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Item Name"
                                value={item.name}
                                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                            />
                            <input
                                type="number"
                                className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Qty"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            />
                            <input
                                type="number"
                                className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Amount"
                                value={item.amount}
                                onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                            />
                            <input
                                type="number"
                                className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-slate-300"
                                placeholder="Total"
                                value={item.total}
                                disabled
                            />
                        </div>
                        <div className="flex gap-3 items-start">
              <textarea
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={2}
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              />
                            {invoiceData.items.length > 1 && (
                                <button
                                    type="button"
                                    className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                                    onClick={() => deleteItem(index)}
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={addItem}
                >
                    Add Item
                </button>
            </div>

            {/* Bank Account Details */}
            <div className="mb-6">
                <h5 className="text-lg font-semibold mb-2">Bank Account Details</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                        type="text"
                        className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Account Holder Name"
                        onChange={(e) => handleChange('account', 'name', e.target.value)}
                        value={invoiceData.account.name}
                    />
                    <input
                        type="text"
                        className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Account Number"
                        onChange={(e) => handleChange('account', 'number', e.target.value)}
                        value={invoiceData.account.number}
                    />
                    <input
                        type="text"
                        className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Branch / IFSC Code"
                        onChange={(e) => handleChange('account', 'ifsccode', e.target.value)}
                        value={invoiceData.account.ifsccode}
                    />
                </div>
            </div>

            {/* Totals */}
            <div className="mb-6">
                <h5 className="text-lg font-semibold mb-2">Totals</h5>
                <div className="flex justify-end">
                    <div className="w-full md:w-1/2 space-y-2 text-right">
                        <div className="flex justify-between">
                            <span>SubTotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="taxInput" className="mr-2">
                                Tax Rate (%)
                            </label>
                            <input
                                type="number"
                                className="w-20 bg-slate-800 border border-slate-700 rounded-md px-2 py-1 text-right"
                                placeholder="0"
                                id="taxInput"
                                onChange={(e) =>
                                    setInvoiceData((prev) => ({ ...prev, tax: e.target.value }))
                                }
                                value={invoiceData.tax}
                            />
                        </div>
                        <div className="flex justify-between">
                            <span>Tax Amount</span>
                            <span>₹{taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Grand Total</span>
                            <span> ₹ {grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
                <h5 className="text-lg font-semibold mb-2">Notes</h5>
                <textarea
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    name="notes"
                    onChange={(e) =>
                        setInvoiceData((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    value={invoiceData.notes}
                />
            </div>
        </div>
    );
};

export default InvoiceForm;