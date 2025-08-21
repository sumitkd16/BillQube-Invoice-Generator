const baseURL = import.meta.env.VITE_APP_BASE_URL;

import axios from "axios";

export  const saveInvoice = (baseURL,payload,token) => {
    return axios.post(`${baseURL}/invoices` , payload,{headers: {Authorization: `Bearer ${token}` }});
}

export const getAllInvoices = (baseUrl,token) => {
    return axios.get(`${baseURL}/invoices`, {headers: {Authorization: `Bearer ${token}` }} );
}

export const deleteInvoice = (baseUrl, id,token) => {
    return axios.delete(`${baseURL}/invoices/${id}`, {headers: {Authorization: `Bearer ${token}` }});
}

export const sendInvoice = (baseUrl, formData,token) => {
    return axios.post(`${baseURL}/invoices/sendinvoice`, formData, {headers: {Authorization: `Bearer ${token}` }});
}
