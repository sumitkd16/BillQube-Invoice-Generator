import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, initialInvoiceData } from '../context/AppContext.jsx';
import { toast } from 'react-hot-toast';
import { getAllInvoices } from '../service/InvoiceService';
import { Plus } from 'lucide-react';
import { formatDate } from '../util/formatInvoiceData.js';
import { useAuth } from '@clerk/clerk-react';

const Dashboard = () => {
    const [invoices, setInvoices] = useState([]);
    const { baseURL, setInvoiceData, setSelectedTemplate, setInvoiceTitle } =
        useContext(AppContext);
    const navigate = useNavigate();
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const token = await getToken();
                const response = await getAllInvoices(baseURL,token);
                setInvoices(response.data);
            } catch (error) {
                toast.error('Failed to load the invoices');
            }
        };
        fetchInvoices();
    }, [baseURL]);

    const handleViewClick = (invoice) => {
      setInvoiceData(invoice);
      setSelectedTemplate(invoice.template || 'template1');
      setInvoiceTitle(invoice.title || 'New Invoice');
      navigate('/preview');
    };

    const handleCreateNew = () => {
        // reset to initial stage from context
        setInvoiceTitle('New Invoice');
        setSelectedTemplate('template1');
        setInvoiceData(initialInvoiceData);
        navigate('/generate');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-slate-100">
            {/* Top spacer so the menubar doesn’t hide content */}
            <div className="h-20" />

            <div className="p-5 flex flex-wrap gap-4">
                {/* Create New Invoice card */}
                <div
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 h-[270px] flex flex-col items-center justify-center border-2 border-slate-700 rounded-lg shadow-lg cursor-pointer hover:border-indigo-500 hover:shadow-indigo-500/40 hover:-translate-y-1 transition duration-300"
                    onClick={handleCreateNew}
                >
                    <Plus size={48} className="text-indigo-400" />
                    <p className="mt-3 font-medium text-slate-300">Create New Invoice</p>
                </div>

                {/* Existing invoices */}
                {invoices.map((invoice, idx) => (
                    <div
                        key={idx}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 h-[270px] bg-slate-800 rounded-lg shadow-lg cursor-pointer hover:shadow-indigo-500/40 hover:-translate-y-1 transition duration-300"
                        onClick={() => handleViewClick(invoice)}
                    >
                        {invoice.thumbnailUrl && (
                            <img
                                src={invoice.thumbnailUrl}
                                alt="Invoice thumbnail"
                                className="w-full h-[200px] object-cover rounded-t-lg"
                            />
                        )}
                        <div className="p-3">
                            <h6 className="text-sm font-semibold text-slate-100 truncate">
                                {invoice.title || 'Invoice'}
                            </h6>
                            <small className="text-xs text-slate-400">
                                 {/*Last Updated: {formatDate(invoice.createdAt)}*/}
                                Last Updated: {new Date(invoice.createdAt).toLocaleDateString()}
                            </small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;