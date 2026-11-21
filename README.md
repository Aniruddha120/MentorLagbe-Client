# MentorLagbe Client

Next.js (App Router) frontend for MentorLagbe - Smart Tuition & Mentorship Platform.

## Project purpose
Connects students with verified tutors. Tutors post tuition batches, admins moderate, students apply, and Pro plans are purchased via Stripe.

## Live URL
- Client: add deployed URL
- Server: add deployed URL

## Admin credentials
- Email: add admin email
- Password: add admin password

## Tutor test credentials
- Email: add tutor email
- Password: add tutor password

## Key features
- Role-based auth (Student/Tutor/Admin) with BetterAuth + JWT
- Browse/search/filter/paginated approved tuitions
- Tuition details + student application flow (duplicate prevention)
- Tutor dashboard: post/edit/delete/close tuitions, manage applicants
- Admin dashboard: user role management, tuition approval, Stripe transactions
- Stripe Checkout Pro plans + payment confirmation/webhook sync
- ImgBB profile/banner image upload
- Responsive UI, loading/error/not-found pages, toast notifications

## NPM packages
next, react, react-dom, better-auth, react-hot-toast, stripe, tailwindcss, daisyui, @tailwindcss/postcss

## Setup
1. `cp .env.example .env.local`
2. `npm install`
3. `npm run dev`
