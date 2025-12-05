import axios from "axios";

const API = "https://tinylink-1-263w.onrender.com";

export async function createShortLink(data) {
  const res = await axios.post(`${API}/api/links`, data);
  return res.data;
}

export async function getLinks() {
  const res = await axios.get(`${API}/api/links`);
  return res.data;
}

export async function getLink(code) {
  const res = await axios.get(`${API}/api/links/${code}`);
  return res.data;
}

export async function deleteLink(code) {
  const res = await axios.delete(`${API}/api/links/${code}`);
  return res.data;
}
