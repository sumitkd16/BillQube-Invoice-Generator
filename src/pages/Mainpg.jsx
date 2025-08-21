// Mainpg.jsx  – only classes swapped to Tailwind + dark gradient theme
// structure & markup kept identical
import React from 'react';
import { Pencil } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import { useContext } from 'react';
import InvoiceForm from '../components/InvoiceForm.jsx';
import TemplateGrid from '../components/TemplateGrid.jsx';
import Menubar from '../components/Menubar.jsx';
//import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const Mainpg = () => {
    const [isEditingTitle, setEditingTitle] = React.useState(false);
    const navigate = useNavigate();
    const { invoiceTitle, setInvoiceTitle,
        invoiceData, setInvoiceData,
        setSelectedTemplate} = useContext(AppContext);

    const handleTemplateClick = (templateId)=> {
        const hasInvalidItem= invoiceData.items.some(
            (item) =>!item.quality || !item.amount
        );
        // if (hasInvalidItem) {
        //     toast.error("Please enter quantity and amount for all items.");
        //     return;
        // }

        setSelectedTemplate(templateId);
        navigate('/preview');
    }

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setInvoiceTitle(newTitle);
        setInvoiceData((prev) => ({ ...prev, title: newTitle }));
    };
    const handleTitleEdit = () => setEditingTitle(true);
    const handleTitleBlur = () => setEditingTitle(false);

    return (
        <>
            <main className="pt-16 min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
                <div className="max-w-7xl mx-auto">
                    {/* TITLE BAR */}
                    <div className="bg-slate-800/60 border border-slate-700 rounded-xl shadow-lg p-3 mb-6 flex items-center">
                        {isEditingTitle ? (
                            <input
                                type="text"
                                className="flex-1 bg-transparent border-0 outline-none text-white placeholder-slate-400 mr-2"
                                autoFocus
                                onBlur={handleTitleBlur}
                                onChange={handleTitleChange}
                                value={invoiceTitle}
                            />
                        ) : (
                            <>
                                <h5 className="mb-0 mr-2 text-white font-semibold">{invoiceTitle}</h5>
                                <button
                                    className="p-0 border-0 bg-transparent text-indigo-400 hover:text-indigo-300"
                                    onClick={handleTitleEdit}
                                >
                                    <Pencil size={20} />
                                </button>
                            </>
                        )}
                    </div>

                    {/* INVOICE FORM & TEMPLATE GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                        <div className="bg-slate-800/60 border border-slate-700 rounded-xl shadow-lg p-4 flex flex-col">
                            <InvoiceForm />
                        </div>
                        <div className="bg-slate-800/60 border border-slate-700 rounded-xl shadow-lg p-4 flex flex-col">
                            <TemplateGrid onTemplateClick={handleTemplateClick} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Mainpg;