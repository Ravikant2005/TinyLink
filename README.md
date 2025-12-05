# TinyLink – URL Shortener

TinyLink is a lightweight URL shortening application built using **Node.js, Express, MongoDB, and React (Vite)**.  
It allows users to generate short links, optionally customize the code, view analytics, and manage their links through a clean and minimal dashboard.

---

## 🚀 Features

### 🔗 Short Link Creation
- Enter any valid URL and generate a short link.
- Optional custom short code.
- Automatically prevents duplicate custom codes.
- Server generates unique random codes (6–8 characters).

### 📊 Link Analytics
- Track **click count**.
- Track **last clicked time**.
- View **creation timestamp**.
- Each short link has a detailed stats page.

### 📁 Link Management
- View all links in a dashboard.
- Delete any link instantly.
- Copy short URLs with one click.
- Sorting: newest, oldest, most clicks, least clicks.
- Search links by code or original URL.

### 🔀 Redirection
- Visiting `/code` redirects to the original URL.
- Click count increments with every visit.

### ❤️ Clean UI
- Apple-style UI with modern components.
- Icons, shadows, spacing, animations.
- Fully responsive.

---

## 🛠️ Tech Stack

### **Frontend**
- React (Vite)
- TailwindCSS
- Heroicons

### **Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS

### **Other**
- REST API
- Axios for frontend API calls

---

## 📚 API Endpoints

### **Create Short Link**
`POST /api/links`

```json
{
  "url": "https://example.com",
  "code": "optionalCustomCode"
}
