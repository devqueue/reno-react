const axios = require("axios");

const API = axios.create({
  //baseURL: process.env.REACT_APP_API_URL
  baseURL: process.env.REACT_APP_API_SERVER_URL,
});

let adminToken = JSON.parse(localStorage.getItem("reno-admin-token"));
if (!adminToken) {
  adminToken = JSON.parse(sessionStorage.getItem("reno-merchant-token"));
}

// this is for using local storage in headers, otherwise it will not work
API.interceptors.request.use((req) => {
  if (
    localStorage.getItem("reno-admin-token") ||
    sessionStorage.getItem("reno-admin-token")
  ) {
    req.headers = {
      authorization: `Bearer ${adminToken}`,
      "reno-app-auth-token": localStorage.getItem("reno-admin-token")
        ? JSON.parse(localStorage.getItem("reno-admin-token"))
        : JSON.parse(sessionStorage.getItem("reno-admin-token")),
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }
  return req;
});

// Admin Routes
const signInAdmin = (data) => API.post(`/api/v1/admins/signin`, data);
const getAllMerchants = () => API.get(`/api/v1/admins/getAllMerchants`);
const getAllMerchantsMatching = (text) =>
  API.get(`/api/v1/admins/getAllMerchantsMatching/${text}`);
const getAllCustomers = () => API.get(`/api/v1/admins/getAllCustomers`);
const getAllCustomersMatching = (text) =>
  API.get(`/api/v1/admins/getAllCustomersMatching/${text}`);
const disApproveAnyMerchant = (merchantId) =>
  API.put(`/api/v1/admins/DisApproveNewMerchant/${merchantId}`);
const ApproveAnyMerchant = (merchantId) =>
  API.put(`/api/v1/admins/ApproveNewMerchant/${merchantId}`);
const getAllQuotes = () => API.get(`/api/v1/admins/getAllQuotes`);
const approveMerchantQuote = (quoteId, status) =>
  API.put(`/api/v1/quotes/sendAdminMerchantResponse/${quoteId}/${status}`);
const getRecentFinancialRequests = () =>
  API.get(`/api/v1/admins/getAllRecentFinancialRequests`);
const approveAnyFinancialRequest = (quoteId, status) =>
  API.put(`/api/v1/quotes/sendAdminResponse/${quoteId}/${status}`);
const getAllNotificationsOfAdmin = () =>
  API.get(`/api/v1/notifications/getAllOfAdmin`);
const readAllNotificationOfAdmin = () =>
  API.get(`/api/v1/notifications/readAllNotificationOfAdmin`);
const markNotificationsOfAdminRead = (notificationId) =>
  API.put(
    `/api/v1/notifications/markNotificationOfAdminAsRead/${notificationId}`
  );
const sendContactUsEmail = (data) =>
  API.put(`/api/v1/admins/sendContactUsEmail`, data);
const getAllTicketsForAdmin = () =>
  API.get(`/api/v1/issueTickets/getAllTicketsForAdmin`);
const addNewTicketResponse = (data) =>
  API.post(`/api/v1/issueTicketsResponse/addNewResponseByAdmin`, data);
const getResponseOfAnyTicket = (ticketId) =>
  API.get(
    `/api/v1/issueTicketsResponse/getAllResponseOnAnyTicketByAdmin/${ticketId}`
  );
const changeStatusOfATicket = (ticketId, status) =>
  API.put(`/api/v1/issueTickets/changeStatusOfATicket/${ticketId}/${status}`);
const checkUserPassword = (password) =>
  API.get(`/api/v1/admins/checkPassword/${password}`);
const updateUserPassword = (password) =>
  API.put(`/api/v1/admins/updatePassword/${password}`);
const sendMyCustomerForgetPassword = (email) =>
  API.put(`/api/v1/admins/sendCustomerForgetPassword/${email}`);
const verifyCustomerPIN = (email, pin) =>
  API.put(`/api/v1/admins/verifyCustomerPIN/${email}/${pin}`);
const updateCustomerPassword = (email, password) =>
  API.put(`/api/v1/admins/updateCustomerPassword/${email}/${password}`);
const sendMyMerchantForgetPassword = (email) =>
  API.put(`/api/v1/admins/sendMerchantForgetPassword/${email}`);
const verifyMerchantPIN = (email, pin) =>
  API.put(`/api/v1/admins/verifyMerchantPIN/${email}/${pin}`);
const updateMerchantPassword = (email, password) =>
  API.put(`/api/v1/admins/updateMerchantPassword/${email}/${password}`);
const getAdminDetails = () => API.get(`/api/v1/admins/getAdminDetails`);
const updateAdminPic = (data) =>
  API.put(`/api/v1/admins/updateProfilePic`, data);
const updateAdminDetails = (data) =>
  API.put(`/api/v1/admins/updateAdminProfile`, data);
const getSingleQuoteDetails = (quoteId) =>
  API.get(`/api/v1/admins/getSingleQuoteDetails/${quoteId}`);
const changeStatusOfAnyCustomer = (customerId) =>
  API.put(`/api/v1/customers/changeStatusOfAnyCustomer/${customerId}`);

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
  getAllCustomers,
  sendContactUsEmail,
  getAllTicketsForAdmin,
  addNewTicketResponse,
  getResponseOfAnyTicket,
  changeStatusOfATicket,
  checkUserPassword,
  updateUserPassword,
  sendMyCustomerForgetPassword,
  verifyCustomerPIN,
  updateCustomerPassword,
  sendMyMerchantForgetPassword,
  verifyMerchantPIN,
  updateMerchantPassword,
  getAdminDetails,
  updateAdminPic,
  updateAdminDetails,
  getAllMerchantsMatching,
  getAllCustomersMatching,
  changeStatusOfAnyCustomer,
  getSingleQuoteDetails,
  readAllNotificationOfAdmin,
};
