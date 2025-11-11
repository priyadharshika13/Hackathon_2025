# StaffTract.AI Frontend

A modern React + TypeScript frontend for StaffTract.AI, featuring AI-powered workforce management with bilingual support (English/Arabic), neon UI design, and real-time analytics.

## Features

- 🚀 **React 18** with TypeScript for type safety
- 🎨 **TailwindCSS** with custom neon color scheme
- 🌟 **Framer Motion** for smooth animations
- 🌐 **i18next** for bilingual support (EN/AR) with RTL layout
- 📊 **Recharts** for interactive data visualizations
- 🔗 **Axios** for API communication
- 🎯 **Vite** for fast development and building

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom neon theme
- **Animations**: Framer Motion
- **Internationalization**: i18next with react-i18next
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/
│   │       ├── NeonCard.tsx
│   │       └── AnimatedCounter.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── Reports.tsx
│   ├── hooks/
│   │   └── useApi.ts
│   ├── lib/
│   │   └── api.ts
│   ├── i18n/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Backend API running on `http://localhost:8000`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## API Integration

The frontend connects to the FastAPI backend with the following endpoints:

- `/api/recruitment/*` - Recruitment copilot data
- `/api/workforce/*` - Workforce optimization data
- `/api/performance/*` - Performance evaluation data
- `/api/community/*` - Community planning data
- `/api/fraud/*` - Fraud monitoring alerts
- `/api/insights/*` - AI insights

## Features Overview

### 🎨 UI/UX
- **Neon Glow Effects**: Custom CSS animations with neon colors
- **Glass Morphism**: Modern glass-like UI elements
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Theme**: Consistent dark theme with neon accents

### 🌐 Internationalization
- **Bilingual Support**: English and Arabic translations
- **RTL Layout**: Automatic right-to-left layout for Arabic
- **Dynamic Language Switching**: Real-time language switching

### 📊 Dashboard
- **Real-time Metrics**: Live data from backend APIs
- **Animated Counters**: Smooth number animations
- **Interactive Charts**: Pie charts, bar charts, and trend lines
- **AI Insights**: Dynamic AI-generated insights

### 🔐 Authentication
- **Mock Authentication**: Simulated login system
- **Token Management**: Local storage for auth tokens
- **Protected Routes**: Route protection with redirects

### 📱 Responsive Design
- **Mobile Optimized**: Touch-friendly interface
- **Adaptive Layouts**: Responsive grid systems
- **Collapsible Sidebar**: Mobile-friendly navigation

## Development Guidelines

### Code Style
- Use TypeScript for all components
- Follow React functional component patterns
- Use custom hooks for API calls
- Implement proper error handling
- Add loading states for better UX

### Component Structure
- Keep components small and focused
- Use composition over inheritance
- Implement proper prop types
- Add default props where appropriate

### Styling
- Use TailwindCSS utility classes
- Leverage custom neon color variables
- Implement consistent spacing and typography
- Use CSS custom properties for themes

## Contributing

1. Follow the existing code style and patterns
2. Add proper TypeScript types
3. Test components across different screen sizes
4. Ensure accessibility compliance
5. Add appropriate error handling

## License

This project is part of StaffTract.AI hackathon submission.
