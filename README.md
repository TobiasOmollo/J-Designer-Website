<div align="center">
  <h1>J-Designer Bespoke Tailoring</h1>
  <p>A premium, professional web application designed for a high-end tailored garment business in Nairobi.</p>
</div>

---

## 📌 Overview
**J-Designer** is a modern, feature-rich React web application showcasing bespoke tailoring services, a dynamic gallery, and an intuitive booking system. Designed with a sophisticated **Deep Navy Blue and Metallic Gold** color palette, the platform exudes elegance and professionalism. 

This platform helps master tailors manage their online presence, offering customers the ability to explore the atelier's portfolio and seamlessly schedule private fittings.

## ✨ Key Features
- **Dynamic Hero Section**: An auto-playing hero slider seamlessly synchronized with stunning visual backgrounds.
- **Interactive Collection Gallery**: An immersive, expandable gallery highlighting bespoke suits, feminine tailoring, and bold statements.
- **Booking & Contact Integration**: A fast and reliable fitting booking form integrated with Google Sheets via webhooks.
- **Stunning UI Animations**: Smooth fade-ins, dynamic hover overlays, and mobile navigation slide-ins powered by **Framer Motion**.
- **Fully Responsive Design**: Tailored to look flawless on both desktop and mobile devices.

## 🛠️ Technology Stack
- **Frontend Framework**: React 19 (Built with Vite)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API Integration**: Fetch API connecting to a secure webhook backend.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Install the required dependencies:
   ```sh
   npm install
   ```

### Configuration
Create a `.env` (or `.env.local`) file in the root directory and configure the environment variables required for the booking form to function correctly:
```env
# Required for the Contact Form Submissions
VITE_GOOGLE_SHEETS_WEBHOOK="your_google_sheets_webhook_url"

# Optional: Ensure Gemini API Key is maintained if relied upon elsewhere
GEMINI_API_KEY="your_api_key_here"
```

### Running Locally
To start the development server:
```sh
npm run dev
```

Visit the local URL provided in your terminal (usually `http://localhost:3000`) to view the application in your browser.

## 📦 Build for Production
To build the application for deployment:
```sh
npm run build
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📜 License
&copy; 2026 J-Designer Official. All Rights Reserved.  
Titan Web Production.
