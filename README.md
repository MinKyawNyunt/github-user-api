# GitHub User API Demo

This project demonstrates the use of the GitHub API to search for users, list repositories, view issues, and create new issues.

## Requirements

- node >= 22
- docker (optional)

## Getting Started

First, copy .env.example to .env.local and add **GITHUB_TOKEN**

Then, run the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deployment with Docker

```
docker-compose up --build -d
```

## Testing

```
npx playwright test
```
