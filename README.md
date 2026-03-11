# Vamsi Bhogaraju — Portfolio

Personal portfolio website built with React, Vite, TypeScript, Tailwind CSS, GSAP, and Framer Motion.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy to Vercel

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Framework preset: **Vite**
4. Deploy

Or via CLI:

```bash
npx vercel
```

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Framer Motion
- Recharts
- EmailJS (contact form)

## Contact Form

To enable the contact form, sign up at [emailjs.com](https://www.emailjs.com/) and replace the credentials in `src/components/Contact.tsx`:

```ts
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY')
```
