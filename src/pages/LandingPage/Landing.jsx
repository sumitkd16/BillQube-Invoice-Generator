import React from 'react';
import Menubar from "../../components/Menubar";
import dashboard from '../../assets/dashboard.png';
import previous from '../../assets/previous.png';
import send from '../../assets/send.png';
import easyfill from '../../assets/easyfill.png';
import {useNavigate} from "react-router-dom";
import {useClerk} from "@clerk/clerk-react";

const Landing = () => {
    const navigate = useNavigate();
    const { openSignIn ,isSignedIn } = useClerk();


    const handleGenerateInvoice = () => {
        if (isSignedIn) {
            // Redirect to the dashboard if the user is already signed in
            navigate('/dashboard');
        } else {
            // Open the sign-in modal if the user is not signed in
            openSignIn({});
        }
    };


    const steps = [
        {
            num: 1,
            title: 'Choose Template',
            desc: 'Browse our gallery of professionally designed templates. Pick one that matches your brand and style.',
        },
        {
            num: 2,
            title: 'Enter Details',
            desc: 'Quickly fill in your client’s information, item descriptions, quantities, and prices. Our intuitive form makes it a breeze.',
        },
        {
            num: 3,
            title: 'Preview Invoice',
            desc: 'See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.',
        },
        {
            num: 4,
            title: 'Download & Save',
            desc: 'Download your invoice as a PDF, send it directly via email, or save it for your records and future reference.',
        },
    ];

    const whyFeatures = [
        {
            title: 'Easy-to-fill invoice details',
            text: 'Curated list of templates from gallery. Add your logo and invoice details. Tailor fields to your needs.',
            img: easyfill,
        },
        {
            title: 'Beautiful Dashboard',
            text: 'Previously Saved Invoices With Thumbnail. Reuse and Track the Invoices',
            img: dashboard,
        },
    ];

    const invoiceActions = [
        {
            title: 'View previous invoices',
            text: 'Your saved invoices with thumbnail, reuse, track, and live-preview. Switch between invoices and one-click Save, Download, or Delete.',
            img: previous,
        },
        {
            title: 'Send invoices instantly',
            text: 'Send unlimited invoices instantly without leaving the app. One click to email PDFs and get paid faster.',
            img: send,
        },
    ];

    return (
        <section id="home" className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
            {/* Hero section */}
            <div className="pt-16 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                        <span className="block">One Stop Solution To Billing 🤑 &nbsp;</span>
                        <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Effortless Invoicing, Professional Results.
                        </span>
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-xl mx-auto">
                        Stop wrestling with spreadsheets. BillQube helps you create and send beautiful invoices in minutes, so you get paid faster.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">



                        <a
                            onClick={handleGenerateInvoice}
                            //href="/dashboard"
                            className="no-underline w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:from-indigo-700 hover:to-purple-700 transition"
                        >
                            Generate Your First Invoice
                        </a>
                        <a
                            href="#steps"
                            className="no-underline w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>

            {/* 4 Simple Steps Section */}
            <div id="steps" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                    Get Started in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">4 Simple Steps</span>
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-15">
                    {steps.map((step) => (
                        <div
                            key={step.num}
                            className="relative p-6 bg-slate-800/60 rounded-2xl shadow-lg border border-slate-700 hover:shadow-indigo-500/30 hover:shadow-lg hover:border-indigo-500 hover:scale-[1.02] transition-all duration-200"
                        >
                            <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-xs font-bold">
                                {step.num}
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                            <p className="mt-2 text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Choose BillQube? */}
            <div id="why" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                    Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">BillQube?</span>
                </h2>
                <div className="grid gap-10 md:grid-cols-2 items-center mt-15">
                    {whyFeatures.map((f) => (
                        <div key={f.title}
                             className="bg-slate-800/60 rounded-2xl shadow-lg border border-slate-700 overflow-hidden hover:shadow-indigo-500/30 hover:shadow-lg hover:border-indigo-500 hover:scale-[1.02] transition-all duration-200">
                            <img
                                src={f.img}
                                alt={f.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                                <p className="text-sm text-slate-400">{f.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Previous & Send */}
            <div id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className="grid gap-10 md:grid-cols-2 items-center">
                    {invoiceActions.map((f) => (
                        <div key={f.title}
                             className="bg-slate-800/60 rounded-2xl shadow-lg border border-slate-700 overflow-hidden hover:shadow-indigo-500/30 hover:shadow-lg hover:border-indigo-500 hover:scale-[1.02] transition-all duration-200">
                            <img
                                src={f.img}
                                alt={f.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                                <p className="text-sm text-slate-400">{f.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Final CTA */}
            <div className="py-20 text-center px-4">
                <h2 className="text-3xl font-bold mb-4">Ready to streamline your invoicing?</h2>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                    Join thousands of freelancers and small businesses who trust BillQube.
                </p>
                <a
                    href="/generate"
                    className="no-underline inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:from-indigo-700 hover:to-purple-700 transition"
                >
                    Start Generating Invoices Now
                </a>
            </div>

            <footer className="border-t border-slate-700/50 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-sm text-slate-400">
                    <p className="font-semibold text-slate-200 mb-1">BillQube</p>
                    <p>© 2025 BillQube. All Rights Reserved.</p>
                    <p className="mt-2">
                        Crafted with <span className="text-red-500">♥</span> for freelancers and small businesses.
                    </p>
                    <div className="flex space-x-5 mt-6 md:mt-0">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="no-underline text-gray-400 hover:text-teal-300 text-xl transition">🐦</a>
                        <a href="https://github.com/sumitkd16" target="_blank" rel="noreferrer" className="no-underline text-gray-400 hover:text-teal-300 text-xl transition">💼</a>
                        <a href="https://www.linkedin.com/in/sumitkumardutta16/" target="_blank" rel="noreferrer" className="no-underline text-gray-400 hover:text-teal-300 text-xl transition">🔗</a>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Landing;