# GAZU — Modern Kinetic Luxury E-Commerce Website

A high-performance modern fashion e-commerce storefront for **GAZU**, featuring scroll-driven 3D animations, an interactive kinetic mannequin that dresses layer-by-layer, slide-over cart, wishlist, quick view, and Supabase database integration.

---

## 🚀 Quick Deployment Guide (GitHub + Vercel + Supabase)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - GAZU fashion store"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

### 2. Deploy to Vercel (1 Click)
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select your GitHub repository.
3. The framework is automatically detected as **Vite**.
4. Click **Deploy**! (Vercel uses `vercel.json` already included in this repository).

---

### 3. Connect Supabase Database
1. Go to [supabase.com](https://supabase.com) and create a free project.
2. In the Supabase Dashboard, open **SQL Editor**.
3. Open the file `supabase/schema.sql` from this repository, paste its contents into the SQL Editor, and click **Run**.
   - This creates the `orders`, `order_items`, and `newsletter_subscribers` tables with anonymous client insert policies.
4. Go to **Project Settings** -> **API** and copy:
   - **Project URL**
   - **anon / public key**
5. In **Vercel** -> Your Project -> **Settings** -> **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = `https://your-project-id.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key`
6. Redeploy or trigger a new commit — your store is now live with real database persistence!

---

## 🛠 Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```
