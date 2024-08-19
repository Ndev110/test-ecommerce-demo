import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json",
    'x-api-key':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.FnrUVIV6cwmKyLbRDzOIs-4yCE5ULPwHFDmGjF0iH98"
  },
});