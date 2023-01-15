import axios from "axios"

export const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-type": "application/json",
  },
})
