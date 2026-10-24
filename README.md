# GROUPDRIVE — India's Group Car Buying Platform

> **Buy Together. Negotiate Smarter.**  
> *Initial Pilot: Kerala, India (Kochi, Thiruvananthapuram, Kozhikode, Thrissur, Kottayam, Kannur)*

GROUPDRIVE is a production-oriented, premium automotive technology platform that empowers Indian car buyers to unite their purchase demand into collective quorums and receive itemized, transparent on-road quotations from authorized OEM dealerships.

Inspired by group purchasing power, buyers negotiate together rather than alone. Participating dealerships submit competitive offers directly into the Quotation Arena, and buyers compare authentic on-road costs—with independent AI deal auditing and zero hidden handling charges—before booking doorstep test drives and finalizing vehicle purchases.

---

## 🌟 Key Features

### 1. Tesla & Luxeon Editorial Design Aesthetic
- Built with a refined minimalist automotive editorial design system.
- High-resolution vehicle photography, studio lighting aesthetics, and card layouts inspired by Tesla Inventory and luxury automotive ateliers.
- Bilingual support with real-time toggle between **English** and **Malayalam (മലയാളം)**.
- Dark & light theme tokens, custom glassmorphism, and responsive mobile-first views.

### 2. Live Buyer Quorum Lifecycle Management
- Buyers can browse or initiate group purchase quorums for high-demand vehicles (Hyundai Creta, Tata Nexon.ev, Toyota Innova Hycross, Volkswagen Virtus, Mahindra XUV700, Thar ROXX).
- Transaction-safe quorum membership prevention against duplicate joins.
- Real-time quorum threshold trackers, closing date timers, and delivery window targets.

### 3. True On-Road Price Engine (Kerala MVD Verified)
- Official statutory Kerala Motor Vehicles Department (MVD) tax slab calculations:
  - `< ₹5 Lakh`: 9%
  - `₹5L - ₹10 Lakh`: 11%
  - `₹10L - ₹15 Lakh`: 13%
  - `₹15L - ₹20 Lakh`: 16%
  - `> ₹20 Lakh`: 21%
  - **Electric Vehicles (EV)**: Special 5% flat road tax concession under Kerala EV Policy.
- Automatic TCS (Tax Collected at Source - 1% above ₹10L under Section 206C(1F) of IT Act).
- Fastag and statutory registration fees.
- Itemized insurance breakdown with Zero Depreciation, Return to Invoice (RTI), and Engine Protection add-ons.

### 4. Dealer Quotation Arena & Side-by-Side Comparison Matrix
- Verified OEM dealerships (Popular Hyundai, Nippon Toyota, KVR Tata, EVM Volkswagen, Pothens) submit itemized offers.
- Side-by-side comparative inspection highlighting Ex-showroom, Road Tax, Cess, TCS, Insurance, and Group Bargaining Discounts.
- **Quote Completeness Score (0-100%)** measuring disclosure transparency.
- **Illegal Handling Fee Detector**: Flags unauthorized logistics or depot charges prohibited under Supreme Court of India judgments and Kerala Transport Department rules.

### 5. AI Deal Intelligence & Negotiation Assistant
- Independent deal auditor providing plain-language analysis in both **English** and **Malayalam**.
- Identifies missing coverage (e.g., absence of Return-to-Invoice in insurance).
- Generates tailored negotiation questions for showroom sales heads.
- Deterministic fallback rule engine runs 100% offline without external API dependencies, with optional Google Gemini API support via `GEMINI_API_KEY`.

### 6. Kerala District Demand Heatmap
- Anonymized, aggregated buyer demand visualization across 14 Kerala districts.
- Highlights top requested car models, active buyers, and average group savings per district.

### 7. Doorstep Test-Drive Coordination
- Schedule doorstep or showroom test drives with chosen dealerships.
- Status tracking: `REQUESTED` ➔ `CONFIRMED` ➔ `COMPLETED`.

### 8. Multi-Persona Switcher (Instant Demo Evaluation)
Easily experience the platform from all perspectives via the top navigation switcher:
- 👤 **Buyer**: Rahul Menon (Kochi) — Compare quotes, book test drives, view savings.
- 👥 **Group Organizer**: Ananya Nair (Thiruvananthapuram) — Coordinate Nexon.ev quorum.
- 🏢 **Verified Dealer**: Popular Hyundai Kochi — Submit quotations, confirm test drives.
- 🛡️ **Platform Administrator**: GroupDrive HQ — Verify dealers, audit charges.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with customized luxury editorial palette
- **Icons**: [Lucide React](https://lucide.dev/)
- **Micro-interactions**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Testing**: Node.js Native Test Runner with [TSX](https://github.com/privatenumber/tsx)
- **Target Deployment**: [Vercel](https://vercel.com/) (Serverless & Edge ready)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+`

### Installation
```bash
# Clone the repository
git clone https://github.com/AjinLabs/groupdrive-car-buying-platform.git
cd groupdrive-car-buying-platform

# Install dependencies
npm install

# Run automated tests
npm test

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.

---

## 🧪 Automated Testing

Automated unit and integration test suite verifies:
1. Kerala MVD road tax slab arithmetic across all price brackets (9%, 11%, 13%, 16%, 21%).
2. Kerala EV 5% flat tax concession.
3. TCS (1%) rule enforcement for vehicles exceeding ₹10,00,000.
4. Transaction-safe duplicate quorum membership prevention.
5. AI Deal Intelligence handling fee auditing and missing RTI detection.

Run tests:
```bash
npm test
```

---

## 🌐 Deploying to Vercel

The application is structured for zero-config Vercel deployment:

1. Push your changes to GitHub:
   ```bash
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import the `AjinLabs/groupdrive-car-buying-platform` repository.
4. Keep the default settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. (Optional) In **Environment Variables**, add:
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API key for live generative explanations. If omitted, the deterministic built-in AI deal engine provides full English & Malayalam audits automatically.
6. Click **Deploy**. Your platform will be live with high availability and worldwide edge caching!

---

## 📄 License & Regulatory Notice

GROUPDRIVE operates as a collective demand facilitation platform. GROUPDRIVE does not collect automobile purchase funds, vehicle advance payments, or act as an automobile dealer. All vehicle sales, invoicing, registration, and warranties are executed directly with authorized dealerships.

© 2026 GROUPDRIVE India Technologies. All rights reserved.
