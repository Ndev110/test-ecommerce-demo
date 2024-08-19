import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    'X-API-TOKEN':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZWNvbW1lcmNlIn0.8mpDsNwrrKNPv3Wlm9ve6n4HW90D1reyGa8ha0PmD_4"
  },
});