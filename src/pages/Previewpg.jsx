// PreviewPage.jsx
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { templates } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import InvoicePreview from '../components/InvoicePreview';
import {
    deleteInvoice,
    saveInvoice,
    sendInvoice
} from '../service/InvoiceService';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
// import html2canvas from 'html2canvas'
import html2canvas from 'html2canvas-pro';
import { uploadInvoiceThumbnail } from '../service/cloudinaryService';
import { generatePdfFromElement } from '../util/pdfUtils';
import { useAuth, useUser } from '@clerk/clerk-react';

const Previewpg = () => {
    const previewRef = useRef();
    const { selectedTemplate, setSelectedTemplate, invoiceData, baseURL } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [downloading, setDownloading] = useState(false);
    const [showModal, setShowModal ] = useState(false);
    const [customerEmail, setCustomerEmail] = useState("");
    const [emailing, setEmailing] = useState(false);
    const { getToken } = useAuth();
    const {user} = useUser();

    const handleSaveAndExit = async () => {
        try{
            setLoading(true);
            // TODO: create a thumbnail url
            const canvas = await html2canvas(previewRef.current, { //basically an image
                scale: 2,
                useCORS: true,
                backgroundColor: "#fff",
                scrollY: -window.scrollY,
            });
            const imageData = canvas.toDataURL("image/png");
            const thumbnailUrl = await uploadInvoiceThumbnail(imageData);

            const payload = {
                ...invoiceData,
                clerkId: user.id,
                thumbnailUrl: thumbnailUrl,
                template : selectedTemplate,
            }
            const token = await getToken();
            const response = await saveInvoice(baseURL, payload,token);
            console.log(response.status);
            if(response && (response.status === 200 || response.status === 201)){
                console.log("Saving invoice with values: ", payload);
                toast.success("Invoice saved successfully.");
                navigate("/dashboard");
            } else {
                // throw new Error("Save Failed");
                toast.error("Something went wrong");
                console.error("Error occured: ", )
            }
        } catch(error) {
            console.error(error);
            toast.error("Failed to save invoice...", error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async () => {

        try{
            const token = await getToken();
            const response = await deleteInvoice(baseURL, invoiceData.id,token);
            if(response.status === 204){
                toast.success("Invoice deleted successfully");
                navigate('/dashboard');
            } else {
                toast.error("Unable to delete invoice");
            }
        } catch(error){
            toast.error("Failed to delete invoice", error.message);
        }
    }

    const handleDownlaodPdf = async () => {
        if(!previewRef.current) return;

        try{
            setDownloading(true);
            await generatePdfFromElement(previewRef.current, `invoice${Date.now()}.pdf`)
        } catch (error){
            toast.error("Failed to generate invoice", error.message);
        } finally {
            setDownloading(false);
        }
    }

    const handleSendEmail = async() => {
        if(!previewRef.current || !customerEmail) {
            toast.error("Please enter a valid email and try again");
        }
        try{
            setEmailing(true);
            const pdfBlob = await generatePdfFromElement(previewRef.current, `invoice${Date.now()}.pdf`, true);
            const formData = new FormData();
            formData.append("file", pdfBlob, `invoice__${Date.now()}.pdf`);
            formData.append("email", customerEmail);
            const token = await getToken();
            const response = await sendInvoice(baseURL, formData ,token);
            if(response.status === 200){
                toast.success("Email sent successfully");
                setShowModal(false);
                setCustomerEmail("");
            } else {
                toast.error("Failed to send email");
            }
        } catch(error){
            toast.error("Failed to send email", error.message);
        } finally {
            setEmailing(false);
        }
    }

    useEffect(() => {
        if (!invoiceData|| !invoiceData.items?.length){
            toast.error("invoice data is empty");
            navigate("/dashboard");
        }
    }, [invoiceData, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-slate-100 p-3 flex flex-col">
            {/* Action Buttons */}
            <div className="flex flex-col items-center mb-6 gap-4 pt-20 z-10">

                {/* List of Template buttons */}
                <div className="flex flex-wrap justify-center gap-2">
                    {templates.map(({id, label})=> (
                        <button
                            key={id}
                            onClick={() => setSelectedTemplate(id)}
                            style={{ minWidth: "100px", height: "38px" }}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition
                                ${selectedTemplate === id
                                ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* List of Action buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                    <button className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium flex items-center gap-2 hover:bg-indigo-700 transition"
                    onClick={handleSaveAndExit}
                    >
                        {loading && <Loader2 className="animate-spin" size={18} />}
                        Save and Exit
                    </button>

                    {invoiceData.id && <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition"
                                               onClick={handleDelete}>
                        Delete Invoice</button>}


                    <button className="bg-slate-600 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-500 transition"

                    onClick={()=> navigate("/dashboard")}
                    >
                        Back to Dashboard
                    </button>

                    <button className="bg-sky-600 text-white px-4 py-2 rounded-md text-sm hover:bg-sky-700 transition"
                    onClick={()=> setShowModal(true)}
                    >
                        Send Email
                    </button>

                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-emerald-700 transition" disabled={loading}
                    onClick={handleDownlaodPdf}>
                        {downloading && <Loader2 className="animate-spin" size={18} />}
                        {downloading ? "Downloading .....✌️" : "Download PDF"}
                    </button>
                </div>

                {/* Display the invoice preview */}
                <div className="flex-grow overflow-auto flex justify-center items-start from-gray-900 via-gray-950 to-black rounded-lg p-4 w-full">
                    <div ref={previewRef} className="bg-white rounded shadow-lg w-full max-w-2xl lg:max-w-3xl mx-auto">
                        <InvoicePreview invoiceData={invoiceData} template={selectedTemplate} />
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-lg p-6 w-full max-w-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h5 className="text-lg font-semibold text-white">Send Invoice</h5>
                            <button
                                className="text-slate-400 hover:text-white"
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Customer Email"
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                value={customerEmail}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
                                onClick={handleSendEmail}>
                                {emailing ? "Sending..." : "Send"}
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 rounded-md bg-slate-600 text-white text-sm hover:bg-slate-500"
                                onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default Previewpg