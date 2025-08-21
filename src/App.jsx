import {BrowserRouter, Routes,Route} from "react-router-dom";
import Menubar from "./components/Menubar.jsx";
import {Toaster} from "react-hot-toast";
import {Home} from "lucide-react";
import Landing from "./pages/LandingPage/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Mainpg from "./pages/Mainpg.jsx";
import Previewpg from "./pages/Previewpg.jsx";
import UserSyncHandler from "./components/UserSyncHandler.jsx";
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';

const App = () => {
    return (
        <BrowserRouter>
            <UserSyncHandler />
            <Menubar />
            <Toaster />
            <Routes>
                <Route path="/" element={<Landing/>} />
                <Route path="/dashboard" element={
                    <>

                        <SignedIn>
                            <Dashboard />
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn />
                        </SignedOut>

                    </>
                } />
                <Route path="/generate" element={
                    <>

                        <SignedIn>
                            <Mainpg />
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn/>
                        </SignedOut>

                    </>
                } />
                <Route path="/preview" element={
                    <>

                        <SignedIn>
                            <Previewpg/>
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn/>
                        </SignedOut>
                    </>
                } />

            </Routes>
        </BrowserRouter>
    )
}
export default App

