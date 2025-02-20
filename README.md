# Ironpay Frontend Monorepo

Turborepo + Vite + React + TS + Tailwind CSS v4 + shadcn/ui.

This repository contains the source code of monorepo.

## Table of Contents

- [Ironpay Frontend Monorepo](#ironpay-frontend-monorepo)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Monorepo Structure \& Usage](#monorepo-structure--usage)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone git@github.com:IronPay/frontend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd frontend
    ```
3. Install the dependencies:
    ```bash
    pnpm install
    ```

## Monorepo Structure & Usage

This project is a monorepo managed with Turborepo. It contains multiple packages that can be developed and built together.

To start the development server for all packages, run:
```bash
turbo dev
```

To build all packages for production, run:
```bash
turbo build
```

To add a new sub-project to the `apps` folder, follow these steps:

1. Navigate to the `apps` directory:
    ```bash
    cd apps
    ```
2. Initialize your new application. This can be any frontend application. For example, to create a new Vite project:
    ```bash
    pnpm create vite my-react-app --template react-swc-ts
    ```

After adding the new sub-project, you can manage it along with other packages using Turborepo commands.