# Ton Society Test Monorepo

Turborepo + Vite + React + TS + Tailwind CSS v4 + shadcn/ui + Nest.js.

Other techonologies:
- General
  - Zod
- Frontend:
  - Tanstack Router
  - Tanstack Query
  - Tanstack Virtualizer
- Backend
  - Nest.js
  - class-validator and class-transformer
- Code organiztion
  - Biome
  - Lefthook

This repository contains the source code of monorepo.

## Table of Contents

- [Ton Society Test Monorepo](#ton-society-test-monorepo)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Develpment](#develpment)
  - [Build](#build)
  - [Deployment](#deployment)
  - [Monorepo Structure \& Usage](#monorepo-structure--usage)
  - [Data management](#data-management)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone git@github.com:bodasooqa/ton-society-test.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ton-society-test
    ```
3. Install the dependencies:
    ```bash
    pnpm install
    ```

## Develpment

Just run all of the applications via this command:

```bash
turbo dev
```

## Build

Just build all of the applications via this command:

```bash
turbo build
```

## Deployment

Deployment is done through Vercel. And Vercel determines that the project is a Turborepo (wow!).

![Alt text](meta/vercel-deployment.png "Title")

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

## Data management

The main task of the application is to transfer data between the client application and Notion via the Notion API. For the most part, a separate “backend” project is needed for this purpose.

As a manager, you can add or delete data in a [designated table](https://www.notion.so/black-portfolio/Test-data-1a5aaf44f04980b9b5fedb348379413e) — the application will react on its own. However, if you want to use a new table, you need to specify its ID correctly.

By the way, you can add data in any form. The application will determine if the data is an `Address` entity and display only the necessary data.

The application has both frontend and backend caching configured. So don't worry if after updating data in the table manually you don't immediately see the changes in the application. 
This is a drawback, but cache reset is implemented when adding data using a special method on the backend.
To make the application react to changes in the table manually and reset the cache, it is necessary to implement interaction with Notion API via WS, but in the task condition there is a block on them.