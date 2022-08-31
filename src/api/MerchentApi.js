const axios = require('axios');

const API = axios.create({
    //baseURL: process.env.REACT_APP_API_URL
    baseURL: process.env.REACT_APP_API_SERVER_URL
});

const customerToken = JSON.parse(localStorage.getItem('reno-merchant-token'))


// this is for using local storage incls headers, otherwise it will not work
API.interceptors.request.use((req) => {
    if (localStorage.getItem('reno-merchant-token')) {
        req.headers = {
                'authorization' : `Bearer ${customerToken}`,
                'reno-app-merchant-auth-token': JSON.parse(localStorage.getItem('reno-merchant-token')),
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
    getSearchedRecords
}