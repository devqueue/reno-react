const axios = require('axios');

const API = axios.create({
    //baseURL: process.env.REACT_APP_API_URL
    baseURL: process.env.REACT_APP_API_SERVER_URL
});


let adminToken = JSON.parse(localStorage.getItem('reno-admin-token'))
if(!adminToken){
    adminToken = JSON.parse(sessionStorage.getItem("reno-merchant-token"));
}

// this is for using local storage in headers, otherwise it will not work
API.interceptors.request.use((req) => {
    if (localStorage.getItem('reno-admin-token') || sessionStorage.getItem("reno-admin-token")) {
        req.headers = {
                'authorization' : `Bearer ${adminToken}`,
                'reno-app-auth-token': localStorage.getItem("reno-admin-token") ? JSON.parse(localStorage.getItem("reno-admin-token")) : JSON.parse(sessionStorage.getItem("reno-admin-token")) ,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
    }
    return req;
});


// Admin Routes
const signInAdmin = (data) => API.post(`/api/v1/admins/signin`, data);
const getAllMerchants = () => API.get(`/api/v1/admins/getAllMerchants`);
const getAllCustomers = () => API.get(`/api/v1/admins/getAllCustomers`);
const disApproveAnyMerchant = (merchantId) => API.put(`/api/v1/admins/DisApproveNewMerchant/${merchantId}`);
const ApproveAnyMerchant = (merchantId) => API.put(`/api/v1/admins/ApproveNewMerchant/${merchantId}`);
const getAllQuotes = () => API.get(`/api/v1/admins/getAllQuotes`);
const approveMerchantQuote = (quoteId , status) => API.put(`/api/v1/quotes/sendAdminMerchantResponse/${quoteId}/${status}`);
const getRecentFinancialRequests = () => API.get(`/api/v1/admins/getAllRecentFinancialRequests`);
const approveAnyFinancialRequest = (quoteId, status) => API.put(`/api/v1/quotes/sendAdminResponse/${quoteId}/${status}`);
const getAllNotificationsOfAdmin = () => API.get(`/api/v1/notifications/getAllOfAdmin`);
const markNotificationsOfAdminRead = (notificationId) => API.put(`/api/v1/notifications/markNotificationOfAdminAsRead/${notificationId}`);



module.exports = {
    signInAdmin,
    getAllMerchants,
    disApproveAnyMerchant,
    ApproveAnyMerchant,
    getAllQuotes,
    approveMerchantQuote,
    getRecentFinancialRequests,
    approveAnyFinancialRequest,
    getAllNotificationsOfAdmin,
    markNotificationsOfAdminRead,
    getAllCustomers
}