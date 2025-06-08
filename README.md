# Skip Hire Application

A modern, responsive web application for browsing and hiring different sizes of skips. Built with React, TypeScript, and shadcn/ui components.

![Skip Hire Application Preview](/public/images/skip-hire-preview.png)

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Skip Selection**: Browse and select from various skip sizes
- **Filtering & Sorting**: Filter skips by size, price, and features
- **Real-time Pricing**: See prices including VAT in real-time
- **Progress Tracking**: Visual progress indicator through the booking process
- **Modern UI**: Clean, dark-themed interface with smooth animations
- **Highly Modular Codebase**: All major UI sections are reusable components

## Technologies Used

- **Frontend**:
  - React 18
  - TypeScript
  - Vite (Build Tool)
  - Tailwind CSS (Styling)
  - shadcn/ui (UI Components)
  - Lucide Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Daniel-Kav/skip-hire
   cd skip-hire
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── SkipCard.tsx    # Card for displaying a skip
│   ├── SkipFilters.tsx # Sidebar and mobile filters
│   ├── SkipModal.tsx   # Modal for selected skip details
│   ├── ProgressBar.tsx # Progress bar for booking steps
│   ├── Footer.tsx      # App footer
│   └── Disclaimer.tsx  # Disclaimer strip
│   └── ...             # Other UI and utility components
├── pages/              # Page components (e.g., Index.tsx)
├── services/           # API and data fetching logic
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── lib/                # Shared libraries
└── index.css           # Global styles
```

## Main Components

- **SkipCard**: Displays a skip's details and selection button.
- **SkipFilters**: Sidebar and mobile filter controls for skip size, price, and features.
- **SkipModal**: Modal dialog showing selected skip details and price summary.
- **ProgressBar**: Visual indicator of the booking process steps.
- **Footer**: Application footer.
- **Disclaimer**: Informational disclaimer strip.

All components are designed to be reusable and accept props for customization.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

## Data Structure

Skip data is fetched via `src/services/skipService.ts` and follows this structure:

```typescript
interface Skip {
  id: number;
  size: number;              // Size in yards
  price_before_vat: number;  // Price before VAT
  vat: number;               // VAT percentage
  hire_period_days: number;  // Number of days for hire
  allowed_on_road: boolean;  // If the skip can be placed on the road
  allows_heavy_waste: boolean; // If the skip can hold heavy waste
  transport_cost?: number;   // Optional delivery fee
}
```

## Best Practices

- **Componentization**: Keep UI logic in components under `src/components/`. Each major UI section is a separate file.
- **Props & State**: Pass only necessary props. Use hooks for shared logic.
- **Styling**: Use Tailwind CSS utility classes. Extract repeated classNames if needed.
- **Testing**: Add tests for components and logic as the app grows.
- **Accessibility**: Use semantic HTML and ARIA attributes for interactive elements.
- **Documentation**: Document component props and complex logic with TypeScript and comments.
- **Performance**: Use `React.memo`, `useMemo`, and `useCallback` for optimization where needed.
- **Consistent Imports**: Use path aliases (e.g., `@/components/SkipCard`) for maintainability.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI Components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

---

*This application is for demonstration purposes only. Images and information shown may not reflect exact specifications.*