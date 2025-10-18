# HelixScope: Interactive Molecular Biology

An interactive educational platform that makes learning molecular biology engaging through whimsical illustrations, visualizations, and gamified lessons.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/SampleBias/HELIX-DNA-Edu)

HelixScope is a visually stunning web application designed to demystify complex molecular biology concepts using an illustrative and whimsical art style. It features interactive learning modules covering topics from DNA structure to protein synthesis. Users can engage with 3D molecular models, build DNA strands with drag-and-drop interfaces, and watch key biological processes unfold through beautiful animations. A built-in assessment system with quizzes and virtual labs tests understanding, while gamification elements like achievements and leaderboards keep learners motivated. The platform is built on modern web technologies, ensuring a responsive and accessible experience across all devices.

## Key Features

-   **Interactive Learning Modules**: Engaging, step-by-step lessons with interactive diagrams, progress tracking, and achievement badges.
-   **Advanced Visualization Tools**: Interactive 3D molecular viewers and animations of cellular processes like DNA replication and protein synthesis.
-   **Comprehensive Assessment System**: Quizzes with immediate feedback, virtual lab simulations, and problem-solving challenges.
-   **Gamification Elements**: Progress tracking, level progression, achievements, and leaderboards to foster competitive learning.
-   **Modern & Responsive Design**: Built with TypeScript for type safety and a responsive design for flawless cross-device compatibility.
-   **Accessible**: Designed with accessibility in mind, including screen reader support and keyboard navigation.

## Technology Stack

-   **Frontend**: React, TypeScript, Vite, Tailwind CSS
-   **UI Components**: shadcn/ui, Framer Motion for animations
-   **State Management**: Zustand
-   **Interactivity**: @dnd-kit/core, @react-three/fiber for 3D rendering
-   **Backend**: Hono running on Cloudflare Workers
-   **Storage**: Cloudflare Durable Objects for persistent state

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/) package manager
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for interacting with the Cloudflare platform.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/helixscope.git
    cd helixscope
    ```

2.  **Install dependencies:**
    This project uses Bun for package management.
    ```sh
    bun install
    ```

## Development

To start the local development server, which includes the Vite frontend and a local instance of the Cloudflare Worker, run the following command:

```sh
bun dev
```

This will start the application on `http://localhost:3000` (or the next available port). The frontend will automatically reload on changes, and the worker will be updated as you modify the backend code.

## Deployment

This application is designed for easy deployment to the Cloudflare network.

### One-Click Deploy

You can deploy this application to your own Cloudflare account with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/SampleBias/HELIX-DNA-Edu)

### Manual Deployment via CLI

1.  **Authenticate with Cloudflare:**
    If this is your first time using Wrangler, you'll need to log in to your Cloudflare account.
    ```sh
    wrangler login
    ```

2.  **Build the application:**
    This command bundles the frontend and prepares the worker for deployment.
    ```sh
    bun run build
    ```

3.  **Deploy to Cloudflare:**
    This command publishes your application to your Cloudflare account.
    ```sh
    bun run deploy
    ```

Wrangler will provide you with a URL where your application is live.

## Project Structure

-   `src/`: Contains the React frontend application code.
    -   `pages/`: Top-level page components.
    -   `components/`: Reusable React components, including shadcn/ui elements.
    -   `lib/`: Utility functions and API client.
    -   `hooks/`: Custom React hooks.
-   `worker/`: Contains the Hono backend code for the Cloudflare Worker.
    -   `index.ts`: The main entry point for the worker.
    -   `user-routes.ts`: Where application-specific API routes are defined.
    -   `entities.ts`: Defines the data models (entities) that are stored in Durable Objects.
-   `shared/`: Contains TypeScript types and mock data shared between the frontend and the worker.
-   `wrangler.jsonc`: Configuration file for the Cloudflare Worker. **Do not modify.**