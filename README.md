# Cacao Noir

A Next.js product showcase for a fictional cold-pressed beverage brand. Product pages use pre-rendered image frames in a scroll-controlled canvas. The cart and account state are browser-only demo features.

## Features

- **Product showcase**: Six products with themed content and scroll-controlled frame sequences.
- **Demo cart**: Cart items and totals persist in `localStorage`. Supported demo coupons are `NANO50` and `FRESH50`.
- **Demo account flow**: Registration and login are stored in `localStorage`; this is not production authentication.
- **Checkout simulation**: Address and payment steps are UI-only. No payment provider, order database, inventory, or shipment tracking is connected.
- **Support pages**: FAQ, contact, shipping and returns, gift cards, and a store-locator placeholder.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Nodemailer with Gmail SMTP for the newsletter endpoint (requires `EMAIL_USER` and `EMAIL_PASS`)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

The app uses a server route for newsletter email, so it must run on a Next.js server deployment. It is not a fully static export.
