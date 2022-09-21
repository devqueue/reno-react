const axios = require('axios');

const API = axios.create({
    //baseURL: process.env.REACT_APP_API_URL
    baseURL: process.env.REACT_APP_API_SERVER_URL
});

let customerToken = JSON.parse(localStorage.getItem('reno-customer-token'))
if(!customerToken){
    customerToken = JSON.parse(sessionStorage.getItem("reno-customer-token"));
}


// this is for using local storage in headers, otherwise it will not work
API.interceptors.request.use((req) => {
    if (localStorage.getItem('reno-customer-token') || sessionStorage.getItem("reno-customer-token")) {
        req.headers = {
                'authorization' : `Bearer ${customerToken}`,
                'reno-app-customer-auth-token': localStorage.getItem("reno-customer-token") ? JSON.parse(localStorage.getItem("reno-customer-token")) : JSON.parse(sessionStorage.getItem("reno-customer-token")),
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
    }
    return req;
});


// Customer Routes
const signUpCustomer = (data) => API.post(`/api/v1/customers/register`, data);
const signInCustomer = (data) => API.post(`/api/v1/customers/signin`, data);
const signInCustomerWithCode = (data) => API.post(`/api/v1/customers/signinWithCode`, data);
const getTodayReceivedQuotes = () => API.get(`/api/v1/quotes/getAllQuotesOfACustomerOfToday`);
const getReceivedQuotesPrevious = () => API.get(`/api/v1/quotes/getAllQuotesOfACustomer`);
const denyAnyQuote = (quoteId) => API.put(`/api/v1/quotes/quoteDenyByCustomer/${quoteId}`);
const sendResponseOnQuote = (quoteId , data) => API.put(`/api/v1/quotes/sendCustomerResponse/${quoteId}`, data);
const getAllTodayFinancialRequestSent = () => API.get(`/api/v1/quotes/getAllFinancingOfQuotesOfACustomerToday`);
const getAllFinancialRequestSent = () => API.get(`/api/v1/quotes/getAllFinancingOfQuotesOfACustomer`);
const getRecentQuotesDeliveredToACustomer = () => API.get(`/api/v1/quotes/getAllRecentQuotesDeliveredToACustomer`);
const deliveryConfirmationOfAQuote = (quoteId) => API.put(`/api/v1/quotes/sendCustomerDeliveryResponse/${quoteId}`);
const getAllRecentQuotesForHomeScreen = () => API.get(`/api/v1/quotes/getAllQuotesOfCustomerRecent`);
const getUpcomingPaymentsOfQuotes = () => API.get(`/api/v1/quotes/getAllNearDuePaymentsofACustomer`);
const getAllTravelingQuotes = () => API.get(`/api/v1/quotes/getAllTravelingOfCustomer`);
const getAllNotificationsOfCustomer = () => API.get(`/api/v1/notifications/getAllOfACustomer`);
const markNotificationsOfMerchantRead = (notificationId) => API.put(`/api/v1/notifications/markNotificationOfCustomerAsRead/${notificationId}`);
const ApproveDisproveDelivery = (quoteId, status) => API.put(`/api/v1/quotes/sendCustomerDeliveryResponse/${quoteId}/${status}`);
const getDashboardData = () => API.get(`/api/v1/quotes/getAllFinancedAmtOfCustomer`);
const addCustomerNewTicket = (data) => API.post(`/api/v1/issueTickets/adNewByCustomer`, data);
const getAllTicketsOfACustomer = () => API.get(`/api/v1/issueTickets/getAllTicketsOfACustomer`);
const addNewTicketResponse = (data) => API.post(`/api/v1/issueTicketsResponse/addNewResponseByCustomer`, data);
const getResponseOfAnyTicket = (ticketId) => API.get(`/api/v1/issueTicketsResponse/getAllResponseOnAnyTicketByCustomer/${ticketId}`);
const checkUserPassword = (password) => API.get(`/api/v1/customers/checkPassword/${password}`);
const updateUserPassword = (password) => API.put(`/api/v1/customers/updatePassword/${password}`);
const getCustomerDetails = () => API.get(`/api/v1/customers/getCustomerDetails`);
const updateCustomerPic = (data) => API.put(`/api/v1/customers/updateProfilePic`, data);
const updateCustomerDetails = (data) => API.put(`/api/v1/customers/updateCustomerProfile`, data);
const getSingleQuoteDetails = (quoteId) => API.get(`/api/v1/quotes/getSingleQuoteDetails/${quoteId}`);
const makeNewPayment = (quoteId) => API.post(`/api/v1/quotesHistory/addNewPaymentHistoryToAQuoteHistory/${quoteId}`);
//const getAllPaymentsHistory = (quoteId) => API.get(`/api/v1/quotesHistory/getAllPaymentHistoryOfAQuote/${quoteId}`);
const getAllPaymentsHistoryOfAnyCustomer = () => API.get(`/api/v1/quotesHistory/getAllUpcomingPaymentsOfCustomer`);




module.exports = {
    signUpCustomer,
    signInCustomer,
    getTodayReceivedQuotes,
    getReceivedQuotesPrevious,
    denyAnyQuote,
    sendResponseOnQuote,
    getAllTodayFinancialRequestSent,
    getAllFinancialRequestSent,
    getRecentQuotesDeliveredToACustomer,
    deliveryConfirmationOfAQuote,
    getAllRecentQuotesForHomeScreen,
    getUpcomingPaymentsOfQuotes,
    getAllTravelingQuotes,
    getAllNotificationsOfCustomer,
    markNotificationsOfMerchantRead,
    ApproveDisproveDelivery,
    getDashboardData,
    addCustomerNewTicket,
    getAllTicketsOfACustomer,
    addNewTicketResponse,
    getResponseOfAnyTicket,
    checkUserPassword,
    updateUserPassword,
    getCustomerDetails,
    updateCustomerPic,
    updateCustomerDetails,
    getSingleQuoteDetails,
    makeNewPayment,
    getAllPaymentsHistoryOfAnyCustomer,
    signInCustomerWithCode
}