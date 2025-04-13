# Turborepo UI Starter

<div align="center">
  <img src="apps/landing/public/logo.png" alt="Turborepo UI Starter Logo" width="180" />
  <p>A modern monorepo starter with scalable architecture for building full-stack applications with shared UI components.</p>
</div>

## ✨ Features

- **Monorepo Structure** - Organized with Turborepo for efficient workspace management
- **Shared UI Components** - Pre-built components in `@workspace/ui` package
- **Modern Stack** - Built with the latest technologies for optimal developer experience
- **Type Safety** - Full TypeScript support across all packages
- **Fast Development** - Powered by Vite for lightning-fast builds and hot module replacement

## 🛠️ Tech Stack

### Core
- **React 19** - Latest version with improved performance
- **TypeScript** - For type safety and better developer experience
- **Vite** - Fast, modern frontend build tool
- **Turborepo** - Monorepo build system for JavaScript/TypeScript

### UI & Styling
- **TailwindCSS v4** - Utility-first CSS framework
- **Shadcn/ui** - Beautifully designed components built with Radix UI
- **Radix UI** - Unstyled, accessible UI components
- **Framer Motion** - Animation library for React

### Development Tools
- **Biome** - Fast linter and formatter
- **Lefthook** - Git hooks manager
- **Zod** - TypeScript-first schema validation

## 📦 Project Structure

```
turborepo-ui-starter/
├── apps/                   # Application packages
│   └── landing/            # Landing page application
├── packages/               # Shared packages
│   ├── ui/                 # Shared UI components
│   └── typescript-config/  # Shared TypeScript configurations
├── turbo.json              # Turborepo configuration
└── package.json            # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [pnpm](https://pnpm.io/) (v8 or newer)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/turborepo-ui-starter.git
   cd turborepo-ui-starter
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

## 💻 Development

Run all applications in development mode:

```bash
pnpm dev
# or
turbo dev
```

Build all applications for production:

```bash
pnpm build
# or
turbo build
```

## 🧩 UI Components

The `@workspace/ui` package contains shared UI components that can be used across all applications in the monorepo. These components are built with Radix UI and styled with TailwindCSS.

### Available Components

- **Button** - Various button styles (default, secondary, outline, ghost, destructive, link)
- **Card** - Flexible card layout with multiple sub-components
- **Tabs** - Accessible tab interface
- **Typography** - Text components for consistent typography
- **Drawer** - Slide-in panel component
- **Skeleton** - Loading state placeholders
- **Timeline** - Vertical timeline component
- **Tooltip** - Informational popup on hover

### Usage

```tsx
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";

export const MyComponent = () => {
  return (
    <Card>
      <CardContent>
        <h2>Hello World</h2>
        <Button variant="default">Click Me</Button>
      </CardContent>
    </Card>
  );
};
```

## 🔧 Adding a New Application

To add a new application to the monorepo:

1. Navigate to the `apps` directory:
   ```bash
   cd apps
   ```

2. Create a new Vite application:
   ```bash
   pnpm create vite my-new-app --template react-swc-ts
   ```

3. Update the new application's `package.json` to use workspace dependencies:
   ```json
   "dependencies": {
     "@workspace/ui": "workspace:*",
     "@workspace/typescript-config": "workspace:*"
   }
   ```

4. Add the application to the Turborepo pipeline in `turbo.json`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
