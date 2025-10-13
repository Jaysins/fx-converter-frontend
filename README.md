# FX Currency Converter

A modern, full-stack currency conversion application built with React, TypeScript, and Tailwind CSS. Features real-time exchange rates, transaction history, analytics dashboard, and beautiful data visualizations.

## 🚀 Features

### Core Features
- **Real-time Currency Conversion**: Convert between 10 major currencies (USD, EUR, GBP, NGN, JPY, CAD, AUD, CHF, CNY, INR)
- **Transaction History**: View all past conversions with pagination and filtering
- **Analytics Dashboard**: Track conversion trends with interactive charts
- **User Authentication**: Secure JWT-based authentication system
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop

### Technical Highlights
- **Type-Safe**: Full TypeScript implementation
- **Modern UI**: Clean, accessible interface with Tailwind CSS
- **Real-time Data**: Live exchange rates from backend API
- **Interactive Charts**: Beautiful visualizations with Recharts
- **Error Handling**: Comprehensive error states and user feedback
- **Accessibility**: WCAG AA compliant with keyboard navigation

---

## 📋 Prerequisites

- **Node.js**: v20 or higher
- **npm**: v7 or higher
- **Backend API**: Running on `http://localhost:3000`

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd fx-converter
```


### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
The application will be available at http://localhost:5173
```
### 4. Build for Production
```bash
npm run build
npm run preview
```

### Architecture & Design Decisions

### 1. **Component Architecture**

* **Atomic Design:**
  UI components are split into reusable primitives (`ui/`) and feature-specific components (`features/`).

* **Composition Pattern:**
  Components like `Card` are built with sub-components (`CardHeader`, `CardContent`) for flexibility and clarity.

* **Single Responsibility Principle:**
  Each component is designed to handle a single concern to improve readability and maintainability.


### 2. **State Management**

* **Context API:**
  Used for global authentication state — simple and sufficient for this application.

* **Custom Hooks:**
  Encapsulate business logic and API interactions (e.g., `useConversion`, `useTransactions`).

* **Local State:**
  Managed with `useState` for UI-specific logic such as forms, modals, and toggles.

### 3. **API Layer**

* **Service Classes:**
  All API calls are centralized within dedicated service files (`auth.service.ts`, `conversion.service.ts`).

* **Axios Interceptors:**
  Automatically handle token injection and global error interception (e.g., `401 Unauthorized`).

* **Type Safety:**
  Full TypeScript support ensures reliable request and response typing.

### 4. **Error Handling**

**Handled at Multiple Levels:**

* **Network Level:** Axios interceptors for HTTP errors
* **Component Level:** `try-catch` blocks within hooks
* **UI Level:** Toast notifications and inline error displays
* **Global Level:** React Error Boundary for uncaught exceptions

**User-Friendly Messages:**
All technical errors are translated into clear, human-readable messages.


## 🎯 Key Trade-offs & Decisions

| Decision                           | Why We Chose It                               | Trade-off                              |
| ---------------------------------- | --------------------------------------------- | -------------------------------------- |
| **Context API over Redux**         | Simpler setup, sufficient for auth state      | Less powerful for complex global state |
| **Custom Hooks over React Query**  | Full control, zero dependency overhead        | Manual cache management                |
| **Recharts for Visualizations**    | React-first design, responsive, rich features | Slightly larger bundle size            |
| **localStorage for Token Storage** | Simple, persistent across tabs                | Less secure than httpOnly cookies      |
| **Client-Side Routing**            | SPA experience, smooth navigation             | Limited SEO capabilities               |
| **Feature-Based Folder Structure** | Scalable, organized, co-located logic         | Slightly deeper nesting                |
| **Tailwind CSS over CSS Modules**  | Faster UI development, design consistency     | Can get verbose in large components    |


