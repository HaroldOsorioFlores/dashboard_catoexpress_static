import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_HOST_API;

if (!baseUrl) {
  throw new Error("not found base url");
}

export const apiBase = axios.create({
  baseURL: baseUrl,
});
