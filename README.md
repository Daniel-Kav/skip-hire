# Skip Hire Application

A modern, responsive web application for browsing and hiring different sizes of skips. Built with React, TypeScript, and shadcn/ui components.

![Skip Hire Application Preview](/public/images/skip-hire-preview.jpg)

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Skip Selection**: Browse and select from various skip sizes
- **Filtering & Sorting**: Filter skips by size, price, and features
- **Real-time Pricing**: See prices including VAT in real-time
- **Progress Tracking**: Visual progress indicator through the booking process
- **Modern UI**: Clean, dark-themed interface with smooth animations

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
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd skip-smart
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── data/          # Application data
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
└── App.tsx        # Main application component
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

## Data Structure

The skip data is stored in `src/data/skipData.ts` and follows this structure:

```typescript
interface Skip {
  id: number;
  size: number;              // Size in yards
  price_before_vat: number;  // Price before VAT
  vat: number;               // VAT percentage
  hire_period_days: number;  // Number of days for hire
  allowed_on_road: boolean;  // If the skip can be placed on the road
  allows_heavy_waste: boolean; // If the skip can hold heavy waste
}
```

## Features in Detail

### Skip Filtering
- Filter skips by size (4yd to 40yd)
- Set price range filters
- Filter by road legal status
- Filter by heavy waste allowance

### Sorting Options
- Sort by price (low to high / high to low)
- Sort by size (small to large / large to small)

### Responsive Design
- Mobile-first approach
- Collapsible filters for smaller screens
- Adaptive layout for different screen sizes

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