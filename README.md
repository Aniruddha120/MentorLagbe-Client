# MentorLagbe Client

Next.js (App Router) frontend for **MentorLagbe** - a smart tuition and mentorship platform connecting students with verified tutors.

## Live URL
- Client: https://mentor-lagbe-client-kohl.vercel.app
- Server: https://mentorlagbe-server-66nj.onrender.com

## Admin Credentials
- Email: admin@mentorlagbe.com
- Password: 12345678

## Tutor Test Credentials
- Email: jhankar@ph.com
- Password: 12345678

## Key Features
- Role-based authentication and dashboards for **Student**, **Tutor**, and **Admin** (BetterAuth + JWT).
- Public tuition browsing with search, filter, sort, and pagination; tuition details page.
- Student flow: apply to approved tuitions with duplicate prevention, track applications, cancel pending applications.
- Tutor flow: post tuition with image upload (ImgBB via server API), edit/delete/close own tuitions, review applicants, accept/reject applications.
- Free tutor plan limit: up to 2 tuition posts; Pro plan: unlimited posts.
- Admin flow: user role management, tuition approval/rejection, Stripe transaction monitoring, platform stats.
- Shared profile update for all roles (name, phone, bio, profile image upload/URL).
- Stripe Checkout for Pro plans, payment success/cancel pages, payment confirmation/webhook sync, `payments` collection records, user plan upgraded to `pro`.
- Responsive UI with DaisyUI/Tailwind, loading, error, and not-found pages, toast notifications.

## NPM Packages
- next
- react
- react-dom
- better-auth
- react-hot-toast
- stripe
- tailwindcss
- daisyui
- @tailwindcss/postcss
- typescript
- @types/node
- @types/react
- @types/react-dom

## Setup
1. `cp .env.example .env.local`
2. Fill env values:
   - `NEXT_PUBLIC_API_URL=http://localhost:5000`
3. `npm install`
4. `npm run dev -- -p 3001`
