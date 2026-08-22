# Portfolio Frontend (React + Vite + Tailwind)

Public portfolio site + Admin Panel for managing all content.

## 1. Install dependencies
```bash
cd frontend
npm install
```

## 2. Configure the API URL
```bash
cp .env.example .env
```
Set `VITE_API_URL` to your backend URL, e.g. `http://localhost:5000/api`.

## 3. Run in development
```bash
npm run dev
```
Visit `http://localhost:5173`. The admin panel is at `http://localhost:5173/admin/login`
— log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in the backend `.env`.

## 4. Build for production
```bash
npm run build
```
Output is generated in `dist/`. Serve it with any static host (Vercel, Netlify, Nginx, etc.)
and make sure `VITE_API_URL` points at your deployed backend.

## Structure
```
src/
  components/   Reusable UI (public sections, admin widgets)
  pages/        Route-level pages (public + admin)
  layouts/      PublicLayout (navbar/footer) and AdminLayout (sidebar)
  context/      AuthContext (JWT session handling)
  services/     Axios instance with auth interceptor
  utils/        Formatting helpers
```

All content (projects, skills, experience, education, certificates, services, profile, messages)
is fetched live from the backend API — nothing is hardcoded or mocked.

### What's new in this update
- **Certificates** — full public section + Admin CRUD page (`/admin/certificates`), each with
  an image, organization, issue date, and a working "View Certificate" button (opens the
  certificate URL in a new tab, or a lightbox preview of the uploaded image if no URL is set).
- **Profile photo & logo** — uploadable from Profile Settings (via the backend's Cloudinary
  `/api/upload` endpoint, or by pasting a direct image URL). The photo appears in the Hero
  section; the logo appears in the Navbar, Footer, and Admin sidebar, with a graceful fallback
  icon if none is set.
- **Expanded social links** — Facebook, Instagram, and WhatsApp added alongside the existing
  GitHub, LinkedIn, Twitter and website fields, all editable from Profile Settings and rendered
  as real clickable links across the Hero, Footer, and Contact sections.
- **Visual refresh** — light, colorful gradient theme (soft blue/purple/cyan/indigo section
  backgrounds, gradient buttons and badges, glassmorphism cards, animated hero, gradient stat
  cards in the Admin dashboard) while keeping the original layout, structure and navigation.
