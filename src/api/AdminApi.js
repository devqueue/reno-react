const axios = require('axios');

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL
    //baseURL: process.env.REACT_APP_API_SERVER_URL
});

const adminToken = JSON.parse(localStorage.getItem('reno-admin-token'))


// this is for using local storage in headers, otherwise it will not work
API.interceptors.request.use((req) => {
    if (localStorage.getItem('reno-admin-token')) {
        req.headers = {
                'authorization' : `Bearer ${adminToken}`,
                'reno-app-auth-token': JSON.parse(localStorage.getItem('reno-admin-token')),
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
    }
    return req;
});


// Admin Routes
const signInAdmin = (data) => API.post(`/api/v1/admins/signin`, data);
const getAllMerchants = () => API.get(`/api/v1/admins/getAllMerchants`);
const disApproveAnyMerchant = (merchantId) => API.put(`/api/v1/admins/DisApproveNewMerchant/${merchantId}`);
const ApproveAnyMerchant = (merchantId) => API.put(`/api/v1/admins/ApproveNewMerchant/${merchantId}`);
const getAllQuotes = () => API.get(`/api/v1/admins/getAllQuotes`);
const approveMerchantQuote = (quoteId) => API.put(`/api/v1/quotes/sendAdminMerchantResponse/${quoteId}`);



module.exports = {
    signInAdmin,
    getAllMerchants,
    disApproveAnyMerchant,
    ApproveAnyMerchant,
    getAllQuotes,
    approveMerchantQuote
}