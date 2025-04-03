# FreetheBird

A trivia game where players answer questions to free a virtual bird from its cage. [Play now at cagedbird.vercel.app](https://cagedbird.vercel.app)

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS, PostCSS
- **Configuration**: TypeScript

## Project Structure

```
freethebird/
├── app/                # Next.js app directory
├── components/         # UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets
├── styles/             # Global styles
├── next.config.mjs     # Next.js configuration
├── package.json        # Dependencies
├── pnpm-lock.yaml      # Package lock file
├── postcss.config.mjs  # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Development

1. Clone the repository
   ```bash
   git clone https://github.com/damilareoo/freethebird.git
   cd freethebird
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Start the development server
   ```bash
   pnpm dev
   ```

4. Build for production
   ```bash
   pnpm build
   ```

## Game Concept

A trivia game where answering questions correctly helps free a bird from its cage. Players progress through stages by demonstrating knowledge across various categories.

## License

MIT
