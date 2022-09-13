const axios = require('axios');

const API = axios.create({
    //baseURL: process.env.REACT_APP_API_URL
    baseURL: process.env.REACT_APP_API_SERVER_URL
});

let merchantToken = JSON.parse(localStorage.getItem('reno-merchant-token'))
if(!merchantToken){
    merchantToken = JSON.parse(sessionStorage.getItem("reno-merchant-token"));
}


// this is for using local storage incls headers, otherwise it will not work
API.interceptors.request.use((req) => {
    if (localStorage.getItem('reno-merchant-token') || sessionStorage.getItem("reno-merchant-token")) {
        req.headers = {
                'authorization' : `Bearer ${merchantToken}`,
                'reno-app-merchant-auth-token': localStorage.getItem("reno-merchant-token") ? JSON.parse(localStorage.getItem("reno-merchant-token")) : JSON.parse(sessionStorage.getItem("reno-merchant-token")) ,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
    }
    return req;
});


// Merchant Routes
const signUpMerchant = (data) => API.post(`/api/v1/merchants/register`, data);
const signInMerchant = (data) => API.post(`/api/v1/merchants/signin`, data);
const sendNewQuoteRequest = (data) => API.post(`/api/v1/quotes/postNew`, data);
const getAllRecentSentQuotes = () => API.get(`/api/v1/quotes/getAllQuotesOfAMerchant`);
const getAllQuotesToBeDelivered = () => API.get(`/api/v1/quotes/getAllQuotesToBeDelivered`);
const changeStatusOfQuote = (quoteId, status) => API.put(`/api/v1/quotes/sendMerchantDeliveryResponse/${quoteId}/${status}`);
const getQuotesForHomeScreen = () => API.get(`/api/v1/quotes/getAllQuotesCountOfMerchant`);
const getAllNotificationsOfMerchant = () => API.get(`/api/v1/notifications/getAllOfAMerchant`);
const markNotificationsOfMerchantRead = (notificationId) => API.put(`/api/v1/notifications/markNotificationOfMerchantAsRead/${notificationId}`);
const getSearchedRecords = (filters) => API.get(`/api/v1/quotes/getAllFilteredRecords/${filters}`);
const addMerchantNewTicket = (data) => API.post(`/api/v1/issueTickets/addNewByMerchant`, data);
const getAllTicketsOfAMerchant = () => API.get(`/api/v1/issueTickets/getAllTicketsOfAMerchant`);
const checkCustomerExistsOrNot = (idCardNo) => API.get(`/api/v1/merchants/checkCustomerExistsOrNot/${idCardNo}`);
const addNewTicketResponse = (data) => API.post(`/api/v1/issueTicketsResponse/addNewResponseByMerchant`, data);
const getResponseOfAnyTicket = (ticketId) => API.get(`/api/v1/issueTicketsResponse/getAllResponseOnAnyTicketByMerchant/${ticketId}`);
const checkUserPassword = (password) => API.get(`/api/v1/merchants/checkPassword/${password}`);
const updateUserPassword = (password) => API.put(`/api/v1/merchants/updatePassword/${password}`);
const getMerchantDetails = () => API.get(`/api/v1/merchants/getMerchantDetails`);
const updateMerchantPic = (data) => API.put(`/api/v1/merchants/updateProfilePic`, data);
const updateMerchantDetails = (data) => API.put(`/api/v1/merchants/updateMerchantProfile`, data);



module.exports = {
    signUpMerchant,
    signInMerchant,
    sendNewQuoteRequest,
    getAllRecentSentQuotes,
    getAllQuotesToBeDelivered,
    changeStatusOfQuote,
    getQuotesForHomeScreen,
    getAllNotificationsOfMerchant,
    markNotificationsOfMerchantRead,
    getSearchedRecords,
    addMerchantNewTicket,
    getAllTicketsOfAMerchant,
    checkCustomerExistsOrNot,
    addNewTicketResponse,
    getResponseOfAnyTicket,
    checkUserPassword,
    updateUserPassword,
    getMerchantDetails,
    updateMerchantPic,
    updateMerchantDetails
}