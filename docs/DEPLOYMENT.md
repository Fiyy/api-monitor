# Production Deployment Guide

This guide covers deploying APIShift to production using Vercel and Supabase.

## Prerequisites

- GitHub account with repository access
- Vercel account (https://vercel.com)
- Supabase account (https://supabase.com)
- Domain name (optional but recommended)

## Quick Start

### 1. Set Up Supabase Database

1. **Create Supabase project**
   - Go to https://supabase.com/dashboard
   - Click "New Project"
   - Choose region (Northeast Asia recommended for Asia-Pacific)
   - Set strong database password
   - Wait ~2 minutes for provisioning

2. **Get Connection Pooler URL**
   - Go to Project Settings > Database
   - Under "Connection Pooling", copy the "Transaction" mode URL (port 6543)
   - Format: `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`
   - **Important**: Add `?pgbouncer=true` parameter to the URL

3. **URL encode special characters in password**
   - `+` becomes `%2B`
   - `/` becomes `%2F`
   - `=` becomes `%3D`
   - Example: `3f6Zd+f/RYt4HXH` → `3f6Zd%2Bf%2FRYt4HXH`

Final DATABASE_URL format:
```
postgresql://postgres.[ref]:URL_ENCODED_PASSWORD@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
```

### 2. Set Up OAuth Applications

#### GitHub OAuth
1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Configure:
   - **Application name**: `APIShift Production`
   - **Homepage URL**: `https://yourdomain.com`
   - **Authorization callback URL**: `https://yourdomain.com/api/auth/callback/github`
4. Copy Client ID and Client Secret

#### Google OAuth (Optional)
1. Go to https://console.cloud.google.com/
2. Create/select project
3. Go to APIs & Services > Credentials
4. Create OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URIs: `https://yourdomain.com/api/auth/callback/google`
7. Copy Client ID and Client Secret

### 3. Deploy to Vercel

1. **Import Repository**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select the repository

2. **Configure Project Settings**
   - **Framework Preset**: `Next.js` (critical - must be Next.js, not "Other")
   - **Root Directory**: `app`
   - **Build Command**: `prisma generate && next build`
   - **Install Command**: `npm install --legacy-peer-deps`

3. **Add Environment Variables**

   ```bash
   # Database (with pgbouncer parameter)
   DATABASE_URL=postgresql://postgres.[ref]:URL_ENCODED_PASSWORD@...pooler.supabase.com:6543/postgres?pgbouncer=true

   # NextAuth (generate with: openssl rand -base64 32)
   NEXTAUTH_SECRET=your-random-32-character-secret
   NEXTAUTH_URL=https://yourdomain.com

   # GitHub OAuth
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret

   # Google OAuth (optional)
   GOOGLE_ID=your-google-client-id
   GOOGLE_SECRET=your-google-client-secret

   # Cron Security (generate with: openssl rand -base64 32)
   CRON_SECRET=your-random-cron-secret
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build completion (~2-3 minutes)

### 4. Run Database Migrations

After first successful deployment:

```bash
# Set environment variable locally
export DATABASE_URL="your-supabase-connection-pooler-url?pgbouncer=true"

# Run migrations
npx prisma migrate deploy

# Verify schema
npx prisma db pull
```

### 5. Configure Custom Domain (Optional)

1. In Vercel dashboard, go to Project Settings > Domains
2. Add your domain (e.g., `apishift.site`)
3. Configure DNS records at your domain provider:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (usually 5-10 minutes)
5. Update OAuth callback URLs with your custom domain

### 6. Update OAuth Callback URLs

After deployment with custom domain:
1. Update GitHub OAuth App callback URL to `https://yourdomain.com/api/auth/callback/github`
2. Update Google OAuth redirect URI to `https://yourdomain.com/api/auth/callback/google`
3. Update `NEXTAUTH_URL` environment variable in Vercel

## Common Issues & Solutions

### Issue: 404 NOT_FOUND After Deployment

**Solution**: Verify Framework Preset is set to "Next.js"
- Go to Project Settings > General
- Check "Framework Preset" field
- If it says "Other", change to "Next.js"
- Redeploy

### Issue: Database Connection Error - Invalid Port Number

**Cause**: Special characters in password not URL-encoded

**Solution**: Encode password special characters:
```bash
# Before: 3f6Zd+f/RYt4HXH
# After:  3f6Zd%2Bf%2FRYt4HXH
```

### Issue: Prepared Statement Already Exists (PostgreSQL Error 42P05)

**Cause**: Missing `?pgbouncer=true` parameter in DATABASE_URL

**Solution**: Add pgbouncer parameter:
```
DATABASE_URL="postgresql://...?pgbouncer=true"
```

### Issue: Build Fails with Dependency Errors

**Solution**: Ensure install command uses `--legacy-peer-deps`
- Go to Project Settings > General
- Set Install Command: `npm install --legacy-peer-deps`

### Issue: OAuth Redirect URI Mismatch

**Solution**: Verify exact URL match
- Check that OAuth callback URLs match deployed domain exactly
- Must use HTTPS in production
- Trailing slashes matter

## Vercel Cron Configuration

The cron job is configured in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/check-apis",
      "schedule": "0 0 * * *"  // Daily at midnight (Hobby plan limit)
    }
  ]
}
```

**Note**: Vercel Hobby plan allows only daily cron jobs. Upgrade to Pro for more frequent checks.

## Environment Variable Checklist

- [ ] `DATABASE_URL` - Supabase connection pooler URL with `?pgbouncer=true`
- [ ] `NEXTAUTH_SECRET` - Random 32-character string
- [ ] `NEXTAUTH_URL` - Your production domain with HTTPS
- [ ] `GITHUB_ID` - GitHub OAuth Client ID
- [ ] `GITHUB_SECRET` - GitHub OAuth Client Secret
- [ ] `GOOGLE_ID` - Google OAuth Client ID (optional)
- [ ] `GOOGLE_SECRET` - Google OAuth Client Secret (optional)
- [ ] `CRON_SECRET` - Random string for cron endpoint security

## Security Best Practices

1. **Never commit secrets** - Use Vercel environment variables only
2. **Use strong random values** - Generate with `openssl rand -base64 32`
3. **Enable HTTPS only** - All OAuth callbacks must use HTTPS
4. **Verify callback URLs** - Must match exactly, including protocol and path
5. **Rotate secrets regularly** - Update NEXTAUTH_SECRET periodically
6. **Monitor error logs** - Check Vercel logs for unauthorized access attempts

## Performance Optimization

1. **Enable Vercel Analytics** - Monitor real user metrics
2. **Configure Edge Functions** - For global low latency
3. **Database Connection Pooling** - Already enabled with Supabase pooler
4. **Caching Strategy** - Consider Redis for frequently accessed data

## Monitoring Production

### Vercel Dashboard
- Monitor build and deployment status
- Check function invocation logs
- Track bandwidth and function execution time

### Supabase Dashboard
- Monitor database size and connections
- Check query performance
- Review API request patterns

### Health Checks
- Test OAuth flows regularly
- Verify cron jobs execute successfully
- Monitor API monitoring accuracy

## Upgrade Path

### From Hobby to Pro (Vercel)
Benefits:
- More frequent cron jobs (every 5 minutes)
- Increased bandwidth and build time
- Team collaboration features
- Priority support

### Database Scaling (Supabase)
As your database grows:
1. Monitor connection count in Supabase dashboard
2. Upgrade to paid tier for more connections
3. Consider read replicas for analytics queries
4. Implement database archival for old snapshots

## Rollback Strategy

If deployment fails:

1. **Instant Rollback** (Vercel dashboard)
   - Go to Deployments
   - Find last working deployment
   - Click "..." > "Promote to Production"

2. **Redeploy Previous Commit**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Environment Variable Recovery**
   - Keep backup of environment variables
   - Download via Vercel CLI: `vercel env pull`

## Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs

## Post-Deployment Checklist

- [ ] Website accessible at custom domain
- [ ] GitHub OAuth login works
- [ ] Google OAuth login works (if configured)
- [ ] Database migrations applied successfully
- [ ] Cron job configured and visible in Vercel dashboard
- [ ] Error monitoring set up (Sentry recommended)
- [ ] SSL certificate issued and active
- [ ] DNS records propagated
- [ ] All environment variables verified
- [ ] Test creating and monitoring an API
- [ ] Verify change detection works
- [ ] Check alerts display correctly
