# ShopWow — Beauty & Wellness Store 💄

A fully responsive, front-end e-commerce demo built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build tools. Created as a portfolio piece to showcase UI/UX, interaction design, and clean front-end architecture.

🔗 **Live Demo:**

https://afshedev10-shopwow.netlify.app/

---

## ✨ Features

- **Product catalog** with category filters, sorting, and "load more" pagination
- **Live search** with autocomplete, keyword scoring, keyboard navigation, and recent-search history (`localStorage`)
- **Product detail panel** — slide-in view with image gallery, shade selector, stock status, and related product suggestions
- **Shopping cart** — add/remove/update quantity, persisted to `localStorage` so it survives page reloads
- **Checkout flow (demo)** — order summary and confirmation, saved locally, no real payment processing
- **Wishlist** with persistent state
- **Sign in / Register (demo)** — UI-only auth flow, no real accounts or credentials involved
- **Fully responsive** — sticky header, mobile nav drawer, and touch-friendly layout down to small phone widths
- **Accessibility-conscious markup** — ARIA roles/labels on dialogs, `inert` used to properly manage focus on hidden panels

---

## 🛠️ Built With

- HTML5
- CSS3 (custom properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Font Awesome (icons)

---

## 📁 Project Structure

```
shopwow/
├── index.html          # Main markup — all sections, modals & panels
├── style.css            # All styling (single external stylesheet, no inline styles)
├── script.js             # All application logic (product data, cart, search, auth, UI state)
└── assets/
    └── images/          # Product & category images (see Assets section)
    └── README.md


---

## 🚀 Getting Started

No build step required — this is a static site.

1. Clone the repo
   ```bash
   git clone https://github.com/afshedev10-ak/ShopWow-Website
   ```
2. Open `index.html` directly in your browser, or serve it locally (e.g. VS Code's Live Server extension) for the best experience.

---

## 🔒 Security Notes

- This project is a **frontend demo only**.
- ❌ No password storage or hashing is implemented in the code.
- Login/authentication flows are **UI demonstrations** only.
- ⚠️ For real applications, always use backend authentication with secure password hashing (bcrypt/argon2) and proper session management.

---

## 📌 Notes

- Cart and order data are stored in the browser's `localStorage` for demo purposes only — this is not a substitute for a real backend or database.
- Checkout does not process real payments; no payment gateway is integrated.
- Built as a portfolio project to demonstrate front-end development skills, not intended for production use.

---

## 📄 License

No license — this project is for portfolio purposes only and is not intended for reuse or distribution.


## 🙋 Author

Built by **Afsheen Khan** — frontend developer focused on performance-minded, polished UI.
