# Sales Pipeline Dashboard

A HubSpot CRM sales pipeline dashboard with MTD, YTD, YoY, and Activities views.

---

## 🚀 Deploy to Vercel in 5 minutes (recommended)

### Option A — Deploy via GitHub (easiest for sharing + updates)

1. **Create a free GitHub account** at github.com if you don't have one

2. **Create a new repository** on GitHub (click "New" → name it `sales-dashboard` → Create)

3. **Upload these files** by dragging the entire `sales-dashboard` folder into the GitHub repo page

4. **Go to vercel.com** → Sign up free with your GitHub account

5. Click **"Add New Project"** → Import your `sales-dashboard` repo

6. Vercel auto-detects Create React App. Just click **"Deploy"**

7. ✅ Your dashboard is live at `https://sales-dashboard-xxx.vercel.app`

8. **Share that link** with anyone — no login required to view

---

### Option B — Deploy without GitHub (drag & drop)

1. **Install Node.js** from nodejs.org (LTS version)

2. Open a terminal in the `sales-dashboard` folder and run:
   ```bash
   npm install
   npm run build
   ```
   This creates a `build/` folder.

3. Go to **vercel.com** → Sign up free

4. On the dashboard click **"Deploy"** → drag and drop the `build/` folder

5. ✅ Done — you get a shareable link instantly

---

## 🔒 Password protect it (optional)

On Vercel: Go to your project → Settings → Password Protection → Enable

---

## 💻 Run locally

```bash
npm install
npm start
```
Opens at http://localhost:3000

---

## 📁 Project structure

```
sales-dashboard/
├── public/
│   └── index.html        # HTML shell
├── src/
│   ├── index.js          # React entry point
│   └── Dashboard.jsx     # Main dashboard component
├── package.json          # Dependencies
├── vercel.json           # Vercel deploy config
└── .gitignore
```
