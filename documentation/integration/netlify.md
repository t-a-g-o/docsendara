# Deploying Docsendara to Netlify

Docsendara is fully compatible with Netlify for static and dynamic deployments. Here’s how to get your documentation site live on Netlify:

## 1. Push Your Code to GitHub
Ensure your Docsendara project is in a GitHub (or GitLab/Bitbucket) repository.

## 2. Sign Up or Log In to Netlify
Go to [https://netlify.com](https://netlify.com) and sign in.

## 3. Create a New Site from Git
- Click **Add new site** > **Import an existing project**.
- Connect your GitHub account and select your Docsendara repo.

## 4. Configure Build Settings
- **Framework:** Netlify auto-detects Next.js
- **Build command:** `next build`
- **Publish directory:** `.next`
- **Environment variables:**
  - Add `NEXT_PUBLIC_GITHUB_TOKEN` if your docs use the GitHub API or private repos.

## 5. Deploy
- Click **Deploy site**. Netlify will build and deploy your site.
- On success, you’ll get a live URL.

## Tips
- For SSR/ISR, Netlify uses the Next.js Runtime automatically.
- Set up custom domains in your Netlify dashboard if needed.

## Troubleshooting
- Check Netlify build logs if deployment fails.
- Ensure all required environment variables are set.

## Resources
- [Netlify Next.js Docs](https://docs.netlify.com/integrations/frameworks/next-js/overview/)
