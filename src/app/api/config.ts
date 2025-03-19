import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const baseQuery = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl: API_BASE_URL + baseUrl,
    prepareHeaders: (headers, {}) => {
      const token = localStorage.getItem("jwt");

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

export default baseQuery;
