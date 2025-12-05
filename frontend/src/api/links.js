import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// CREATE SHORT LINK
export async function createShortLink(data) {
  const res = await client.post("/links", data);
  return res.data;
}

// GET ALL LINKS
export async function getLinks() {
  const res = await client.get("/links");
  return res.data;
}

// GET ONE
export async function getLink(code) {
  const res = await client.get(`/links/${code}`);
  return res.data;
}

// DELETE
export async function deleteLink(code) {
  const res = await client.delete(`/links/${code}`);
  return res.data;
}
