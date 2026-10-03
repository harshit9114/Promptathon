# Cacao Noir

An interactive 3D scrollytelling e-commerce experience for a premium cold-pressed beverage brand. Built with Next.js 14 App Router, TypeScript, Framer Motion, and Tailwind CSS.

## Features

- **Interactive 3D Bottle Animation**: High-performance canvas-based frame sequencing synchronized with viewport scroll progress.
- **Product Showcase**: Dynamic switching across 6 signature cold-pressed flavors (Dutch Chocolate, Alphonso Mango, Ruby Pomegranate, Crisp Apple, Tropical Guava, Garden Strawberry) with custom themes and dynamic gradients.
- **Full E-Commerce Flow**:
  - Persistent shopping cart backed by local storage
  - Cart item management and order calculations with coupon code support (`NANO50`, `FRESH50`)
  - Multi-step checkout pipeline (Authentication, Delivery Address, Order Summary, Payment Options)
- **Account & Auth Flow**: Client-side authentication and session state management.
- **Support & Store Pages**: Includes Gift Cards, Shipping & Returns, FAQ, and Contact pages.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

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
