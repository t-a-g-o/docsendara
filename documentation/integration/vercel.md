# Deploying Docsendara to Vercel

Vercel provides seamless deployment for Next.js projects like Docsendara. Here’s how to get started:

## 1. Push Your Code to GitHub
Make sure your Docsendara project is hosted on GitHub (or GitLab/Bitbucket).

## 2. Sign Up or Log In to Vercel
Visit [https://vercel.com](https://vercel.com) and sign in.

## 3. Import Your Project
- Click **New Project** and import your Docsendara repo.
- Vercel auto-detects Next.js and sets build settings.

## 4. Configure Environment Variables
- Add `NEXT_PUBLIC_GITHUB_TOKEN` if your docs fetch from GitHub or use private repos.

## 5. Deploy
- Click **Deploy**. Vercel will build and deploy your app.
- You’ll get a live preview URL and can set up a custom domain.

## Tips
- Vercel supports all Next.js features (SSR, ISR, API routes, etc) out of the box.
- Use the Vercel dashboard for custom domains and advanced settings.

## Troubleshooting
- Review Vercel build logs if you encounter errors.
- Ensure all required environment variables are set.

## Resources
- [Vercel Next.js Docs](https://vercel.com/docs/concepts/frameworks/nextjs)
