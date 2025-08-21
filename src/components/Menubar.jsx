// Menubar.jsx
import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
    SignedIn,
    SignedOut,
    useAuth,
    useClerk,
    UserButton,
} from '@clerk/clerk-react';
import {AppContext} from "../context/AppContext.jsx";
import logo from '../assets/logo.png';


const Menubar = () => {
    const { isLoaded } = useAuth();
    const { openSignIn } = useClerk();
    const  {setInvoiceData,initialInvoiceData,setSelectedTemplate,setInvoiceTitle} = useContext(AppContext);
    const navigate = useNavigate();


    if (!isLoaded) return null;

    const handleLogin = () => openSignIn({});

    const handleGenerateClick = ()=>{
        setInvoiceData(initialInvoiceData);
        setSelectedTemplate("template1");
        setInvoiceTitle("New Invoice");

        navigate("/generate");
    }


    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-white font-bold text-xl tracking-tight no-underline"
                    >
                        <img src={logo} alt="BillQube Logo" className="h-8 w-8 rounded-full" />
                        <span>BillQube</span>
                    </Link>

                    {/* Nav cluster */}
                    <nav className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className="px-3 py-1.5 text-sm text-slate-300 hover:text-white border-b-2 border-transparent hover:border-indigo-500 transition-all no-underline"
                        >
                            Home
                        </Link>

                        <SignedIn>
                            <Link
                                to="/dashboard"
                                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white border-b-2 border-transparent hover:border-indigo-500 transition-all no-underline"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/generate"
                                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white border-b-2 border-transparent hover:border-indigo-500 transition-all no-underline"
                            onClick={handleGenerateClick}
                            >
                                Generate
                            </Link>
                            <UserButton />
                        </SignedIn>

                        <SignedOut>
                            <button
                                onClick={handleLogin}
                                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-sm font-semibold text-white hover:from-indigo-700 hover:to-purple-700 transition duration-200 shadow-md no-underline"
                            >
                                Login / Sign Up
                            </button>
                        </SignedOut>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Menubar;