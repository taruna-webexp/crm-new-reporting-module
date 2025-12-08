"use client";

import axios from "axios";
import { BASE_URL } from "./base";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  config => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    const headers = config.headers as any;
    headers.set?.("Content-Type", "application/json");
    if (token) {
      headers.set?.("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  error => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response?.data || error),
);

export default axiosClient;
