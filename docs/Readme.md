# App Documentation

This document provides end-to-end documentation for the `app/` directory and its contents.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Core Files](#core-files)
    - [app.css](#appcss)
    - [root.tsx](#roottx)
    - [routes.ts](#routests)
    - [Packages](packages.md)
3. [Directories](#directories)
    - [assets/](assets.md)
    - [components/](components.md)
    - [contexts/](contexts.md)
    - [pages/](pages.md)
    - [routes/](routes.md)
    - [services/](services.md)
    - [stores/](stores.md)
    - [types/](types.md)
    - [utils/](utils.md)
4. [bot/](bot.md)

## Project Structure

The `app/` directory contains the main application code, organized into several subdirectories based on their functionality.

```
bot/
app/
├── app.css
├── assets/
├── components/
├── contexts/
├── pages/
├── root.tsx
├── routes.ts
├── services/
├── stores/
└── utils/
```

## Core Files

### app.css

This file contains the main CSS styles for the application, including Tailwind CSS imports and custom styles. It defines basic styling for the body, headings, and utility classes like `.ghost-button`, `.header-content`, and `.search-input-overlay`.

### root.tsx

This file defines the root layout of the application using React Router. It includes:
- `links`: Defines preconnect and stylesheet links for fonts.
- `Layout`: The main layout component wrapping the application content. It includes `Meta`, `Links`, `ScrollRestoration`, and `Scripts` from `react-router`. It also wraps the content with `TonConnectUIProvider`, `TMAProvider`, and `CartProvider` for context management.
- `App`: The default export component that renders the `Outlet` for nested routes.
- `ErrorBoundary`: A component to catch and display errors during routing.

### routes.ts

This file defines the application's routes using `@react-router/dev/routes`. It maps URL paths to corresponding page components:
- `/`: Maps to `./pages/home.tsx`
- `/profile`: Maps to `./pages/profile.tsx`
- `/product/:product`: Maps to `./pages/product/index.tsx`

## Directories

This section will provide details on each subdirectory within `app/`.

### assets/

This directory contains static assets such as icons and images used in the application.

### components/

This directory contains reusable React components used throughout the application.

### contexts/

This directory contains React context providers for managing global state.

### pages/

This directory contains the top-level page components that are rendered by the router.

### routes/

This directory contains the route components for the application.

### services/

This directory contains service modules for handling business logic and data fetching.

### stores/

This directory contains state management stores, likely using a library like Zustand or similar.

### utils/

This directory contains utility functions used across the application.

### types/

This directory contains types.

### bot/

This directory contains minimal telegram bot.
