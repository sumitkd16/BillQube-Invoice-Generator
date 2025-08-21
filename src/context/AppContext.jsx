import { useState, createContext } from "react";

export const AppContext = createContext();

export  const initialInvoiceData ={
    title: 'New Invoice',
    billing:{name: "", phone: "", address: ""},
    shipping:{name: "", phone: "", address: ""},
    invoice:{number: "", date: "", dueDate: ""},
    account:{name: "", number: "", ifsccode: ""},
    company:{name: "", phone: "", address: ""},
    tax: 0,
    notes: "",
    items:[
        {name: "", quantity: "", amount: "",description:"",total: 0},
    ],
    logo: " "

}

export const AppContextProvider = ({ children }) => {
    const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");
    const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
    const [selectedTemplate, setSelectedTemplate] = useState("Template1");

    const baseURL =import.meta.env.VITE_APP_BASE_URL;

    const contextValue = {
        invoiceTitle, setInvoiceTitle,
        invoiceData, setInvoiceData,
        selectedTemplate, setSelectedTemplate,
        initialInvoiceData,
        baseURL,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
