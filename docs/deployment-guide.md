# APIShift Deployment Guide

This guide will help you deploy APIShift to production using Vercel and Supabase.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Supabase account (sign up at https://supabase.com)
- GitHub OAuth App credentials
- Google OAuth credentials (optional)

## Step 1: Set Up Supabase Database

1. **Create a new Supabase project**
   - Go to https://supabase.com/dashboard
   - Click "New Project"
   - Choose a name (e.g., "apishift-prod")
   - Set a strong database password
   - Select a region close to your users
   - Wait for the project to be created (~2 minutes)

2. **Get your database connection string**
   - Go to Project Settings > Database
   - Copy the "Connection string" under "Connection pooling"
   - Use the "Transaction" mode connection string
   - Replace `[YOUR-PASSWORD]` with your database password
   - The format should be:
     ```
     postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
     ```

3. **For direct connection (migrations):**
   - Copy the "URI" under "Direct connection"
   - This is used for running migrations
   - Format:
     ```
     postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
     ```

## Step 2: Set Up GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: `APIShift`
   - Homepage URL: `https://your-domain.vercel.app` (update after Vercel deployment)
   - Authorization callback URL: `https://your-domain.vercel.app/api/auth/callback/github`
4. Click "Register application"
5. Copy the "Client ID"
6. Generate and copy the "Client Secret"

## Step 3: Set Up Google OAuth (Optional)

1. Go to https://console.cloud.google.com/
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth client ID
5. Choose "Web application"
6. Add authorized redirect URI: `https://your-domain.vercel.app/api/auth/callback/google`
7. Copy the Client ID and Client Secret

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Connect GitHub Repository**
   - Go to https://vercel.com/new
   - Import your GitHub repository `Fiyy/api-monitor`
   - Select the `app` directory as the root directory

2. **Configure Environment Variables**

   Add the following environment variables:

   ```bash
   # Database (Supabase connection pooling URL)
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

   # Direct database connection for migrations
   DIRECT_DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

   # NextAuth
   NEXTAUTH_SECRET="generate-a-random-32-char-string"
   NEXTAUTH_URL="https://your-project.vercel.app"

   # OAuth Providers
   GITHUB_ID="your-github-oauth-client-id"
   GITHUB_SECRET="your-github-oauth-client-secret"

   GOOGLE_ID="your-google-oauth-client-id"
   GOOGLE_SECRET="your-google-oauth-client-secret"
   ```

3. **Configure Build Settings**
   - Framework Preset: `Next.js`
   - Root Directory: `app`
   - Build Command: `prisma generate && npm run build`
   - Install Command: `npm install --legacy-peer-deps`

4. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Copy your deployment URL

5. **Update OAuth Callback URLs**
   - Go back to your GitHub OAuth App settings
   - Update the Homepage URL and Authorization callback URL with your Vercel domain
   - Do the same for Google OAuth if you set it up

### Option B: Deploy via CLI

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Link your project**
   ```bash
   cd app
   vercel link
   ```

3. **Set environment variables**
   ```bash
   vercel env add DATABASE_URL production
   vercel env add NEXTAUTH_SECRET production
   vercel env add NEXTAUTH_URL production
   vercel env add GITHUB_ID production
   vercel env add GITHUB_SECRET production
   # Add other environment variables
   ```

4. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Step 5: Run Database Migrations

After your first deployment, you need to run migrations:

1. **Using Prisma CLI locally**
   ```bash
   # Set the DIRECT_DATABASE_URL in your .env file temporarily
   DATABASE_URL="your-direct-supabase-url" npx prisma migrate deploy
   ```

2. **Or add a migration script to package.json and run via Vercel CLI**
   ```bash
   vercel env pull .env.production
   npm run db:migrate
   ```

## Step 6: Verify Deployment

1. Visit your Vercel URL
2. Try to sign in with GitHub
3. Check that the database connection works
4. Verify that the OAuth flow completes successfully

## Post-Deployment

### Set up continuous deployment

Vercel automatically deploys on every push to main branch. You can:

- Configure preview deployments for pull requests
- Set up custom domains
- Enable Web Analytics
- Configure function regions

### Monitor your deployment

- Check Vercel logs for any errors
- Monitor Supabase dashboard for database usage
- Set up error tracking (Sentry) for production issues

### Next steps

1. Set up Upstash Redis for caching
2. Configure Trigger.dev for background jobs
3. Set up Resend for email notifications
4. Integrate Stripe for payments
5. Add monitoring with Sentry

## Troubleshooting

### Build fails

- Check that all environment variables are set correctly
- Verify that `--legacy-peer-deps` is used in install command
- Check Vercel build logs for specific errors

### Database connection fails

- Verify DATABASE_URL is correct
- Check that connection pooling is enabled
- Ensure you're using the transaction mode connection string
- Verify IP allowlist in Supabase (should be disabled for Vercel)

### OAuth doesn't work

- Verify callback URLs match exactly
- Check that NEXTAUTH_URL is set to your production domain
- Ensure NEXTAUTH_SECRET is a random string (not the development one)

### Migrations fail

- Use DIRECT_DATABASE_URL for migrations, not the pooled connection
- Check that the database is accessible
- Verify Prisma schema is valid

## Security Checklist

- [ ] NEXTAUTH_SECRET is a strong random string
- [ ] Database credentials are not exposed in client-side code
- [ ] OAuth callback URLs are HTTPS only
- [ ] Supabase IP allowlist is properly configured
- [ ] Environment variables are only set in Vercel dashboard, not in code

## Cost Optimization

- Vercel: Free tier supports hobby projects (upgrade to Pro for production)
- Supabase: Free tier includes 500MB database, 2GB bandwidth (upgrade for more)
- Total monthly cost estimate: $0 (hobby) to $45 (Pro + database growth)
